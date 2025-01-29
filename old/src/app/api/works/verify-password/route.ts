import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { password } = await request.json()

    if (password !== process.env.NEXT_PUBLIC_WORKS_PASSWORD) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const cookieStore = cookies()
    cookieStore.set('works_access', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
    })

    return new NextResponse('OK', { status: 200 })
  } catch (error) {
    console.error('Error verifying password:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 