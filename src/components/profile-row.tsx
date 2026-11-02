import { ChevronRight, type LucideIcon } from "lucide-react-native";
import { Children, type ReactNode } from "react";
import { Pressable, View } from "react-native";

import { Icon, Text } from "@/components/ui";

export function ProfileRow({
  icon,
  label,
  onPress,
}: {
  icon: LucideIcon;
  label: string;
  onPress?: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      className="h-14 flex-row items-center gap-4 px-4 active:bg-surface-gray"
    >
      <Icon icon={icon} size="lg" />
      <Text variant="label" className="flex-1">
        {label}
      </Text>
      <Icon icon={ChevronRight} size="md" />
    </Pressable>
  );
}

/** Groups rows on one surface with hairline dividers, not a card per row. */
export function ProfileRowGroup({
  children,
  className = "",
}: {
  children: ReactNode;
  /** Layout only (margin, width). */
  className?: string;
}) {
  return (
    <View className={`overflow-hidden rounded-xl bg-surface ${className}`}>
      {Children.toArray(children).map((child, index) => (
        <View key={index} className={index > 0 ? "border-t border-border" : ""}>
          {child}
        </View>
      ))}
    </View>
  );
}
