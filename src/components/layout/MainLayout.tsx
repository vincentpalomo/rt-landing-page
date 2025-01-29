'use client'

import { PropsWithChildren } from 'react'
import { Stack, styled } from 'tamagui'

const MainContainer = styled(Stack, {
  flex: 1,
  minHeight: '100vh',
  backgroundColor: '$background',
})

export function MainLayout({ children }: PropsWithChildren) {
  return (
    <MainContainer>
      {/* Header will be added here */}
      {children}
      {/* Footer will be added here */}
    </MainContainer>
  )
} 