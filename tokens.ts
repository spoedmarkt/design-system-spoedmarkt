// cspell:words Projectversterking Spoedonderhoud chartreuse
/**
 * Soft Pro design tokens — extracted from the existing mobile codebase.
 *
 * These tokens were derived archaeologically: every hex literal, every
 * StyleSheet magic number, every fontSize that appears in src/screens
 * and src/components was tabulated, clustered, and collapsed into the
 * ladder below.
 *
 * Token contract:
 *   - Colors: semantic naming for both light + dark mode
 *     (color.surface.primary, color.text.muted, color.urgency.critical,
 *     color.brand.primary). Never color.orange or color.gray500.
 *   - Typography: family, size, line-height, weight, letter-spacing.
 *   - Spacing: 4px grid — xs / sm / md / lg / xl / 2xl / 3xl. No raw px in screens.
 *   - Radii: matched to the Soft Pro prototype.
 *   - Shadows: iOS-style soft drops (warm ink-tinted, low opacity).
 *   - Motion: duration + easing curves.
 *   - theme.tsx resolves light / dark via React Native's useColorScheme()
 *     or an app-level preference (ThemeProvider override).
 *
 * Source of truth for raw audit numbers: AUDIT.md (same folder).
 */

// ---------------------------------------------------------------------------
// PRIMITIVES — raw palette values. Do NOT import these directly from screens.
// Screens should always go through the semantic layer below (or theme.ts).
// ---------------------------------------------------------------------------

const palette = {
  // Warm neutrals — the Soft Pro spine
  ink900: '#0A0906',
  ink800: '#1A1814',   // 21 hits — the canonical ink
  ink700: '#2D2A26',
  paper50: '#FCFAF7',  // 14 hits — warm paper background
  paper100: '#F8F4EC',
  paper200: '#F2EEE8', //  7 hits — secondary surface
  paper300: '#EDE8E1',
  paper400: '#D8D2CA',
  warm500: '#A39B8E',
  warm600: '#6B6359',  // 11 hits — secondary text
  warm700: '#5D4037',

  // Inverted / dark-mode neutrals
  dark900: '#15130F',
  dark800: '#1A1814',
  dark700: '#211E18',

  // Brand
  chartreuse500: '#E3FF00', // 22 hits — accent
  chartreuse100: '#F8FFB3', //  7 hits — accent tint background
  flame500: '#FF5F1F',      //  6 hits — Projectversterking
  flame400: '#FF6B35',      //  near-dupe of FF6B00, collapsed here
  flame300: '#FF6B00',

  // Pure
  white: '#FFFFFF',
  black: '#000000',

  // Status — light
  green700: '#15803D',
  green600: '#16A34A',
  green500: '#3B9C4F',
  green400: '#4ADE80',
  green200: '#86EFAC',
  green100: '#DCFCE7',

  amber700: '#A16207',
  amber600: '#D97706',
  amber500: '#F59E0B',
  amber400: '#FBBF24',
  amber200: '#FDE047',
  amber100: '#FEF9C3',

  red700: '#B91C1C',
  red600: '#DC2626',
  red500: '#EF4444',
  red400: '#F87171',
  red200: '#FCA5A5',
  red100: '#FEE2E2',

  blue700: '#1D4ED8',
  blue600: '#2563EB',
  blue500: '#3B82F6',
  blue400: '#60A5FA',
  blue300: '#93C5FD',
  blue100: '#DBEAFE',
  cyan600: '#0284C7',

  violet600: '#7C3AED',
  violet400: '#A78BFA',
} as const;

// ---------------------------------------------------------------------------
// SEMANTIC COLOR TOKENS — light mode.
// Dark equivalents live in theme.ts. Always reference these by role.
// ---------------------------------------------------------------------------

