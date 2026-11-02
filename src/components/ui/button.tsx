import type { ReactNode } from "react";
import { ActivityIndicator, Pressable, View } from "react-native";

import { colors } from "@/theme";

import { Text } from "./text";

const variants = {
  primary: "bg-primary",
  secondary: "bg-surface border border-border",
} as const;

const sizes = {
  md: "h-12 px-5",
  lg: "h-14 px-6",
} as const;

export function Button({
  title,
  variant = "primary",
  size = "lg",
  leading,
  trailing,
  loading = false,
  disabled = false,
  onPress,
  className = "",
}: {
  title: string;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  /** Shown before the title, e.g. a provider logo. */
  leading?: ReactNode;
  /** Pinned to the trailing edge, e.g. an arrow. */
  trailing?: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  /** Layout only (margin, flex, width). */
  className?: string;
}) {
  const inactive = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled: inactive, busy: loading }}
      disabled={inactive}
      onPress={onPress}
      className={`flex-row items-center justify-center gap-3 rounded-full active:opacity-80 ${variants[variant]} ${sizes[size]} ${disabled ? "opacity-40" : ""} ${className}`}
    >
      {loading ? (
        <ActivityIndicator color={colors["text-primary"]} />
      ) : (
        <>
          {leading}
          <Text variant="button">{title}</Text>
          {trailing ? (
            <View className="absolute right-6">{trailing}</View>
          ) : null}
        </>
      )}
    </Pressable>
  );
}
