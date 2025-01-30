'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import type { BlogPost } from '@/types/blog'

// Professional blog posts focused on enterprise technology and leadership
const mockPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of Enterprise Cloud Architecture',
    slug: 'future-enterprise-cloud-architecture',
    excerpt: 'An in-depth analysis of emerging cloud architecture patterns and their impact on enterprise digital transformation strategies.',
    content: '...',
    publishedAt: '2024-02-15',
    author: {
      name: 'Robert Johnson',
      image: '/placeholder-author.jpg'
    },
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400',
    tags: ['Enterprise Architecture', 'Cloud Computing', 'Digital Transformation']
  },
  {
    id: '2',
    title: 'Implementing Zero Trust Security in Modern Enterprises',
    slug: 'zero-trust-security-implementation',
    excerpt: 'A comprehensive guide to implementing zero trust security architecture in enterprise environments, including best practices and case studies.',
    content: '...',
    publishedAt: '2024-02-10',
    author: {
      name: 'Robert Johnson',
      image: '/placeholder-author.jpg'
    },
    coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=400',
    tags: ['Cybersecurity', 'Zero Trust', 'Enterprise Security']
  },
  {
    id: '3',
    title: 'AI-Driven Decision Making in Enterprise Strategy',
    slug: 'ai-driven-enterprise-strategy',
    excerpt: 'Exploring how artificial intelligence is revolutionizing strategic decision-making processes in enterprise organizations.',
    content: '...',
    publishedAt: '2024-02-05',
    author: {
      name: 'Robert Johnson',
      image: '/placeholder-author.jpg'
    },
    coverImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=400',
    tags: ['AI/ML', 'Enterprise Strategy', 'Digital Innovation']
  },
  {
    id: '4',
    title: 'Building Resilient Enterprise Data Architectures',
    slug: 'resilient-enterprise-data-architectures',
    excerpt: 'Key strategies for designing and implementing resilient data architectures that scale with enterprise needs.',
    content: '...',
    publishedAt: '2024-01-28',
    author: {
      name: 'Robert Johnson',
      image: '/placeholder-author.jpg'
    },
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400',
    tags: ['Data Architecture', 'Enterprise Scale', 'Resilience']
  },
  {
    id: '5',
    title: 'The ROI of Digital Transformation Initiatives',
    slug: 'digital-transformation-roi',
    excerpt: 'Analyzing the financial impact and measuring the success of enterprise-wide digital transformation programs.',
    content: '...',
    publishedAt: '2024-01-20',
    author: {
      name: 'Robert Johnson',
      image: '/placeholder-author.jpg'
    },
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400',
    tags: ['Digital Transformation', 'ROI', 'Enterprise Strategy']
  },
  {
    id: '6',
    title: 'Leading Enterprise Agile Transformation',
    slug: 'enterprise-agile-transformation',
    excerpt: 'Strategic approaches to scaling agile methodologies across large organizations while maintaining efficiency and innovation.',
    content: '...',
    publishedAt: '2024-01-15',
    author: {
      name: 'Robert Johnson',
      image: '/placeholder-author.jpg'
    },
    coverImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400',
    tags: ['Agile', 'Enterprise Leadership', 'Transformation']
  }
]

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

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  // Get all unique tags
  const allTags = Array.from(new Set(mockPosts.flatMap(post => post.tags)))

  // Filter posts based on search and tag
  const filteredPosts = mockPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTag = !selectedTag || post.tags.includes(selectedTag)
    return matchesSearch && matchesTag
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      {/* Header Section */}
      <div className="relative h-[30vh] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-background to-indigo-900/10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(30,64,175,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(30,58,138,0.15),transparent_50%)]" />
        </div>
        <div className="relative text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-900 inline-block text-transparent bg-clip-text">
            Enterprise Insights
          </h1>
          <p className="text-lg md:text-xl text-foreground/60 max-w-3xl mx-auto">
            Strategic perspectives on technology leadership and digital innovation
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {/* Search and Filter */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
              <input
                type="text"
                placeholder="Search insights..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-96 px-4 py-2 rounded-lg bg-background/50 border border-white/10
                          focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent
                          text-foreground/80 placeholder-foreground/50"
              />
              <div className="flex flex-wrap gap-2 justify-center">
                <button
                  onClick={() => setSelectedTag(null)}
                  className={`px-3 py-1 rounded-lg text-sm transition-colors duration-200 ${
                    !selectedTag
                      ? 'bg-blue-600 text-white'
                      : 'bg-background/50 text-foreground/70 hover:bg-background/70'
                  }`}
                >
                  All Topics
                </button>
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-3 py-1 rounded-lg text-sm transition-colors duration-200 ${
                      selectedTag === tag
                        ? 'bg-blue-600 text-white'
                        : 'bg-background/50 text-foreground/70 hover:bg-background/70'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Blog Posts Grid */}
          <motion.div variants={containerVariants} className="grid grid-cols-1 gap-8">
            {filteredPosts.map((post) => (
              <motion.article
                key={post.id}
                variants={itemVariants}
                className="bg-background/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg
                         border border-white/5 hover:shadow-xl transition-all duration-300"
              >
                <Link href={`/blog/${post.slug}`} className="flex flex-col lg:flex-row">
                  <div className="relative lg:w-1/3 h-64 lg:h-auto">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 p-8">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-blue-900/10 rounded-lg text-xs text-blue-600 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-2xl font-semibold mb-4 text-foreground/90">
                      {post.title}
                    </h2>
                    <p className="text-foreground/70 mb-6 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-3">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/10">
                          <Image
                            src={post.author.image}
                            alt={post.author.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="text-foreground/60 font-medium">{post.author.name}</span>
                      </div>
                      <time className="text-foreground/60 font-medium">
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
} 