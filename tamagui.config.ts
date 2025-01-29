import { createTamagui } from 'tamagui'
import { createInterFont } from '@tamagui/font-inter'
import { shorthands } from '@tamagui/shorthands'
import { themes, tokens } from '@tamagui/themes'

const headingFont = createInterFont({
  size: {
    6: 15,
    7: 18,
    8: 24,
    9: 32,
    10: 48,
    12: 64,
    14: 96,
    15: 128,
  },
  transform: {
    6: 'uppercase',
    7: 'none',
  },
  weight: {
    6: '400',
    7: '700',
  },
  color: {
    6: '$colorFocus',
    7: '$color',
  },
  letterSpacing: {
    5: 2,
    6: 1,
    7: 0,
    8: -1,
    9: -2,
    10: -3,
    12: -4,
    14: -5,
    15: -6,
  },
  face: {
    700: { normal: 'InterBold' },
  },
})

const bodyFont = createInterFont(
  {
    face: {
      700: { normal: 'InterBold' },
    },
  },
  {
    sizeSize: (size) => Math.round(size * 1.1),
    sizeLineHeight: (size) => Math.round(size * 1.1 + (size > 20 ? 10 : 10)),
  }
)

const config = createTamagui({
  defaultTheme: 'light',
  shouldAddPrefersColorThemes: true,
  themeClassNameOnRoot: true,
  shorthands,
  fonts: {
    heading: headingFont,
    body: bodyFont,
  },
  themes,
  tokens,
  media: {
    xs: '(max-width: 660px)',
    sm: '(max-width: 800px)',
    md: '(max-width: 1020px)',
    lg: '(max-width: 1280px)',
    xl: '(max-width: 1420px)',
    xxl: '(max-width: 1600px)',
    gtXs: '(min-width: 660px)',
    gtSm: '(min-width: 800px)',
    gtMd: '(min-width: 1020px)',
    gtLg: '(min-width: 1280px)',
    short: '(max-height: 820px)',
    tall: '(min-height: 820px)',
    hoverNone: '(hover: none)',
    pointerCoarse: '(pointer: coarse)',
  },
})

export type AppConfig = typeof config

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config 