export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  coverImage?: string
  publishedAt: string
  author: {
    name: string
    image?: string
  }
  tags: string[]
}

export interface BlogPostInput {
  title: string
  content: string
  excerpt: string
  coverImage?: string
  tags: string[]
} 