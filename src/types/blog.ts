export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  coverImage: string
  publishedAt: string
  author: {
    name: string
    avatar: string
  }
  tags: string[]
  isDraft: boolean
}

export interface BlogPostInput {
  title: string
  content: string
  excerpt: string
  coverImage?: string
  tags: string[]
} 