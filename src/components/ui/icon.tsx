import type { LucideIcon } from "lucide-react-native";

import { colors, type ColorToken } from "@/theme";

const sizes = { sm: 16, md: 20, lg: 24 } as const;

export type IconSize = keyof typeof sizes;

export function Icon({
  icon: Glyph,
  size = "md",
  color = "text-primary",
  fill,
}: {
  icon: LucideIcon;
  size?: IconSize;
  color?: ColorToken;
  /** Fills the shape, e.g. a selected heart or a rating star. */
  fill?: ColorToken;
}) {
  return (
    <Glyph
      size={sizes[size]}
      color={colors[color]}
      fill={fill ? colors[fill] : "none"}
      strokeWidth={2}
      accessible={false}
      importantForAccessibility="no"
    />
  );
}
