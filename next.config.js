/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@tamagui/core', '@tamagui/config', 'tamagui'],
  images: {
    domains: ['images.unsplash.com'],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(js|jsx|ts|tsx)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['next/babel'],
            plugins: [['@tamagui/babel-plugin', {
              components: ['tamagui'],
              config: './tamagui.config.ts',
              importsWhitelist: ['constants.js', 'colors.js'],
              logTimings: true,
              disableExtraction: process.env.NODE_ENV === 'development'
            }]]
          }
        }
      ]
    })
    return config
  }
}

module.exports = nextConfig 