const canvas = document.getElementById('shader-canvas');
const gl = canvas.getContext('webgl');

// Add this near the top of your file, after getting the canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Define a basic quad for full-screen rendering
const vertices = new Float32Array([-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0]);

// Create and bind a buffer for the vertex positions
const vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

// Vertex shader (minimal setup for WebGL)
const vertexShaderSource = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    v_uv = a_position * 0.5 + 0.5; // Convert coordinates to [0, 1] range
  }
`;

// Fragment shader (updated)
const fragmentShaderSource = `
precision mediump float;
uniform float iTime;
uniform vec2 iResolution;
varying vec2 v_uv;

#define S(a,b,t) smoothstep(a,b,t)

mat2 Rot(float a) {
    float s = sin(a);
    float c = cos(a);
    return mat2(c, -s, s, c);
}

vec2 hash(vec2 p) {
    p = vec2(dot(p, vec2(2127.1, 81.17)), dot(p, vec2(1269.5, 283.37)));
    return fract(sin(p) * 43758.5453);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);

    float n = mix(mix(dot(-1.0 + 2.0 * hash(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
                      dot(-1.0 + 2.0 * hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
                   mix(dot(-1.0 + 2.0 * hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
                       dot(-1.0 + 2.0 * hash(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x), u.y);
    return 0.5 + 0.5 * n;
}

// Improved noise function for grain
float grainNoise(vec2 uv, float time) {
    float x = (uv.x + 4.0 ) * (uv.y + 4.0 ) * (time * 10.0);
    vec2 grain = vec2(fract(sin(x) * 43758.5453));
    return grain.x * grain.y;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord / iResolution.xy;
    float ratio = iResolution.x / iResolution.y;
    vec2 tuv = uv;
    tuv -= 0.5;

    float degree = noise(vec2(iTime * 0.1, tuv.x * tuv.y));

    tuv.y *= 2.0 / ratio;
    tuv *= Rot(radians((degree - 0.99) * 720.0 + 180.0));
    tuv.y *= ratio;

    float frequency = 5.0;
    float amplitude = 30.0;
    float speed = iTime * 3.0;
    tuv.x += sin(tuv.y * frequency + speed) / amplitude;
    tuv.y += sin(tuv.x * frequency * 1.5 + speed) / (amplitude * 0.5);

    // Custom Colors RGB / 255
    vec3 color1 = vec3(0.062, 0.145, 0.258);
    vec3 color2 = vec3(0.972, 0.439, 0.376);

    vec3 finalComp = mix(color2, color1, S(0.5, -0.3, tuv.y));

    // Apply improved grain effect
    float grainIntensity = 0.3; // Adjust this value to control the intensity of the grain
    float grainScale = 4.0; // Adjust this value to control the scale of the grain
    float grain = grainNoise(uv * grainScale, iTime) * grainIntensity;
    
    // Apply grain with a slight color tint
    vec3 grainColor = vec3(0.5, 0.5, 0.5); // Adjust this color to tint the grain
    finalComp = mix(finalComp, grainColor, grain);

    fragColor = vec4(finalComp, 1.0);
}

void main() {
    vec4 color;
    mainImage(color, gl_FragCoord.xy);
    gl_FragColor = color;
}
`;

// Compile shaders
const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertexShaderSource);
gl.compileShader(vertexShader);

// Compile the fragment shader
const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragmentShaderSource);
gl.compileShader(fragmentShader);

// Check if shaders compiled successfully
if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
  console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(vertexShader));
}
if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
  console.error('ERROR compiling fragment shader!', gl.getShaderInfoLog(fragmentShader));
}

// Link shaders into a shader program
const shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertexShader);
gl.attachShader(shaderProgram, fragmentShader);
gl.linkProgram(shaderProgram);

// Check if the program linked successfully
if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
  console.error('ERROR linking shader program!', gl.getProgramInfoLog(shaderProgram));
}

// Use the shader program
gl.useProgram(shaderProgram);

// Get the location of the uniform variables
const resolutionLocation = gl.getUniformLocation(shaderProgram, 'iResolution');
const timeLocation = gl.getUniformLocation(shaderProgram, 'iTime');

// Pass the resolution (canvas width, height, and depth) to the shader
gl.uniform2f(resolutionLocation, canvas.width, canvas.height);

// Set up attribute for vertex positions
const positionLocation = gl.getAttribLocation(shaderProgram, 'a_position');
gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(positionLocation);

// Add error checking for shader attribute location
if (positionLocation === -1) {
  console.error('Failed to get position attribute location');
}

// Set up viewport to match canvas size
gl.viewport(0, 0, canvas.width, canvas.height);

// Render loop
function render() {
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Pass the current time to the shader
  gl.uniform1f(timeLocation, performance.now() / 1000); // time in seconds

  // Draw the full-screen quad
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

  // Request the next frame
  requestAnimationFrame(render);
}

// Start the render loop
render();
