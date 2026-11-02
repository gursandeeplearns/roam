import type { LucideIcon } from "lucide-react-native";
import { View } from "react-native";

import { Icon } from "./icon";
import { Text } from "./text";

const tones = {
  favorite: { box: "bg-primary-soft", text: "primary" },
  success: { box: "bg-success-soft", text: "success" },
  promo: { box: "bg-danger-soft", text: "danger" },
  info: { box: "bg-info-soft", text: "info" },
} as const;

export function Badge({
  label,
  tone = "info",
  icon,
  className = "",
}: {
  label: string;
  tone?: keyof typeof tones;
  /** Leading icon, filled with the primary color (e.g. a star). */
  icon?: LucideIcon;
  /** Layout only (margin, alignment). */
  className?: string;
}) {
  return (
    <View
      className={`h-10 flex-row items-center gap-2 self-start rounded-full px-5 ${tones[tone].box} ${className}`}
    >
      {icon ? <Icon icon={icon} size="md" fill="primary" /> : null}
      <Text variant="caption" tone={tones[tone].text}>
        {label}
      </Text>
    </View>
  );
}
