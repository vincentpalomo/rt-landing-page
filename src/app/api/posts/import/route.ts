import { NextResponse } from 'next/server'
import { importFromCSV } from '@/lib/posts'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    const csvContent = await file.text()
    const success = await importFromCSV(csvContent)

    if (success) {
      return NextResponse.json({ message: 'Posts imported successfully' })
    } else {
      return NextResponse.json(
        { error: 'Failed to import posts' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error handling import:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 