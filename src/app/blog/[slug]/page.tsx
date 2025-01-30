'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import type { BlogPost } from '@/types/blog'

// Temporary mock data - replace with actual data fetching
const mockPost: BlogPost = {
  id: '1',
  title: 'Getting Started with Next.js and TypeScript',
  slug: 'getting-started-with-nextjs-typescript',
  excerpt: 'Learn how to set up a new Next.js project with TypeScript and best practices for modern web development.',
  content: `
    <h2>Introduction</h2>
    <p>Next.js is a powerful React framework that makes building modern web applications a breeze. When combined with TypeScript, you get the benefits of static typing and enhanced developer experience.</p>
    
    <h2>Setting Up Your Project</h2>
    <p>To create a new Next.js project with TypeScript, you can use the following command:</p>
    <pre><code>npx create-next-app@latest my-app --typescript</code></pre>
    
    <h2>Key Features</h2>
    <ul>
      <li>Built-in TypeScript support</li>
      <li>File-system based routing</li>
      <li>API routes</li>
      <li>Server-side rendering</li>
    </ul>
    
    <h2>Conclusion</h2>
    <p>Next.js and TypeScript provide a robust foundation for building modern web applications. With strong typing and excellent developer tools, you can build better applications faster.</p>
  `,
  publishedAt: '2024-01-15',
  author: {
    name: 'John Doe',
    image: '/placeholder-author.jpg'
  },
  coverImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400',
  tags: ['Next.js', 'TypeScript', 'Web Development']
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

export default function BlogPostPage() {
  const { slug } = useParams()
  // In a real app, fetch the post based on the slug
  const post = mockPost

  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8"
    >
      <article className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.header variants={itemVariants} className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="px-3 py-1 bg-background/50 rounded-full text-sm text-foreground/60"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 inline-block text-transparent bg-clip-text">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-foreground/70">
            <div className="flex items-center gap-2">
              {post.author.image && (
                <div className="relative w-8 h-8 rounded-full overflow-hidden">
                  <Image
                    src={post.author.image}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <span>{post.author.name}</span>
            </div>
            <span>•</span>
            <time>{new Date(post.publishedAt).toLocaleDateString()}</time>
          </div>
        </motion.header>

        {/* Cover Image */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="relative h-[400px] rounded-2xl overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          variants={itemVariants}
          className="prose prose-lg dark:prose-invert max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Navigation */}
        <motion.div variants={itemVariants} className="border-t border-foreground/10 pt-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Blog
          </Link>
        </motion.div>
      </article>
    </motion.div>
  )
} 