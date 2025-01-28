export const metadata = {
  title: 'About',
}

export default function AboutPage() {
  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-heading text-4xl tracking-tight lg:text-5xl">
            About
          </h1>
          <div className="prose dark:prose-invert">
            <p>
              This is a modern portfolio and blog platform built with Next.js,
              Supabase, and TailwindCSS. It features a responsive design,
              server-side rendering, and a clean, minimalist aesthetic.
            </p>
            <h2>Features</h2>
            <ul>
              <li>Responsive portfolio showcase</li>
              <li>Blog platform with MDX support</li>
              <li>Password-protected works section</li>
              <li>Real-time content updates</li>
              <li>Mobile-first design</li>
              <li>SEO optimized</li>
              <li>Content management system</li>
            </ul>
            <h2>Tech Stack</h2>
            <ul>
              <li>
                <strong>Frontend:</strong> Next.js, React, TailwindCSS
              </li>
              <li>
                <strong>Backend:</strong> Supabase (PostgreSQL)
              </li>
              <li>
                <strong>Authentication:</strong> Supabase Auth
              </li>
              <li>
                <strong>Content:</strong> MDX
              </li>
              <li>
                <strong>Hosting:</strong> Vercel
              </li>
              <li>
                <strong>Storage:</strong> Supabase Storage
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
} 