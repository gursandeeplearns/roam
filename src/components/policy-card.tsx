import { ChevronRight, type LucideIcon } from "lucide-react-native";
import { Pressable, View } from "react-native";

import { Icon, Text } from "@/components/ui";

export function PolicyCard({
  icon,
  title,
  description,
  onPress,
  className = "",
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  onPress?: () => void;
  /** Layout only (margin, width). */
  className?: string;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${title}. ${description}`}
      onPress={onPress}
      className={`flex-row items-center gap-4 rounded-xl bg-lavender-soft p-4 active:opacity-80 ${className}`}
    >
      <View className="h-12 w-12 items-center justify-center rounded-md bg-lavender/40">
        <Icon icon={icon} size="lg" color="lavender-strong" />
      </View>
      <View className="flex-1 gap-0.5">
        <Text variant="label">{title}</Text>
        <Text variant="small" tone="secondary">
          {description}
        </Text>
      </View>
      <Icon icon={ChevronRight} size="lg" color="lavender-strong" />
    </Pressable>
  );
}
