import { promises as fs } from 'fs'
import path from 'path'
import type { BlogPost } from '@/types/blog'

const DATA_FILE_PATH = path.join(process.cwd(), 'data/posts.json')

export async function getPosts(): Promise<BlogPost[]> {
  try {
    const fileContents = await fs.readFile(DATA_FILE_PATH, 'utf8')
    const posts = JSON.parse(fileContents) as BlogPost[]
    return posts
  } catch (error) {
    console.error('Error reading posts:', error)
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const posts = await getPosts()
    return posts.find(post => post.slug === slug) || null
  } catch (error) {
    console.error('Error finding post:', error)
    return null
  }
}

export async function savePost(post: BlogPost): Promise<boolean> {
  try {
    const posts = await getPosts()
    const existingPostIndex = posts.findIndex(p => p.id === post.id)
    
    if (existingPostIndex >= 0) {
      posts[existingPostIndex] = post
    } else {
      posts.push(post)
    }
    
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(posts, null, 2))
    return true
  } catch (error) {
    console.error('Error saving post:', error)
    return false
  }
}

export async function deletePosts(ids: string[]): Promise<boolean> {
  try {
    let posts = await getPosts()
    posts = posts.filter(post => !ids.includes(post.id))
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(posts, null, 2))
    return true
  } catch (error) {
    console.error('Error deleting posts:', error)
    return false
  }
}

// Helper function to convert CSV to JSON
export async function importFromCSV(csvContent: string): Promise<boolean> {
  try {
    const lines = csvContent.split('\n')
    const headers = lines[0].split(',')
    
    const posts: BlogPost[] = lines.slice(1).map(line => {
      const values = line.split(',')
      const post: any = {}
      
      headers.forEach((header, index) => {
        let value = values[index]
        
        // Handle special cases
        if (header === 'tags') {
          value = value.replace(/"/g, '').split(',')
        } else if (header === 'isDraft') {
          value = value.toLowerCase() === 'true'
        }
        
        post[header.trim()] = value
      })
      
      return {
        ...post,
        author: {
          name: post.authorName,
          avatar: post.authorAvatar
        }
      }
    })
    
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(posts, null, 2))
    return true
  } catch (error) {
    console.error('Error importing CSV:', error)
    return false
  }
} 