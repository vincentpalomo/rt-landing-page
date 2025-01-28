import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { formatDate } from '@/lib/utils'
import { processMDX } from '@/lib/mdx'
import type { BlogPost } from '@/types'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

async function getBlogPost(slug: string) {
  const supabase = createClient()
  const { data: post, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (error || !post) {
    console.error('Error fetching blog post:', error)
    return null
  }

  return post as BlogPost
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  const { content } = await processMDX(post.content)

  return (
    <article className="container max-w-3xl py-6 lg:py-10">
      <div className="space-y-4">
        <h1 className="inline-block font-heading text-4xl tracking-tight lg:text-5xl">
          {post.title}
        </h1>
        {post.excerpt && (
          <p className="text-xl text-muted-foreground">{post.excerpt}</p>
        )}
        <p className="text-sm text-muted-foreground">
          {formatDate(post.created_at)}
        </p>
      </div>
      {post.cover_image && (
        <img
          src={post.cover_image}
          alt={post.title}
          className="my-8 rounded-md border bg-muted transition-colors"
          width={720}
          height={405}
        />
      )}
      <hr className="my-8" />
      <div className="prose dark:prose-invert max-w-none">{content}</div>
    </article>
  )
} 