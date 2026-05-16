/**
 * Theme — light + dark resolution via React Native's useColorScheme().
 *
 * Light values come straight from tokens.ts. Dark values are DERIVED here
 * — we don't ship a "darkPalette" full of duplicate hex literals. Instead
 * we re-map the semantic keys onto cooler/inverted picks from the same
 * palette so a future palette swap touches one place.
 *
 * Public surface:
 *   - useTheme(): returns { color, space, inset, gap, radius, ... }
 *   - ThemeProvider: optional, lets a screen override the resolved scheme
 *
 * Usage:
 *   const t = useTheme();
 *   <View style={{ backgroundColor: t.color.surface.primary }} />
 */

import React, { createContext, useContext, useMemo } from 'react';
import { useColorScheme, type ColorSchemeName } from 'react-native';
import {
  lightColor,
  space,
  inset,
  gap,
  radius,
  cornerRadius,
  borderWidth,
  fontWeight,
  fontSize,
  lineHeight,
  letterSpacing,
  textStyle,
  size,
  shadow,
  elevation,
  motion,
  zIndex,
  __palette as p,
  type SemanticColor,
} from './tokens';

// ---------------------------------------------------------------------------
// DARK MODE — derive every semantic key by re-mapping to dark-friendly hues.
// We never invent new colors here; everything routes back to the palette.
// ---------------------------------------------------------------------------

const darkColor: SemanticColor = {
  brand: {
    // In dark mode the "ink" inverts to warm paper for buttons + headings
    primary: p.paper100,
    primaryStrong: p.paper50,
    primarySoft: p.paper200,
    accent: p.chartreuse500, // chartreuse stays — it's the brand signal
    accentSoft: 'rgba(227,255,0,0.16)',
    flame: p.flame500,
  },

  surface: {
    background: p.dark900,       // deep warm-dark base
    primary: p.dark800,          // card / sheet
    secondary: p.dark700,        // muted card / chip
    tertiary: 'rgba(248,244,236,0.04)',
    inverse: p.paper50,          // for surfaces sitting on warm-paper accents
    tinted: 'rgba(227,255,0,0.08)',
  },

  text: {
    primary: p.paper100,         // warm paper text on dark
    secondary: p.warm500,
    muted: p.warm600,            // placeholder, disabled, helper
    inverse: p.ink800,
    link: p.chartreuse500,       // links pop in chartreuse in dark
    onAccent: p.ink800,          // chartreuse stays bright → text stays ink
    onBrand: p.ink800,           // brand.primary is paper in dark → text is ink
  },

  border: {
    default: 'rgba(248,244,236,0.12)',
    subtle: 'rgba(248,244,236,0.06)',
    strong: p.paper100,
    accent: p.chartreuse500,
  },

  feedback: {
    success: {
      default: p.green400,
      strong: p.green600,
      soft: p.green500,
      muted: 'rgba(74,222,128,0.15)',
      onSurface: p.green200,
    },
    warning: {
      default: p.amber400,
      strong: p.amber500,
      soft: p.amber500,
      muted: 'rgba(251,191,36,0.15)',
      onSurface: p.amber200,
    },
    error: {
      default: p.red400,
      strong: p.red600,
      soft: p.red500,
      muted: 'rgba(248,113,113,0.15)',
      onSurface: p.red200,
    },
    info: {
      default: p.blue400,
      strong: p.blue600,
      soft: p.blue300,
      muted: 'rgba(96,165,250,0.15)',
      onSurface: p.blue300,
    },
  },

  urgency: {
    critical: p.red400,    // ASAP — shifted lighter for dark contrast
    high: p.blue400,       // today
    scheduled: p.blue400,
    flexible: p.green400,
  },

  badge: {
    verified: p.green400,
    boosted: p.amber400,
    privatePool: p.violet400,
    chartreuse: p.chartreuse500,
    flame: p.flame500,
  },

  overlay: {
    scrim: 'rgba(0,0,0,0.7)',
    scrimStrong: 'rgba(0,0,0,0.9)',
    scrimSoft: 'rgba(248,244,236,0.08)',
    onMedia: 'rgba(0,0,0,0.5)',
    glassLight: 'rgba(248,244,236,0.12)',
    glassDark: 'rgba(0,0,0,0.45)',
  },

  fixed: {
    white: p.white,
    black: p.black,
    transparent: 'transparent',
  },
};

// ---------------------------------------------------------------------------
// Theme shape — what consumers get from useTheme()
// ---------------------------------------------------------------------------

export interface Theme {
  scheme: 'light' | 'dark';
  isDark: boolean;
  color: SemanticColor;
  space: typeof space;
  inset: typeof inset;
  gap: typeof gap;
  radius: typeof radius;
  cornerRadius: typeof cornerRadius;
  borderWidth: typeof borderWidth;
  fontSize: typeof fontSize;
  fontWeight: typeof fontWeight;
  lineHeight: typeof lineHeight;
  letterSpacing: typeof letterSpacing;
  textStyle: typeof textStyle;
  size: typeof size;
  shadow: typeof shadow;
  elevation: typeof elevation;
  motion: typeof motion;
  zIndex: typeof zIndex;
}

const baseTokens = {
  space,
  inset,
  gap,
  radius,
  cornerRadius,
  borderWidth,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  textStyle,
  size,
  shadow,
  elevation,
  motion,
  zIndex,
} as const;

export const lightTheme: Theme = {
  scheme: 'light',
  isDark: false,
  color: lightColor,
  ...baseTokens,
};

export const darkTheme: Theme = {
  scheme: 'dark',
  isDark: true,
  color: darkColor,
  ...baseTokens,
};

// ---------------------------------------------------------------------------
// Provider + hook
// Provider is OPTIONAL — useTheme() falls back to system color scheme.
// Pass a `scheme` prop to force light or dark (useful for previews / tests).
// ---------------------------------------------------------------------------

const ThemeContext = createContext<Theme | null>(null);

export interface ThemeProviderProps {
  children: React.ReactNode;
  /** Force a specific scheme. Omit to follow the system. */
  scheme?: 'light' | 'dark';
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  scheme,
}) => {
  const system = useColorScheme();
  const resolved = resolveTheme(scheme ?? system);
  return (
    <ThemeContext.Provider value={resolved}>{children}</ThemeContext.Provider>
  );
};

/**
 * Resolve a theme from a color scheme string. Defaults to light if null.
 * Exposed for use outside React (e.g. StyleSheet helpers, native modules).
 */
export function resolveTheme(scheme: ColorSchemeName | 'light' | 'dark'): Theme {
  return scheme === 'dark' ? darkTheme : lightTheme;
}

/**
 * Primary consumer API. Works with or without a ThemeProvider — when no
 * provider is mounted it reads the system color scheme directly.
 */
export function useTheme(): Theme {
  const ctx = useContext(ThemeContext);
  const system = useColorScheme();
  return useMemo(() => ctx ?? resolveTheme(system), [ctx, system]);
}

/**
 * Helper for screens that want themed StyleSheets without re-deriving on
 * every render. Call inside a component and memoize the returned stylesheet.
 *
 *   const styles = useThemedStyles((t) => ({
 *     card: { backgroundColor: t.color.surface.primary, padding: t.inset.card },
 *   }));
 */
export function useThemedStyles<T>(factory: (theme: Theme) => T): T {
  const theme = useTheme();
  return useMemo(() => factory(theme), [theme, factory]);
}