export interface SemanticColor {
  brand: {
    primary: string;
    primaryStrong: string;
    primarySoft: string;
    accent: string;
    accentSoft: string;
    flame: string;
  };
  surface: {
    background: string;
    primary: string;
    secondary: string;
    tertiary: string;
    inverse: string;
    tinted: string;
  };
  text: {
    primary: string;
    secondary: string;
    muted: string;
    inverse: string;
    link: string;
    onAccent: string;
    onBrand: string;
  };
  border: {
    default: string;
    subtle: string;
    strong: string;
    accent: string;
  };
  feedback: {
    success: FeedbackScale;
    warning: FeedbackScale;
    error: FeedbackScale;
    info: FeedbackScale;
  };
  urgency: {
    critical: string;   // ASAP — burning red
    high: string;       // today — attention blue
    scheduled: string;  // multi-day window
    flexible: string;   // no firm deadline
  };
  badge: {
    verified: string;
    boosted: string;
    privatePool: string;
    chartreuse: string;
    flame: string;
  };
  overlay: {
    scrim: string;
    scrimStrong: string;
    scrimSoft: string;
    onMedia: string;
    glassLight: string;
    glassDark: string;
  };
  fixed: {
    white: string;
    black: string;
    transparent: string;
  };
}

export interface FeedbackScale {
  default: string;
  strong: string;
  soft: string;
  muted: string;
  onSurface: string;
}

export const lightColor: SemanticColor = {
  brand: {
    primary: palette.ink800,        // ink — buttons, headings, primary CTAs
    primaryStrong: palette.ink900,  // hover/pressed
    primarySoft: palette.ink700,    // disabled / muted primary
    accent: palette.chartreuse500,  // chartreuse highlight
    accentSoft: palette.chartreuse100,
    flame: palette.flame500,        // job category — Projectversterking
  },

  surface: {
    background: palette.paper50,    // warm paper — root background
    primary: palette.white,         // card / sheet / input
    secondary: palette.paper200,    // muted card, chip background
    tertiary: palette.paper300,     // very muted (timeline rail etc.)
    inverse: palette.ink800,        // for surfaces that sit on accent
    tinted: palette.chartreuse100,  // accent-tinted callouts
  },

  text: {
    primary: palette.ink800,        // body & headings
    secondary: palette.warm600,     // captions, metadata
    muted: palette.warm500,         // placeholder, disabled, helper
    inverse: palette.white,         // text on ink / dark surfaces
    link: palette.ink800,           // links are ink in Soft Pro (underlined)
    onAccent: palette.ink800,       // text on chartreuse
    onBrand: palette.white,         // text on ink primary
  },

  border: {
    default: palette.paper400,      // visible card / input border
    subtle: palette.paper300,       // hairline divider
    strong: palette.ink800,         // focus / selected
    accent: palette.chartreuse500,
  },

  feedback: {
    success: {
      default: palette.green600,
      strong: palette.green700,
      soft: palette.green500,       // 9 hits — softer green used in deal flow
      muted: palette.green100,
      onSurface: palette.green700,
    },
    warning: {
      default: palette.amber500,
      strong: palette.amber600,
      soft: palette.amber400,
      muted: palette.amber100,
      onSurface: palette.amber700,
    },
    error: {
      default: palette.red600,
      strong: palette.red700,
      soft: palette.red400,
      muted: palette.red100,
      onSurface: palette.red700,
    },
    info: {
      default: palette.cyan600,
      strong: palette.blue700,
      soft: palette.blue400,
      muted: palette.blue100,
      onSurface: palette.blue700,
    },
  },

  urgency: {
    critical: palette.red500,       // ASAP — burning red
    high: palette.blue500,          // today — attention blue
    scheduled: palette.blue500,     // collapsed — was identical to "today" in legacy
    flexible: palette.green600,     // calm green
  },

  badge: {
    verified: palette.green600,
    boosted: palette.amber500,
    privatePool: palette.violet600,
    chartreuse: palette.chartreuse500,
    flame: palette.flame500,
  },

  overlay: {
    scrim: 'rgba(26,24,20,0.52)',   // standard modal scrim
    scrimStrong: 'rgba(0,0,0,0.75)', // media / video scrim
    scrimSoft: 'rgba(26,24,20,0.06)', // chip / pressed-state wash
    onMedia: 'rgba(0,0,0,0.4)',     // text legibility on images
    glassLight: 'rgba(255,255,255,0.65)',
    glassDark: 'rgba(26,24,20,0.6)',
  },

  // Fixed pure values, exposed for the rare legit use case
  fixed: {
    white: palette.white,
    black: palette.black,
    transparent: 'transparent',
  },
};

