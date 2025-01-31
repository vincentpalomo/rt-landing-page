'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import type { BlogPostInput } from '@/types/blog'

// Dynamically import the editor to avoid SSR issues
const Editor = dynamic(() => import('@/components/blog/Editor'), { 
  ssr: false,
  loading: () => <div className="h-64 bg-background/50 rounded-lg animate-pulse" />
})

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

export default function NewPost() {
  const [formData, setFormData] = useState<BlogPostInput>({
    title: '',
    content: '',
    excerpt: '',
    tags: [],
    coverImage: ''
  })
  const [currentTag, setCurrentTag] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDraft, setIsDraft] = useState(true)

  const handleAddTag = () => {
    if (currentTag && !formData.tags.includes(currentTag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag]
      }))
      setCurrentTag('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleSubmit = async (e: React.FormEvent, asDraft: boolean = true) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Here you would typically make an API call to save the blog post
      console.log('Submitting blog post:', { ...formData, isDraft: asDraft })
      await new Promise(resolve => setTimeout(resolve, 1500)) // Simulate API call
      
      // Redirect to the dashboard
      window.location.href = '/admin/dashboard'
    } catch (error) {
      console.error('Error creating blog post:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      {/* Header Section */}
      <div className="relative h-[20vh] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-background to-indigo-900/10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(30,64,175,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(30,58,138,0.15),transparent_50%)]" />
        </div>
        <div className="relative text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-900 inline-block text-transparent bg-clip-text">
            Create New Post
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Form Header */}
          <motion.div variants={itemVariants} className="flex items-center justify-between">
            <Link
              href="/admin/dashboard"
              className="text-foreground/60 hover:text-foreground transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </Link>
            <div className="flex items-center gap-4">
              <button
                onClick={(e) => handleSubmit(e, true)}
                disabled={isSubmitting}
                className="px-4 py-2 bg-background/50 text-foreground/80 rounded-lg border border-white/10
                         hover:bg-background/70 transition-colors font-medium disabled:opacity-50"
              >
                Save as Draft
              </button>
              <button
                onClick={(e) => handleSubmit(e, false)}
                disabled={isSubmitting}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700
                         transition-colors font-medium disabled:opacity-50"
              >
                {isSubmitting ? 'Publishing...' : 'Publish'}
              </button>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form variants={itemVariants} className="space-y-8">
            {/* Title */}
            <div className="space-y-1">
              <label htmlFor="title" className="block text-sm font-medium text-foreground/80">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg bg-background/50 border border-white/10
                          focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent
                          text-foreground/80 placeholder-foreground/50"
                placeholder="Enter post title"
                required
              />
            </div>

            {/* Cover Image URL */}
            <div className="space-y-1">
              <label htmlFor="coverImage" className="block text-sm font-medium text-foreground/80">
                Cover Image URL
              </label>
              <input
                type="url"
                id="coverImage"
                value={formData.coverImage}
                onChange={(e) => setFormData(prev => ({ ...prev, coverImage: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg bg-background/50 border border-white/10
                          focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent
                          text-foreground/80 placeholder-foreground/50"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <label htmlFor="tags" className="block text-sm font-medium text-foreground/80">
                Tags
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="tags"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  className="flex-1 px-4 py-2 rounded-lg bg-background/50 border border-white/10
                            focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent
                            text-foreground/80 placeholder-foreground/50"
                  placeholder="Add a tag"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700
                           transition-colors"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-blue-900/10 rounded-lg text-sm text-blue-600
                             flex items-center gap-2"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="text-blue-600/50 hover:text-blue-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Excerpt */}
            <div className="space-y-1">
              <label htmlFor="excerpt" className="block text-sm font-medium text-foreground/80">
                Excerpt
              </label>
              <textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                rows={3}
                className="w-full px-4 py-2 rounded-lg bg-background/50 border border-white/10
                          focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent
                          text-foreground/80 placeholder-foreground/50 resize-none"
                placeholder="Brief description of your post"
                required
              />
            </div>

            {/* Content Editor */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-foreground/80">
                Content
              </label>
              <div className="min-h-[400px] rounded-lg overflow-hidden border border-white/10">
                <Editor
                  value={formData.content}
                  onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                />
              </div>
            </div>
          </motion.form>
        </motion.div>
      </div>
    </div>
  )
} 