import { Search, SlidersHorizontal } from "lucide-react-native";
import type { ComponentProps } from "react";
import { Pressable } from "react-native";

import { Icon } from "./icon";
import { TextField } from "./text-field";

export function SearchField({
  onFilterPress,
  ...props
}: Omit<ComponentProps<typeof TextField>, "icon" | "trailing" | "secure" | "variant"> & {
  onFilterPress?: () => void;
}) {
  return (
    <TextField
      variant="outlined"
      icon={Search}
      returnKeyType="search"
      accessibilityLabel="Search stays"
      trailing={
        onFilterPress ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Filters"
            hitSlop={8}
            onPress={onFilterPress}
            className="active:opacity-60"
          >
            <Icon icon={SlidersHorizontal} size="lg" />
          </Pressable>
        ) : null
      }
      {...props}
    />
  );
}