// ---------------------------------------------------------------------------
// SPACING — strict 4px grid, 7 steps (xs → 3xl).
//
// Audit data drove the cluster, but the published scale follows the
// design contract (4px grid). Off-grid values snap as follows:
//   2,3,5  → xs (4)   |   6,7,9 → sm (8)   |   10,14 → md/lg
//   18,20  → xl (24)  |   22,28 → 2xl (32) |   40+   → 3xl (48) or multiples
// ---------------------------------------------------------------------------

export const space = {
  xs: 4,         // tight inline (icon + label)
  sm: 8,         // chip padding, small gap
  md: 12,        // default control padding
  lg: 16,        // card padding, default screen inset
  xl: 24,        // section spacing, modal padding
  '2xl': 32,     // group spacing
  '3xl': 48,     // page-level spacing
} as const;

/** Semantic spacing aliases — prefer these in screens over raw scale steps. */
export const inset = {
  screen: space.lg,        // 16 — horizontal screen padding
  card: space.lg,          // 16 — card inner padding
  cardCompact: space.md,   // 12 — dense list items
  control: space.md,       // 12 — button / input vertical padding
  controlX: space.lg,      // 16 — button / input horizontal padding
  chip: space.sm,          // 8 — chip padding
  modal: space.xl,         // 24 — modal / sheet inner padding
  section: space.xl,       // 24 — between content sections
} as const;

export const gap = {
  tight: space.xs,         // 4 — icon + label
  snug: space.sm,          // 8 — list item internals
  cozy: space.md,          // 12 — paired controls
  comfortable: space.lg,   // 16 — card sections
  loose: space.xl,         // 24 — page sections
  open: space['2xl'],      // 32 — page groups
} as const;

// ---------------------------------------------------------------------------
// RADIUS — clustered from {3, 4, 6, 8, 10, 12, 13, 14, 16, 18, 20, 22, 24, 28, 999}
// Frequencies favored 20 (40), 14 (37 → snapped to 16), 16 (21), 10 (19 → 12).
// ---------------------------------------------------------------------------

export const radius = {
  none: 0,
  xs: 4,         // tiny inner elements (badge corners)
  sm: 8,         // small chip / pill
  md: 12,        // input, dense card
  lg: 16,        // standard card
  xl: 20,        // hero card
  '2xl': 24,     // modal / sheet
  pill: 999,
} as const;

/** Semantic radius aliases — prefer these in screens. */
export const cornerRadius = {
  control: radius.md,    // 12 — buttons, inputs
  chip: radius.pill,     // pill chips dominate Soft Pro
  card: radius.lg,       // 16 — cards
  cardHero: radius.xl,   // 20 — featured cards (audit shows 20 dominates)
  sheet: radius['2xl'],  // 24 — bottom sheets, modals
  avatar: radius.pill,
} as const;

// ---------------------------------------------------------------------------
// BORDER WIDTHS — 1 dominates (110 hits). 1.5 and 2 exist for emphasis.
// ---------------------------------------------------------------------------

export const borderWidth = {
  none: 0,
  hairline: 1,
  thin: 1.5,
  thick: 2,
} as const;

// ---------------------------------------------------------------------------
// TYPOGRAPHY
// Audit collapsed fontSize tail (9–34) onto a clean ramp.
// fontWeight usage: '600' (102), '700' (80), '500' (29), '400' (5).
// ---------------------------------------------------------------------------

import { Platform, type TextStyle } from 'react-native';

const fontFamily = Platform.select({
  ios: 'SF Pro Text',
  android: 'sans-serif',
  default: 'sans-serif',
});

