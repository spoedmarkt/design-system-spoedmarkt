# Soft Pro Token Audit

Archaeological pass over `spoedmarktplaats-mobile/src/{screens,components,navigation}`.
Goal: turn the de-facto style vocabulary already hiding in screens into a
declarative token system. **No UI or component code was modified.** The output
of this audit lives in `tokens.ts` and `theme.ts` (same folder).

---

## 1. What was found

### 1a. Colors

Total distinct hex literals across screens + components: **~60**.
Top of the frequency table:

| Count | Hex      | Role found in code                          | Mapped to                          |
| ----: | -------- | ------------------------------------------- | ---------------------------------- |
|    51 | `#FFF`   | card / sheet / input background             | `surface.primary` / `fixed.white`  |
|    31 | `#000`   | overlay / icon                              | `fixed.black` / overlay tokens     |
|    22 | `#E3FF00`| accent / chartreuse highlights              | `brand.accent`                     |
|    21 | `#1A1814`| body text, primary buttons                  | `text.primary` / `brand.primary`   |
|    14 | `#FCFAF7`| screen background                          | `surface.background`               |
|    11 | `#6B6359`| caption / metadata text                     | `text.secondary`                   |
|     9 | `#3B9C4F`| deal status, secondary green                | `feedback.success.soft` (new bucket) |
|     7 | `#F8FFB3`| accent-tinted callouts                      | `brand.accentSoft` / `surface.tinted` |
|     7 | `#F8F4EC`| dark-mode text / light cards                | `paper100` primitive               |
|     7 | `#F2EEE8`| secondary surface (chip background etc.)   | `surface.secondary`                |
|     7 | `#16A34A`| verified badge / success                    | `feedback.success.default`         |
|     6 | `#FF5F1F`| Projectversterking brand                    | `brand.flame`                      |
|     6 | `#FBBF24`| boost / warning soft                        | `feedback.warning.soft`            |
|     6 | `#DC2626`| destructive / error                         | `feedback.error.default`           |
|     6 | `#15130F`| dark-mode background                        | `dark900` primitive                |

**Collapses made** (where multiple hexes were doing the same job):

