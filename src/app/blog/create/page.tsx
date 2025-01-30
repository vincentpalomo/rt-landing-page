'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
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

export default function CreateBlogPost() {
  const [formData, setFormData] = useState<BlogPostInput>({
    title: '',
    content: '',
    excerpt: '',
    tags: [],
    coverImage: ''
  })
  const [currentTag, setCurrentTag] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Here you would typically make an API call to save the blog post
      console.log('Submitting blog post:', formData)
      await new Promise(resolve => setTimeout(resolve, 1500)) // Simulate API call
      
      // Redirect to the blog post or blog listing page
      window.location.href = '/blog'
    } catch (error) {
      console.error('Error creating blog post:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 inline-block text-transparent bg-clip-text">
            Create New Blog Post
          </h1>
          <p className="text-lg text-foreground/70">
            Share your thoughts and insights with the world
          </p>
        </motion.div>

        <motion.form
          variants={itemVariants}
          onSubmit={handleSubmit}
          className="space-y-8"
        >
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
              className="w-full px-4 py-2 rounded-lg bg-background/50 border border-foreground/10
                        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
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
              className="w-full px-4 py-2 rounded-lg bg-background/50 border border-foreground/10
                        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
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
                className="flex-1 px-4 py-2 rounded-lg bg-background/50 border border-foreground/10
                          focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                          text-foreground/80 placeholder-foreground/50"
                placeholder="Add a tag"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600
                         transition-colors duration-200"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-background/50 rounded-full text-sm text-foreground/70
                           flex items-center gap-2"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="text-foreground/50 hover:text-foreground"
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
              className="w-full px-4 py-2 rounded-lg bg-background/50 border border-foreground/10
                        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
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
            <div className="min-h-[400px] rounded-lg overflow-hidden border border-foreground/10">
              <Editor
                value={formData.content}
                onChange={(content) => setFormData(prev => ({ ...prev, content }))}
              />
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white
                       bg-gradient-to-r from-blue-500 to-purple-500
                       hover:opacity-90 transition-opacity
                       focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                       disabled:opacity-50 disabled:cursor-not-allowed`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? 'Publishing...' : 'Publish Post'}
          </motion.button>
        </motion.form>
      </div>
    </motion.div>
  )
} 