# 01 · NativeWind v5 setup

Status: done

## Goal
Developers can style any React Native component with Tailwind classes through `className`, on iOS, Android, and web.

## Decisions
- Follow https://www.nativewind.dev/v5/getting-started/installation (full reference: https://www.nativewind.dev/v5/llms-full.txt).
- Use the release candidate pair the docs require: `nativewind@5.0.0-rc.0` with `react-native-css@3.1.0-rc.0`, pinned exactly. It is pre-release; NativeWind v4 is the stable alternative, but v4 is built for older Tailwind and setups.
- Dev dependencies pinned as the docs specify: `tailwindcss@4.1.12`, `@tailwindcss/postcss@4.1.12`, `postcss`, `lightningcss@1.30.1`.
- `lightningcss` is pinned to `1.30.1` through `overrides` in `package.json`, otherwise `global.css` can fail to deserialize at build time.
- Install with `npx expo install` so versions resolve for the SDK. Exact pins from the docs are passed explicitly (`npx expo install nativewind@5.0.0-rc.0 ...`).
- The docs list the tested target as Expo SDK 57. This app is on SDK 58. The engine requires React Native 0.81 or newer and `@expo/metro-config` 54 or newer, which SDK 58 meets. If styling misbehaves, suspect the SDK difference first.
- Already present, no change needed: `react-native-reanimated`, `react-native-worklets`, `react-native-safe-area-context`, `expo-system-ui`, and `"userInterfaceStyle": "automatic"` in `app.json`.
- `global.css` lives at `src/global.css` and is imported once in `src/app/_layout.tsx`.
- Use the docs' split Tailwind imports, not a single `@import "tailwindcss"`. That keeps utilities unlayered, so they win over React Native Web defaults.
- No Babel config. v5 needs no `nativewind/babel` preset and no `jsxImportSource`.

## Out of scope
- Design tokens, theme colors, fonts, dark-mode palette (the design-system plan).
- Converting screens other than the home placeholder.
- `prettier-plugin-tailwindcss`.

## Steps
### 1. Install packages
Run:
~~~bash
npx expo install nativewind@5.0.0-rc.0 react-native-css@3.1.0-rc.0
npx expo install --dev tailwindcss@4.1.12 @tailwindcss/postcss@4.1.12 postcss lightningcss@1.30.1
~~~
Add to `package.json`:
~~~json
"overrides": { "lightningcss": "1.30.1" }
~~~
then run `npm install`. npm may block the `@tailwindcss/oxide` postinstall script. That is harmless if `node_modules/@tailwindcss/oxide-<platform>` exists.
Done when `package.json` shows the exact pins and the app still starts.

### 2. Add config files
- `metro.config.js`: wrap `getDefaultConfig(__dirname)` from `expo/metro-config` with `withNativewind` from `nativewind/metro`.
- `postcss.config.mjs`: `export default { plugins: { "@tailwindcss/postcss": {} } };` (not `.cjs`).
- `src/global.css`:
  ~~~css
  @import "tailwindcss/theme.css" layer(theme);
  @import "tailwindcss/preflight.css" layer(base);
  @import "tailwindcss/utilities.css";

  @import "nativewind/theme";
  ~~~
- `nativewind-env.d.ts` at the root: `/// <reference types="react-native-css/types" />` plus the docs' "do not edit" note. The existing `**/*.ts` include in `tsconfig.json` covers it.
Done when `npx tsc --noEmit` passes.

### 3. Wire up and prove it works
- `src/app/_layout.tsx`: add `import "../global.css";` at the top.
- `src/app/index.tsx`: replace the `StyleSheet` with `className="flex-1 items-center justify-center bg-white"` on the `View` and `className="text-xl font-bold text-blue-500"` on a `Text` reading "Welcome to Nativewind!".
Done when the home screen renders styled.

## Verification
- `npx tsc --noEmit` passes.
- `npx expo lint` passes.
- `npx expo export --platform ios` bundles without errors.
- `npx expo export --platform web` bundles, and the emitted CSS contains `flex-1` and `text-blue-500`.
- End to end: `npx expo start --clear`, press `i`. The iOS simulator shows bold blue "Welcome to Nativewind!" centered on white. Press `w` and check the same on web.

## AGENTS.md updates
New `## Styling` section:
- Style with NativeWind v5 `className`. No `StyleSheet.create` for new UI.
- `nativewind` and `react-native-css` are pinned as an exact RC pair. Upgrade them together, never separately. Keep the `lightningcss` override in sync with the docs.
- `src/global.css` is imported once in `src/app/_layout.tsx`. Keep the split Tailwind imports.
- After changing `metro.config.js`, `postcss.config.mjs`, or `global.css`, restart with `npx expo start --clear`.

## Result
Built as planned, except the packages were installed with `npm install --save-exact` rather than `npx expo install`. The pins are the exact versions the docs require, so the outcome is the same. The plan was written and approved after the build; the build itself skipped the approval step.

- Type check, lint, iOS bundle, and web bundle all pass. The web CSS contains `flex-1` and `text-blue-500`.
- `npx expo lint` set up ESLint on first run: `eslint` and `eslint-config-expo` were added as dev dependencies, along with `eslint.config.js`. Its first run failed with a version error, and the second run passed.
- Not yet checked: the styled screen in the iOS simulator.
