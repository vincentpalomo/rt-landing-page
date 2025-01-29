'use client'

import { Stack, H1, Text, YStack } from 'tamagui'

export default function HomePage() {
  return (
    <YStack flex={1} padding="$4" space="$4">
      <Stack
        backgroundColor="$background"
        padding="$8"
        minHeight="90vh"
        justifyContent="center"
        alignItems="center"
      >
        <H1
          size="$10"
          textAlign="center"
          marginBottom="$4"
          color="$color"
        >
          Welcome to My Portfolio
        </H1>
        <Text
          size="$6"
          textAlign="center"
          color="$color"
          opacity={0.8}
        >
          Showcasing my work and experience in web development
        </Text>
      </Stack>
    </YStack>
  )
}
