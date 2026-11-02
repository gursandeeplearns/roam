// Mirror of the --color-* tokens in src/global.css, keep in sync.
// Only for props that can't take className: icon color, Switch trackColor, placeholderTextColor.
export const colors = {
  primary: "#FFC629",
  "primary-soft": "#FFF4D1",
  lavender: "#C9B4FF",
  "lavender-soft": "#F3EEFF",
  "lavender-strong": "#7C5CE0",
  "text-primary": "#0B0B1A",
  "text-secondary": "#6B7280",
  "text-placeholder": "#9CA3AF",
  surface: "#FFFFFF",
  "surface-gray": "#F4F5F7",
  border: "#E5E7EB",
  glass: "rgba(255,255,255,0.7)",
  success: "#22A447",
  "success-soft": "#E7F6EC",
  "success-text": "#1E6B3A",
  danger: "#E5484D",
  "danger-soft": "#FDECEE",
  "info-soft": "#EAF0FF",
  "info-text": "#3451B2",
} as const;

export type ColorToken = keyof typeof colors;
