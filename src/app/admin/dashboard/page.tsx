'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import type { BlogPost } from '@/types/blog'

// Mock data for blog posts
const mockPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of Enterprise Cloud Architecture',
    slug: 'future-enterprise-cloud-architecture',
    excerpt: 'Exploring emerging patterns in cloud architecture and their impact on enterprise systems.',
    content: '...',
    publishedAt: '2024-03-15T10:00:00Z',
    author: {
      name: 'Robert Johnson',
      avatar: 'https://i.pravatar.cc/150?u=robert'
    },
    coverImage: 'https://source.unsplash.com/random/800x600?cloud',
    tags: ['Cloud', 'Enterprise', 'Architecture'],
    isDraft: false
  },
  {
    id: '2',
    title: 'Implementing Zero Trust Security',
    slug: 'implementing-zero-trust-security',
    excerpt: 'A comprehensive guide to implementing zero trust security in modern enterprises.',
    content: '...',
    publishedAt: '2024-03-10T14:30:00Z',
    author: {
      name: 'Robert Johnson',
      avatar: 'https://i.pravatar.cc/150?u=robert'
    },
    coverImage: 'https://source.unsplash.com/random/800x600?security',
    tags: ['Security', 'Zero Trust', 'Enterprise'],
    isDraft: true
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

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'published' | 'draft'>('all')
  const [selectedPosts, setSelectedPosts] = useState<string[]>([])
  const [isImporting, setIsImporting] = useState(false)

  const filteredPosts = mockPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesStatus = selectedStatus === 'all' ||
                         (selectedStatus === 'published' && !post.isDraft) ||
                         (selectedStatus === 'draft' && post.isDraft)
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: mockPosts.length,
    published: mockPosts.filter(post => !post.isDraft).length,
    drafts: mockPosts.filter(post => post.isDraft).length
  }

  const handleSelectAll = () => {
    if (selectedPosts.length === filteredPosts.length) {
      setSelectedPosts([])
    } else {
      setSelectedPosts(filteredPosts.map(post => post.id))
    }
  }

  const handleSelectPost = (postId: string) => {
    if (selectedPosts.includes(postId)) {
      setSelectedPosts(prev => prev.filter(id => id !== postId))
    } else {
      setSelectedPosts(prev => [...prev, postId])
    }
  }

  const handleDeleteSelected = async () => {
    // Here you would typically make an API call to delete the selected posts
    console.log('Deleting posts:', selectedPosts)
    // After successful deletion, clear selection
    setSelectedPosts([])
  }

  const handleImportCSV = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsImporting(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/posts/import', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Import failed')
      }

      // Refresh the page to show new posts
      window.location.reload()
    } catch (error) {
      console.error('Error importing CSV:', error)
      alert('Failed to import posts. Please try again.')
    } finally {
      setIsImporting(false)
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
            Blog Management
          </h1>
          <p className="text-lg text-foreground/60">
            Manage and create your blog content
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Stats Section */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'Total Posts', value: stats.total, icon: (
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              ) },
              { label: 'Published', value: stats.published, icon: (
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) },
              { label: 'Drafts', value: stats.drafts, icon: (
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              ) }
            ].map(stat => (
              <div
                key={stat.label}
                className="bg-background/50 border border-white/10 rounded-xl p-6
                         flex items-center gap-4 hover:bg-background/60 transition-colors
                         backdrop-blur-sm shadow-lg"
              >
                <div className="p-3 bg-white/5 rounded-lg">
                  {stat.icon}
                </div>
                <div>
                  <span className="block text-2xl font-bold text-foreground/90">{stat.value}</span>
                  <span className="text-sm text-foreground/60">{stat.label}</span>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Actions Bar */}
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              {/* Search */}
              <div className="relative flex-1 md:w-80">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search posts..."
                  className="w-full px-4 py-2 pl-10 rounded-lg bg-background/50 border border-white/10
                           focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent
                           text-foreground/80 placeholder-foreground/50"
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground/40"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Status Filter */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as 'all' | 'published' | 'draft')}
                className="px-4 py-2 rounded-lg bg-background/50 border border-white/10
                         focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent
                         text-foreground/80 appearance-none cursor-pointer min-w-[140px]
                         bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22%2399999980%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M10%2012l-6-6h12l-6%206z%22%2F%3E%3C%2Fsvg%3E')]
                         bg-[length:20px] bg-[right_12px_center] bg-no-repeat"
              >
                <option value="all">All Posts</option>
                <option value="published">Published</option>
                <option value="draft">Drafts</option>
              </select>
            </div>

            <div className="flex gap-4 w-full md:w-auto">
              {selectedPosts.length > 0 && (
                <button
                  onClick={handleDeleteSelected}
                  className="px-4 py-2 bg-red-600/10 text-red-600 rounded-lg
                           hover:bg-red-600/20 transition-colors flex items-center gap-2
                           border border-red-600/20"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete Selected
                </button>
              )}
              
              {/* Import CSV Button */}
              <label className="px-4 py-2 bg-green-600/10 text-green-600 rounded-lg
                            hover:bg-green-600/20 transition-colors flex items-center gap-2
                            border border-green-600/20 cursor-pointer">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                {isImporting ? 'Importing...' : 'Import CSV'}
                <input
                  type="file"
                  accept=".csv"
                  className="hidden"
                  onChange={handleImportCSV}
                  disabled={isImporting}
                />
              </label>

              <Link
                href="/admin/dashboard/new"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700
                         transition-colors flex items-center gap-2 shadow-lg shadow-blue-600/10"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Post
              </Link>
            </div>
          </motion.div>

          {/* Posts Table */}
          <motion.div variants={itemVariants} className="bg-background/50 backdrop-blur-sm rounded-xl border border-white/10 shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-background/50">
                    <th className="py-4 px-6 text-left">
                      <input
                        type="checkbox"
                        checked={selectedPosts.length === filteredPosts.length && filteredPosts.length > 0}
                        onChange={handleSelectAll}
                        className="rounded border-white/10 text-blue-600 focus:ring-blue-600
                                 cursor-pointer w-4 h-4"
                      />
                    </th>
                    <th className="py-4 px-6 text-left text-xs font-medium text-foreground/60 uppercase tracking-wider">Title</th>
                    <th className="py-4 px-6 text-left text-xs font-medium text-foreground/60 uppercase tracking-wider">Status</th>
                    <th className="py-4 px-6 text-left text-xs font-medium text-foreground/60 uppercase tracking-wider">Date</th>
                    <th className="py-4 px-6 text-left text-xs font-medium text-foreground/60 uppercase tracking-wider">Tags</th>
                    <th className="py-4 px-6 text-right text-xs font-medium text-foreground/60 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredPosts.map(post => (
                    <tr 
                      key={post.id} 
                      className="hover:bg-white/5 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <input
                          type="checkbox"
                          checked={selectedPosts.includes(post.id)}
                          onChange={() => handleSelectPost(post.id)}
                          className="rounded border-white/10 text-blue-600 focus:ring-blue-600
                                   cursor-pointer w-4 h-4"
                        />
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 relative rounded-lg overflow-hidden shadow-lg">
                            <Image
                              src={post.coverImage || '/placeholder-image.jpg'}
                              alt={post.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium text-foreground/90 hover:text-blue-600 transition-colors">
                              <Link href={`/admin/dashboard/edit/${post.id}`}>
                                {post.title}
                              </Link>
                            </h3>
                            <p className="text-sm text-foreground/60 truncate max-w-md">{post.excerpt}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                                     ${post.isDraft
                                       ? 'bg-yellow-900/10 text-yellow-600 border border-yellow-600/20'
                                       : 'bg-green-900/10 text-green-600 border border-green-600/20'
                                     }`}
                        >
                          <span className={`w-1 h-1 rounded-full mr-2
                                       ${post.isDraft ? 'bg-yellow-600' : 'bg-green-600'}`} />
                          {post.isDraft ? 'Draft' : 'Published'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm text-foreground/60">
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map(tag => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-blue-900/10 rounded text-xs text-blue-600
                                       border border-blue-600/20"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/dashboard/edit/${post.id}`}
                            className="p-2 text-foreground/60 hover:text-foreground transition-colors
                                     hover:bg-white/5 rounded-lg"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </Link>
                          <button
                            onClick={() => handleSelectPost(post.id)}
                            className="p-2 text-red-600/60 hover:text-red-600 transition-colors
                                     hover:bg-red-600/5 rounded-lg"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
} 
