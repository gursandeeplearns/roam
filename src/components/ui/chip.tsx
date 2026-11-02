import type { LucideIcon } from "lucide-react-native";
import { Pressable } from "react-native";

import { Icon } from "./icon";
import { Text } from "./text";

const sizes = {
  md: { box: "h-12 px-6", text: "label", icon: "md" },
  sm: { box: "h-10 px-4", text: "caption", icon: "sm" },
} as const;

const selectedTones = {
  lavender: "bg-lavender border-lavender",
  primary: "bg-primary border-primary",
} as const;

export function Chip({
  label,
  icon,
  selected = false,
  size = "md",
  tone = "lavender",
  onPress,
  className = "",
}: {
  label: string;
  icon?: LucideIcon;
  selected?: boolean;
  size?: keyof typeof sizes;
  /** Fill when selected: lavender for filters, primary for categories. */
  tone?: keyof typeof selectedTones;
  onPress?: () => void;
  /** Layout only (margin, flex). */
  className?: string;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      className={`flex-row items-center gap-2 rounded-full border active:opacity-70 ${sizes[size].box} ${selected ? selectedTones[tone] : "border-border bg-surface"} ${className}`}
    >
      {icon ? <Icon icon={icon} size={sizes[size].icon} /> : null}
      <Text variant={sizes[size].text}>{label}</Text>
    </Pressable>
  );
}