const displayFamily = Platform.select({
  ios: 'SF Pro Display',
  android: 'sans-serif-medium',
  default: 'sans-serif-medium',
});

export const fontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const satisfies Record<string, TextStyle['fontWeight']>;

export const fontSize = {
  micro: 11,        // tab labels (existed)
  caption: 12,
  captionLg: 13,
  label: 14,
  body: 16,
  bodyLg: 17,
  subheading: 18,
  heading: 22,      // h3 lite
  title: 26,
  display: 32,
  hero: 40,
} as const;

export const lineHeight = {
  micro: 16,
  caption: 17,
  captionLg: 18,
  label: 20,
  body: 24,
  bodyLg: 24,
  subheading: 26,
  heading: 28,
  title: 33,
  display: 40,
  hero: 48,
} as const;

export const letterSpacing = {
  loose: 0.5,
  normal: 0,
  tight: -0.1,
  tighter: -0.2,
  tightest: -0.4,
} as const;

/** Semantic text styles — composed from the primitives above. */
export const textStyle = {
  hero: {
    fontSize: fontSize.hero,
    lineHeight: lineHeight.hero,
    fontWeight: fontWeight.bold,
    letterSpacing: letterSpacing.tightest,
    fontFamily: displayFamily,
  },
  display: {
    fontSize: fontSize.display,
    lineHeight: lineHeight.display,
    fontWeight: fontWeight.bold,
    letterSpacing: letterSpacing.tightest,
    fontFamily: displayFamily,
  },
  title: {
    fontSize: fontSize.title,
    lineHeight: lineHeight.title,
    fontWeight: fontWeight.bold,
    letterSpacing: -0.3,
    fontFamily: displayFamily,
  },
  heading: {
    fontSize: fontSize.heading,
    lineHeight: lineHeight.heading,
    fontWeight: fontWeight.semibold,
    letterSpacing: letterSpacing.tighter,
    fontFamily,
  },
  subheading: {
    fontSize: fontSize.subheading,
    lineHeight: lineHeight.subheading,
    fontWeight: fontWeight.semibold,
    letterSpacing: letterSpacing.tight,
    fontFamily,
  },
  bodyLg: {
    fontSize: fontSize.bodyLg,
    lineHeight: lineHeight.bodyLg,
    fontWeight: fontWeight.semibold,
    letterSpacing: letterSpacing.tight,
    fontFamily,
  },
  body: {
    fontSize: fontSize.body,
    lineHeight: lineHeight.body,
    fontWeight: fontWeight.regular,
    fontFamily,
  },
  bodyEmphasis: {
    fontSize: fontSize.body,
    lineHeight: lineHeight.body,
    fontWeight: fontWeight.semibold,
    fontFamily,
  },
  button: {
    fontSize: fontSize.body,
    lineHeight: 22,
    fontWeight: fontWeight.semibold,
    fontFamily,
  },
  label: {
    fontSize: fontSize.label,
    lineHeight: lineHeight.label,
    fontWeight: fontWeight.medium,
    fontFamily,
  },
  caption: {
    fontSize: fontSize.captionLg,
    lineHeight: lineHeight.captionLg,
    fontWeight: fontWeight.regular,
    fontFamily,
  },
  captionEmphasis: {
    fontSize: fontSize.captionLg,
    lineHeight: lineHeight.captionLg,
    fontWeight: fontWeight.semibold,
    fontFamily,
  },
  micro: {
    fontSize: fontSize.caption,
    lineHeight: lineHeight.caption,
    fontWeight: fontWeight.regular,
    fontFamily,
  },
  tabLabel: {
    fontSize: fontSize.micro,
    lineHeight: lineHeight.micro,
    fontWeight: fontWeight.medium,
    letterSpacing: letterSpacing.loose,
    fontFamily,
  },
} as const satisfies Record<string, TextStyle>;

// ---------------------------------------------------------------------------
// COMPONENT DIMENSIONS — Apple HIG tap targets + Soft Pro avatar ladder.
// Audit hits: 44 (23×), 56 (14×), 80 (14×), 72 (10×), 32/34 (10×), 52 (8×).
// ---------------------------------------------------------------------------

