import type { LucideIcon } from "lucide-react-native";
import { Pressable, View } from "react-native";

import { Icon } from "./icon";
import { Text } from "./text";

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  className = "",
}: {
  options: { value: T; label: string; icon?: LucideIcon }[];
  value: T;
  onChange: (value: T) => void;
  /** Layout only (margin, width). */
  className?: string;
}) {
  return (
    <View
      accessibilityRole="tablist"
      className={`flex-row rounded-full bg-surface-gray p-1 ${className}`}
    >
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <Pressable
            key={option.value}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            onPress={() => onChange(option.value)}
            className={`h-12 flex-1 flex-row items-center justify-center gap-2 rounded-full active:opacity-80 ${selected ? "bg-text-primary" : ""}`}
          >
            {option.icon ? (
              <Icon
                icon={option.icon}
                color={selected ? "surface" : "text-primary"}
              />
            ) : null}
            <Text variant="label" tone={selected ? "inverse" : "primary"}>
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
