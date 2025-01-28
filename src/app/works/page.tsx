import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase'
import { PasswordForm } from '@/components/works/password-form'
import { WorkCard } from '@/components/works/work-card'
import type { Work } from '@/types'

export const metadata = {
  title: 'Works',
}

export const revalidate = 60

async function getWorks() {
  const supabase = createClient()
  const { data: works, error } = await supabase
    .from('works')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching works:', error)
    return []
  }

  return works as Work[]
}

export default async function WorksPage() {
  const cookieStore = cookies()
  const hasAccess = cookieStore.has('works_access')

  if (!hasAccess) {
    return <PasswordForm />
  }

  const works = await getWorks()

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-heading text-4xl tracking-tight lg:text-5xl">
            Works
          </h1>
          <p className="text-xl text-muted-foreground">
            A collection of my projects and works.
          </p>
        </div>
      </div>
      <hr className="my-8" />
      {works?.length ? (
        <div className="grid gap-10 sm:grid-cols-2">
          {works.map((work) => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>
      ) : (
        <p>No works published.</p>
      )}
    </div>
  )
} 
