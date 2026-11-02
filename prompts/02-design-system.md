# 02 · Design system

Status: done

## Goal
Every Roam screen draws from one set of tokens (fonts, colors, spacing, radii, shadows) and one set of shared components that match the reference sheet "Roam design system" (sections 01–15). A dev-only `/design-system` screen shows every token and component, so it can be checked against the reference.

## Decisions
- Built with the `expo-design-system` skill, in NativeWind v5's idiom. Tailwind `@theme` in `src/global.css` is the single source of truth for tokens. There is no separate `src/theme/` token set.
- JS needs raw color values for things that can't take `className`: Lucide icon `color`, `Switch` `trackColor`, and `placeholderTextColor`. For those, `src/theme/colors.ts` mirrors the color tokens with the same names, and a comment points to `global.css`. Nothing else may hold a hex value.
- All token values are in `px`, never `rem`, because NativeWind treats `rem` as 14 on native and 16 on web.
- `--spacing: 4px` makes Tailwind's numeric scale a 4-point grid on every platform (`p-1` = 4, `p-4` = 16, `p-5` = 20, `p-6` = 24). Screen edge padding is `px-5` (20), estimated from the sheet.
- **Font:** Plus Jakarta Sans (the user's choice; the sheet only says "Geometric Sans"), from `@expo-google-fonts/plus-jakarta-sans`.
  - Load it at runtime with `useFonts` in `src/app/_layout.tsx`, holding the splash screen until it's ready. That way it works in Expo Go, unlike the config plugin.
  - Register each weight under our own family name (`PlusJakartaSans-Regular`, `-Medium`, `-SemiBold`, `-Bold`, `-ExtraBold`), so the name is the same on iOS, Android and web.
  - Weights are chosen with `font-*` family utilities (`font-sans-bold`), never `font-bold`. On native, `font-bold` only sets `fontWeight`, and iOS would then fall back or fake the weight.
- **Icons:** Lucide (`lucide-react-native` + `react-native-svg`), the user's choice, matching the sheet's 2px outline style. Every icon is drawn through one `Icon` component, with sizes 16/20/24 and a color token.
- **Light only for now.** Set `app.json` `userInterfaceStyle` to `"light"`. Tokens have semantic names (`text-primary`, `surface`), so a dark palette can be added later without touching components.
- **Scope:** the user asked for every component in the sheet now, including the listing card, policy card, profile row and glass tab bar.
- **`className` merging:** components accept a `className` for layout only (margin, flex, width) and add it to the end of their own classes. No tailwind-merge: NativeWind resolves conflicting classes by stylesheet order, not string order, so callers must not override a component's colors. A missing variant is added to the component instead.
- **Toggle:** use React Native's `Switch` directly, styled with tokens (`trackColor` primary). Per the skill, it isn't wrapped, because native controls already carry the platform look.
- **Glass tab bar:** a presentational `GlassTabBar` (items, active key, `onSelect`).
  - On iOS 26+ it uses `GlassView` from `expo-glass-effect` (already installed). Elsewhere it falls back to the Glass Blur token fill plus a shadow.
  - There are no tab routes yet, so it isn't wired to navigation. The first plan that adds tabs passes it to Expo Router `Tabs` as `tabBar`.
- **Brand assets not in `assets/`:**
  - The "roam" wordmark: a marked placeholder that renders the word in Plus Jakarta Sans ExtraBold.
  - The Google "G" logo: a marked placeholder until the user supplies the official asset.
  - Listing photos: remote placeholder images through `expo-image`.
- `/design-system` exists only in development. In production builds it redirects to `/`.

### Tokens
Values marked **(est.)** have no label on the sheet and were estimated from the image. They are the proposed new tokens.

**Colors** (`--color-*`, so `bg-primary`, `text-text-secondary`, `border-border`):
| Token | Value | Use |
|---|---|---|
| `primary` | `#FFC629` | Primary actions, active states |
| `primary-soft` | `#FFF4D1` **(est.)** | "Guest favorite" badge |
| `lavender` | `#C9B4FF` | Secondary actions, highlights, selected filter chip, focused field border |
| `lavender-soft` | `#F3EEFF` **(est.)** | Focused field fill, policy card fill |
| `lavender-strong` | `#7C5CE0` **(est.)** | Policy card icons |
| `text-primary` | `#0B0B1A` | Headings, primary text, selected segment |
| `text-secondary` | `#6B7280` | Body text, secondary text |
| `text-placeholder` | `#9CA3AF` **(est.)** | Input placeholders, "/ night" |
| `surface` | `#FFFFFF` | Cards, sheets, modals |
| `surface-gray` | `#F4F5F7` | App background, input fields, icon buttons |
| `border` | `#E5E7EB` | Dividers, borders |
| `glass` | `rgba(255,255,255,0.7)` | Tab bar, glass surfaces |
| `success` | `#22A447` **(est.)** | Success icon |
| `success-soft` | `#E7F6EC` **(est.)** | Success alert, "New" badge fill |
| `success-text` | `#1E6B3A` **(est.)** | Success alert, "New" badge text |
| `danger` | `#E5484D` **(est.)** | Error icon, error alert text |
| `danger-soft` | `#FDECEE` **(est.)** | Error alert fill, "20% off" badge fill |
| `info-soft` | `#EAF0FF` **(est.)** | "Superhost" badge fill |
| `info-text` | `#3451B2` **(est.)** | "Superhost" badge text |

**Typography.** Each style is one utility (`@utility text-display { font-family; font-size; line-height }`), so screens never set raw sizes:
| Style | Font | Size / line height | Sheet |
|---|---|---|---|
| `display` | ExtraBold | 56 / 56 | Display 56–64, line height 1.0 |
| `heading` | Bold | 28 / 34 | Heading 28–32, line height 1.2 |
| `title` | Bold | 20 / 24 **(est.)** | Listing card title |
| `body` | Regular | 16 / 24 | Body 16, line height 1.5 |
| `label` | Medium | 15 / 20 **(est.)** | Chips, profile rows, field text |
| `caption` | Medium | 14 / 20 | Caption 14 |
| `small` | Regular | 12 / 16 **(est.)** | Policy card descriptions, tab labels |
| `button` | SemiBold | 17 / 22 | Button 17–18 |

The wordmark uses `display` at 72 **(est.)**.

**Radii** (`--radius-*`): `sm` 8, `md` 12, `lg` 16 (inputs, listing photo), `xl` 20 (cards), `2xl` 24 (sections, tab bar), `full` (buttons, chips, icon buttons, toggles). All values are estimated from the sheet.

**Shadows** (`@utility`, as `boxShadow` strings, all **(est.)**):
- `shadow-card`: `0 1px 2px rgba(11,11,26,0.05)`
- `shadow-raised`: `0 4px 12px rgba(11,11,26,0.08)`
- `shadow-overlay`: `0 8px 24px rgba(11,11,26,0.12)` (tab bar)

**Sizes** (all **(est.)**):
- Button heights: `md` 48, `lg` 56.
- Icon button: 56.
- Input height: 56.
- Chips: `md` 48 (filter), `sm` 40 (category).
- Tab bar: 72 tall, active circle 64.

## Out of scope
- Dark mode palette.
- Navigation: tab routes, wiring `GlassTabBar` into `Tabs`, real screens.
- Real data for listing and policy cards. Props only; Sanity comes later.
- Official logo and Google "G" assets (placeholders until supplied).
- Haptics and animation polish beyond pressed states.

## Steps
### 1. Fonts and light mode
- `npx expo install @expo-google-fonts/plus-jakarta-sans`. `expo-font` and `expo-splash-screen` are already installed.
- `src/app/_layout.tsx`:
  - Call `SplashScreen.preventAutoHideAsync()` at module level.
  - Call `useFonts({ "PlusJakartaSans-Regular": PlusJakartaSans_400Regular, … ExtraBold })`.
  - Render `null` until loaded or errored, then hide the splash screen.
  - Keep `import "../global.css"`.
- `app.json`: set `userInterfaceStyle` to `"light"`.

Done when the app starts and the fonts load in Expo Go.

### 2. Tokens
- `src/global.css`: add an `@theme` block containing:
  - `--spacing: 4px`
  - every color and radius above
  - `--font-sans*` families mapped to the registered names (`--font-sans` is Regular, plus `--font-sans-medium`, `-semibold`, `-bold`, `-extrabold`)
- Add the `@utility` blocks for each text style and shadow.
- Keep the split Tailwind imports from plan 01.
- `src/theme/colors.ts`: a JS mirror of the color tokens with the same keys (`colors.primary`), commented "mirror of src/global.css, keep in sync". Also `src/theme/index.ts`, which re-exports it.

Done when `npx tsc --noEmit` passes and the web build's CSS contains `bg-primary` and `text-display` when used.

### 3. Icons
- `npx expo install lucide-react-native react-native-svg`.
- `src/components/ui/icon.tsx`: `Icon({ icon: LucideIcon, size = "md", color = "text-primary" })`.
  - Sizes: `sm` 16, `md` 20, `lg` 24.
  - `color` is a key of `colors`.
  - Stroke width is 2, decorative by default (`accessible={false}`).

Done when one icon renders on iOS, Android and web.

### 4. Primitives (`src/components/ui/`)
Each component has the variants, sizes and states listed, pressed feedback through a `Pressable` style function, accessibility role, state and label, and a layout-only `className`. Icons come from Lucide.
- `text.tsx`: `Text({ variant = "body", tone = "primary" | "secondary" | "placeholder" | "inverse" })`. Only text styles from the typography table.
- `wordmark.tsx`: the "roam" placeholder, marked with `// PLACEHOLDER: replace with logo asset`.
- `button.tsx`: `Button({ title, variant: "primary" | "secondary", size: "md" | "lg", leading?, trailing?, loading, disabled, onPress })`.
  - Primary: `bg-primary`, `text-text-primary`, pill shape, with a trailing `ArrowRight` in the sheet.
  - Secondary: `bg-surface`, `border-border`, pill shape, with a leading slot for the Google "G" placeholder.
  - Pressed: opacity 0.85. Disabled: 0.4. Loading shows a spinner and keeps the label for accessibility.
- `icon-button.tsx`: `IconButton({ icon, accessibilityLabel (required), selected?, onPress })`. A 56 circle on `bg-surface-gray`. The selected state fills the icon, as the favorite heart does.
- `text-field.tsx`: `TextField({ icon?, trailing?, secure?, …TextInputProps })`.
  - 56 tall, `bg-surface-gray`, `rounded-lg`.
  - Focused: `bg-lavender-soft`, 1.5px `border-lavender`.
  - With `secure`, the trailing slot shows an Eye/EyeOff toggle labeled "Show password" or "Hide password".
  - `search-field.tsx` wraps it with a `Search` icon and a trailing `SlidersHorizontal` filter button (`onFilterPress`).
- `chip.tsx`: `Chip({ label, icon?, selected, size: "md" | "sm", tone: "lavender" | "primary", onPress })`.
  - Section 06 row 1 is `md` lavender. Row 2 is `sm` primary with icons.
  - Unselected: `bg-surface`, `border-border`.
  - Accessibility role "button" with a `selected` state.
- `badge.tsx`: `Badge({ label, tone: "favorite" | "success" | "promo" | "info", icon? })`. A pill using the `*-soft` fill and its text color. "favorite" shows a `Star` icon.
- `alert.tsx`: `Alert({ tone: "success" | "error", message, onDismiss? })`.
  - Icon: `CircleCheck` or `CircleAlert`. Close button: `X`, labeled "Dismiss".
  - `rounded-lg`, with `accessibilityRole="alert"`.
- `segmented-control.tsx`: `SegmentedControl({ options: { value, label, icon }[], value, onChange })`.
  - Selected segment: `bg-text-primary` with white text and icon.
  - Track: `bg-surface-gray`, `rounded-full`.
  - Each segment uses role "tab" with a `selected` state.
- `stepper.tsx`: `Stepper({ value, min, max, onChange, label })`.
  - `Minus`/`Plus` buttons are disabled at the limits.
  - `accessibilityRole="adjustable"` with increment and decrement actions.
- `index.ts`: re-exports everything.

Done when all of these render on `/design-system` (step 6).

### 5. Composites (`src/components/`)
- `listing-card.tsx`: `ListingCard({ title, location, rating, reviewCount, amenities: { icon, label }[], pricePerNight, imageUri, favorite, onToggleFavorite, onPress })`.
  - Layout: an `expo-image` photo (`rounded-lg`, 160 square **(est.)**) on the left, with a heart `IconButton` (small, white) over it.
  - The text column on the right holds:
    - the title in `title` style
    - `MapPin` and the location in `text-secondary`
    - a `Star` with the rating and "(count)"
    - the amenities as small chips
    - "$280" in `title` with "/ night" in `text-placeholder`
  - Card: `bg-surface`, `rounded-xl`, `shadow-card`.
- `policy-card.tsx`: `PolicyCard({ icon, title, description, onPress })`. `bg-lavender-soft`, `rounded-xl`, a 48 icon tile in `lavender-strong`, and a `ChevronRight`.
- `profile-row.tsx`: `ProfileRow({ icon, label, onPress })` and `ProfileRowGroup({ children })`. The group is `bg-surface` with `rounded-xl` and hairline `border-border` dividers between rows, not one card per row.
- `glass-tab-bar.tsx`: `GlassTabBar({ items: { key, label, icon }[], activeKey, onSelect })`.
  - Each item shows its icon over a `small` label.
  - The active item sits on a 64 `bg-primary` circle.
  - Uses `GlassView` when `isLiquidGlassAvailable()`, otherwise the `bg-glass` fill with `shadow-overlay`.
  - Bottom padding comes from the safe area insets.
  - Each item uses role "tab" with a `selected` state.

Done when all of these render on `/design-system`.

### 6. Preview screen
- `src/app/design-system.tsx`: a scrolling `bg-surface-gray` screen. Its sections match the sheet's numbering:
  - 01 Brand (wordmark and tagline)
  - 02 color swatches with names and hex values, read from `colors`
  - 03 type ramp
  - 04 buttons, 05 fields, 06 chips, 07 listing card, 08 policy cards, 09 profile rows
  - 10 tab bar, 11 icons, 12 segmented control
  - 13 `Switch` and `Stepper`
  - 14 alerts, 15 badges

  Every interactive item works with local state. When `!__DEV__`, the screen renders `<Redirect href="/" />`.
- `src/app/index.tsx`: in `__DEV__`, show a "Design system" `Button` that links to `/design-system`. Keep the existing welcome text, restyled with `Text`.

Done when the screen scrolls with every section and every control responds.

## Verification
- `npx tsc --noEmit` passes.
- `npx expo lint` passes.
- Hardcoded-value audit:
  - `rg "#[0-9A-Fa-f]{3,8}" src --glob '!src/theme/colors.ts' --glob '!src/global.css'` finds nothing.
  - `rg "fontSize|StyleSheet.create|font-bold" src` finds nothing.
- `npx expo export --platform ios` and `--platform web` both bundle. The web CSS contains `--color-primary` and `text-display`.
- `npx expo-doctor` reports no dependency mismatches.
- End to end: run `npx expo start --clear` and open in Expo Go (iOS or Android) and on web. Tap "Design system" and check:
  - Plus Jakarta Sans everywhere, with no system-font fallback.
  - The colors match the swatches.
  - Typing in the fields moves the focus styling.
  - The password eye toggles.
  - Chips, segments, the tab bar, the toggle and the stepper change state. The stepper stops at its limits.
  - The alert closes.
  - The heart toggles.
  - Pressed states are visible.
- Then compare with the reference side by side, section by section, and list every difference. A simulator screenshot (`xcrun simctl io booted screenshot`) needs a Mac, so on Windows the comparison is done from a device or web screenshot.

## AGENTS.md updates
Extend `## Styling`:
- Tokens live in `@theme` in `src/global.css`, in `px`. `src/theme/colors.ts` mirrors the color tokens for JS-only props (icon color, `Switch`, placeholders), and both change together. No hex values, `fontSize`, or `StyleSheet.create` anywhere else.
- Spacing is a 4px grid through Tailwind's numeric scale. Screen edge padding is `px-5`.
- Text uses the `Text` component's variants (display, heading, title, body, label, caption, small, button). Font weights come from `font-sans-*` families, never `font-bold`.
- Icons are Lucide, drawn through `Icon`. Brand assets come from `assets/`.
- Shared primitives live in `src/components/ui/` and composites in `src/components/`. Components take `className` for layout only; a new look means a new variant.
- Light mode only for now (`userInterfaceStyle: "light"`).
- `/design-system` is the living reference. Add new components to it.

## Result
Built as planned. Where the build differs from the plan:
- **Regular weight:** `nativewind/theme` sets `--font-sans` to `System` or `SystemAndroid` per platform at runtime, which would beat our value. Regular therefore uses its own `--font-sans-regular`. The compiled iOS bundle confirms `text-body` resolves to `PlusJakartaSans-Regular` at 16/24.
- **Tailwind defaults removed:** `--color-*` and `--radius-*` are reset in `@theme`, so only Roam tokens compile (`bg-blue-500` no longer exists). The wordmark size is a `text-wordmark` utility (72/72) rather than an inline size.
- **Pressed and disabled feedback:** done with NativeWind `active:` and `opacity-*` classes instead of a `Pressable` style function, which is NativeWind's idiom.
- **Third-party components:** `expo-image` and `GlassView` get `className` through `styled()`. `GlassView` uses the default mapping (`className` to `style`), because an explicit mapping made its prop types too complex for `tsc`.
- **Small additions:**
  - `Text` tones `success`, `danger` and `info`, for alerts and badges.
  - A `TextField` `variant` (`filled`, or `outlined` for the search field, which is white with a border on the sheet).
  - An `IconButton` `sm` size and `white` tone, for the heart on the listing photo.
  - `GlassTabBar` `respectSafeArea`, so it can be shown inline on `/design-system`.
- **Headers:** screen titles come from the stack header (`Stack.Screen` title "Design system").

Verification:
- ✅ `tsc --noEmit` and `expo lint` pass.
- ✅ The hex and `fontSize`/`StyleSheet.create`/`font-bold` audits find nothing.
- ✅ `npx expo install --check` reports dependencies up to date.
- ✅ The web and iOS exports bundle. The web CSS contains the token variables and utilities, and the iOS bundle resolves every font family.
- ❌ `npx expo-doctor` fails to start on this machine ("Access is denied" from npx).
- ❌ Not checked on a device or the simulator yet, and no side-by-side comparison with the reference yet.
