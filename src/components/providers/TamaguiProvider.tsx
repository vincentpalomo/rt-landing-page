'use client'

import { TamaguiProvider as TamaguiProviderOG } from 'tamagui'
import config from '../../../tamagui.config'
import { PropsWithChildren } from 'react'

export function TamaguiProvider({ children }: PropsWithChildren) {
  return (
    <TamaguiProviderOG config={config} defaultTheme="light">
      {children}
    </TamaguiProviderOG>
  )
} 