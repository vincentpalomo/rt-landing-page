import { createClient } from '@/lib/supabase'
import { BlogCard } from '@/components/blog/blog-card'
import type { BlogPost } from '@/types'

export const metadata = {
  title: 'Blog',
}

export const revalidate = 60

async function getBlogPosts() {
  const supabase = createClient()
  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }

  return posts as BlogPost[]
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-heading text-4xl tracking-tight lg:text-5xl">
            Blog
          </h1>
          <p className="text-xl text-muted-foreground">
            Thoughts, ideas, and tutorials about web development and design.
          </p>
        </div>
      </div>
      <hr className="my-8" />
      {posts?.length ? (
        <div className="grid gap-10 sm:grid-cols-2">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p>No posts published.</p>
      )}
    </div>
  )
} 