export const size = {
  iconXs: 12,
  iconSm: 16,
  iconMd: 20,    // 35 hits — the default icon size
  iconLg: 24,
  iconXl: 28,

  controlSm: 36,
  controlMd: 44,  // tap-target minimum
  controlLg: 52,  // primary button height (existing buttonHeight)
  controlXl: 56,

  avatarXs: 28,
  avatarSm: 36,
  avatarMd: 44,
  avatarLg: 56,
  avatarXl: 72,
  avatar2xl: 80,

  inputHeight: 50,
  buttonHeight: 52,
} as const;

// ---------------------------------------------------------------------------
// SHADOWS — iOS-style soft drops, warm ink-tinted for Soft Pro feel.
//
// All shadows use ink (#1A1814) as the source colour instead of pure black —
// this keeps the warmth of the warm-paper background instead of going cool.
// Low opacities + generous radii give that "barely lifted" iOS feel.
// `elevation` is the Android render hint; iOS uses the shadow* properties.
// ---------------------------------------------------------------------------

const SHADOW_TINT = palette.ink800;

export const shadow = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  // Hairline — pressed states, tiny chip lift
  xs: {
    shadowColor: SHADOW_TINT,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  // Resting card / tappable surface
  sm: {
    shadowColor: SHADOW_TINT,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  // Default card / button — most common
  md: {
    shadowColor: SHADOW_TINT,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  // Floating elements — FAB, callout
  lg: {
    shadowColor: SHADOW_TINT,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.10,
    shadowRadius: 20,
    elevation: 8,
  },
  // Bottom sheet, dropdown
  xl: {
    shadowColor: SHADOW_TINT,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 28,
    elevation: 12,
  },
  // Centered modal / dialog
  '2xl': {
    shadowColor: SHADOW_TINT,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.16,
    shadowRadius: 36,
    elevation: 16,
  },
} as const;

/** Semantic shadow aliases — prefer these in screens. */
export const elevation = {
  none: shadow.none,
  resting: shadow.sm,    // resting card
  raised: shadow.md,     // default card / button lift
  floating: shadow.lg,   // FAB, popover
  sheet: shadow.xl,      // bottom sheet, dropdown
  modal: shadow['2xl'],  // centered modal
} as const;

// ---------------------------------------------------------------------------
// MOTION — already a clean 3-step ladder; preserved verbatim from theme.ts.
// ---------------------------------------------------------------------------

export const motion = {
  duration: {
    quick: 130,      // micro-feedback (press, ripple)
    standard: 210,   // standard transitions
    slow: 310,       // sheet / modal entry
  },
  easing: {
    standard: 'cubic-bezier(0.2, 0, 0, 1)',
    decelerate: 'cubic-bezier(0, 0, 0, 1)',
    accelerate: 'cubic-bezier(0.3, 0, 1, 1)',
  },
} as const;

// ---------------------------------------------------------------------------
// Z-INDEX — semantic stacking order for overlays / nav / sheets.
// ---------------------------------------------------------------------------

export const zIndex = {
  base: 0,
  raised: 1,
  sticky: 10,
  navBar: 50,
  dropdown: 100,
  banner: 200,
  modal: 1000,
  toast: 1100,
  tooltip: 1200,
} as const;

// ---------------------------------------------------------------------------
// EXPORTS — types so consuming code stays honest.
// ---------------------------------------------------------------------------

export type Space = keyof typeof space;
export type Inset = keyof typeof inset;
export type Gap = keyof typeof gap;
export type Radius = keyof typeof radius;
export type CornerRadius = keyof typeof cornerRadius;
export type FontSize = keyof typeof fontSize;
export type FontWeightToken = keyof typeof fontWeight;
export type TextStyleToken = keyof typeof textStyle;
export type SizeToken = keyof typeof size;

// Internal — only theme.ts should reach into the palette
export const __palette = palette;