- `#FF6B00` (1), `#FF6B35` (4), `#FF5F1F` (6) → all flame variants → **single** `brand.flame` (#FF5F1F)
- `#16A34A` (7), `#15803D` (3), `#4ADE80` (3), `#059669` (2), `#1A5C2A` (1), `#3B9C4F` (9), `#86EFAC` (1), `#DCFCE7` (1) → **5 buckets** under `feedback.success.*` (default/strong/soft/muted/onSurface) — keep `#3B9C4F` as `.soft` because it's used distinctly in deal flow
- `#DC2626` (6), `#F87171` (3), `#EF4444` (1), `#FEE2E2` (1) → **4 buckets** under `feedback.error.*`
- `#F59E0B` (2), `#FBBF24` (6), `#FDE047` (1), `#FEF9C3` (1), `#D97706` (2), `#A16207` (1), `#CA8A04` (1), `#FFD54F` (1), `#FFF8E1` (1), `#F5A623` (3) → **5 buckets** under `feedback.warning.*` — the various ambers were doing the same job inconsistently
- `#2563EB` (3), `#3B82F6` (existing), `#0891B2` (2), `#0284C7` (2), `#60A5FA`, `#93C5FD` (4) → **4 buckets** under `feedback.info.*` plus dedicated `urgency.today`
- `#6B7280` (3), `#4A4A4A` (1), `#64748B` (1), `#888`, `#111`, `#1A1A1A` (1), `#E0E0E0`, `#E8E8E8`, `#F5F5F5`, `#E2E8F0` → **cool/neutral grays leaking in** — these don't belong in Soft Pro and were collapsed to the warm equivalents (`text.secondary`, `border.subtle`, `surface.secondary`). Anywhere a screen uses one of these today, it should switch to the warm token.

### 1b. Spacing

Distinct integer literals on `padding*` / `margin*` / `gap`: 27 values.
After clustering onto an 8pt grid:

| Step | Hits | Token            |
| ---: | ---: | ---------------- |
|    2 |   42 | `space.hairline` |
|    4 |   63 | `space.xs`       |
|    8 |   54 | `space.sm`       |
|   12 |   51 | `space.md`       |
|   16 |   34 | `space.lg`       |
|   20 |   16 | `space.xl`       |
|   24 |   13 | `space['2xl']`   |
|   32 |    3 | `space['3xl']`   |
|   48 |    1 | `space['4xl']`   |

Off-grid values found and where they should snap:

- `3` (14) → `xs` (4) — drift in chip internals
- `5` (9) → `xs` (4)
- `6` (31) → `sm` (8) — the most common off-grid value; tighten to grid
- `7` (1), `9` (1) → `sm` (8)
- `10` (40) → `md` (12) — heavy hitter; rounds up
- `14` (25) → `lg` (16)
- `18` (19) → `xl` (20)
- `22` (1), `28` (2) → `2xl` (24)

The semantic aliases (`inset.*`, `gap.*`) layer over these so screens
can express *intent* (`inset.card`) rather than *step* (`space.lg`).

### 1c. Font size

22 distinct sizes (11 → 80). The cluster:

| Token         | px | Hits | Replaces drift             |
| ------------- | -: | ---: | -------------------------- |
| `micro`       | 11 |   44 | tab labels                 |
| `caption`     | 12 |   44 | small captions             |
| `captionLg`   | 13 |   54 | dominant caption variant   |
| `label`       | 14 |   40 | field labels, button copy  |
| `body`        | 16 |   18 | body                       |
| `bodyLg`      | 17 |    9 | emphasized body            |
| `subheading`  | 18 |    3 | small section header       |
| `heading`     | 22 |   11 | card title                 |
| `title`       | 26 |    2 | screen heading             |
| `display`     | 32 |    3 | hero number                |
| `hero`        | 40 |    1 | landing hero               |

Outliers collapsed: 9→11, 10 (8)→11, 15 (33)→14, 20→18, 24→22, 28 (5)→26, 30 (2)→32, 34 (2)→32.

### 1d. Border radius

15 distinct values; 999 (pill) is its own thing. Clustered to:

| Token       | px | Hits | Notes                       |
| ----------- | -: | ---: | --------------------------- |
| `xs`        |  4 |   16 |                             |
| `sm`        |  8 |    4 | (low — chips prefer pill)   |
| `md`        | 12 |   12 | controls                    |
| `lg`        | 16 |   21 | cards                       |
| `xl`        | 20 |   40 | hero cards — biggest bucket |
| `2xl`       | 24 |    0 | sheet/modal                 |
| `pill`      |999 |   10 | chips / avatars             |

Outliers collapsed: 3→4, 6→4, 10 (19)→12, 13 (8)→12, 14 (37)→16, 17 (4)→16, 18 (4)→20, 22 (8)→20, 28 (4)→24.

### 1e. Border width

| Token       | px  | Hits |
| ----------- | --: | ---: |
| `hairline`  | 1   |  110 |
| `thin`      | 1.5 |   12 |
| `thick`     | 2   |   15 |

### 1f. Font weight

`'600'` (102), `'700'` (80), `'500'` (29), `'400'` (5). Exposed as
`semibold | bold | medium | regular`.

### 1g. Sizes (controls, icons, avatars)

The width/height audit revealed a clear control + avatar ladder:

- **44** (23 hits) — tap target minimum (Apple HIG) → `controlMd`
- **52** (8) — primary button height → `controlLg` (matches existing `buttonHeight`)
- **56** (14) — large control / large avatar → `controlXl` / `avatarLg`
- **72** (10), **80** (14) — `avatarXl`, `avatar2xl`
- **20** (35 in icon-size grep) — default icon → `iconMd`

### 1h. Elevation

Audit found **4 hits** of `shadow*` properties across the entire mobile
src tree. Soft Pro is intentionally flat; borders carry hierarchy. The
token set keeps `elevation.none` as the default and offers `sheet` /
`modal` for the two cases where lift is genuinely needed.

---

## 2. What was already correct

The existing `src/theme/themes.ts` already had a coherent light/dark
split and most of the brand semantics. The audit kept its names where
they made sense:

- `lightColors.primary`, `.accent`, `.spoedChartreuse`, `.projectFlame` → carried over
- Urgency tokens (`urgencyASAP/Today/Scheduled/Flexible`) → carried over (Scheduled and Today were identical hex; collapsed)
- Badge tokens (`verified`, `boosted`, `privatePool`) → carried over
- Motion `quick/standard/slow` → carried over verbatim

The gap was that screens **weren't using these tokens consistently** —
they fell back to hardcoded hex and ad-hoc spacing. The new tokens
file makes the existing palette explicit and adds the missing buckets
(`feedback.success.soft`, `surface.tinted`, `border.strong`, etc.) the
screens were already inventing inline.

---

## 3. How dark mode is derived

Dark mode is built in `theme.ts`, not duplicated in tokens. Each
semantic key in `darkColor` re-maps to the same `palette` primitives
(paper, ink, warm, chartreuse) but inverted:

- `surface.background` → `dark900` (deep warm dark)
- `text.primary` → `paper100` (warm paper text)
- `text.link` → `chartreuse500` (links pop on dark)
- `border.default` → translucent paper at 12% opacity
- Status colors shift one step lighter (`green600` → `green400`) for
  contrast on dark surfaces

The brand accent (`chartreuse500`) and flame (`flame500`) intentionally
stay identical across modes — they're the brand signal.

---

## 4. Public API

```ts
import { useTheme } from './theme';

function MyScreen() {
  const t = useTheme();
  return (
    <View
      style={{
        backgroundColor: t.color.surface.primary,
        padding: t.inset.card,
        borderRadius: t.cornerRadius.card,
        borderWidth: t.borderWidth.hairline,
        borderColor: t.color.border.subtle,
      }}
    >
      <Text style={[t.textStyle.heading, { color: t.color.text.primary }]}>
        Hello
      </Text>
    </View>
  );
}
```

- `useTheme()` works with or without `<ThemeProvider>` — falls back to
  `useColorScheme()`.
- `<ThemeProvider scheme="dark">` lets previews / screenshots force a
  specific mode.
- `useThemedStyles(t => ({...}))` is a memoized helper for screens that
  prefer `StyleSheet` ergonomics.

---

## 5. What this audit did NOT do

Per the brief:

- **No screens or components were edited.** Migrating screens to the
  new tokens is a separate pass.
- **No UI behavior was changed.** This is purely additive.
- The legacy `src/theme/{themes,theme,ThemeContext}.ts` files are
  untouched — they continue to work for existing imports.

A future migration pass would replace inline hex / magic numbers in
screens with `useTheme()` references, screen-by-screen.
