import type { LucideIcon } from "lucide-react-native";
import { Pressable } from "react-native";

import { Icon } from "./icon";

const sizes = {
  sm: { box: "h-9 w-9", icon: "sm" },
  md: { box: "h-14 w-14", icon: "lg" },
} as const;

const tones = {
  gray: "bg-surface-gray",
  white: "bg-surface",
} as const;

export function IconButton({
  icon,
  accessibilityLabel,
  selected,
  size = "md",
  tone = "gray",
  onPress,
  className = "",
}: {
  icon: LucideIcon;
  /** Required: the button has no visible text. */
  accessibilityLabel: string;
  /** For toggles such as favorite or bookmark; fills the icon. */
  selected?: boolean;
  size?: keyof typeof sizes;
  tone?: keyof typeof tones;
  onPress?: () => void;
  /** Layout only (margin, position). */
  className?: string;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={selected === undefined ? undefined : { selected }}
      hitSlop={size === "sm" ? 8 : 0}
      onPress={onPress}
      className={`items-center justify-center rounded-full active:opacity-70 ${sizes[size].box} ${tones[tone]} ${className}`}
    >
      <Icon
        icon={icon}
        size={sizes[size].icon}
        fill={selected ? "text-primary" : undefined}
      />
    </Pressable>
  );
}
