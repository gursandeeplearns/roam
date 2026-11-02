import { Eye, EyeOff, type LucideIcon } from "lucide-react-native";
import { useState, type ReactNode } from "react";
import { Pressable, TextInput, View, type TextInputProps } from "react-native";

import { colors } from "@/theme";

import { Icon } from "./icon";

const variants = {
  filled: "bg-surface-gray border-transparent",
  outlined: "bg-surface border-border",
} as const;

export function TextField({
  icon,
  trailing,
  secure = false,
  variant = "filled",
  className = "",
  onFocus,
  onBlur,
  ...props
}: Omit<TextInputProps, "secureTextEntry" | "className"> & {
  icon?: LucideIcon;
  /** Trailing control, e.g. a filter button. Ignored when `secure` is set. */
  trailing?: ReactNode;
  /** Password field with a show/hide toggle. */
  secure?: boolean;
  variant?: keyof typeof variants;
  /** Layout only (margin, flex, width). */
  className?: string;
}) {
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(true);

  return (
    <View
      className={`h-14 flex-row items-center gap-3 rounded-lg border-[1.5px] px-4 ${focused ? "border-lavender bg-lavender-soft" : variants[variant]} ${className}`}
    >
      {icon ? <Icon icon={icon} size="lg" /> : null}
      <TextInput
        className="h-full flex-1 text-label text-text-primary"
        placeholderTextColor={colors["text-placeholder"]}
        selectionColor={colors["lavender-strong"]}
        cursorColor={colors["lavender-strong"]}
        secureTextEntry={secure && hidden}
        onFocus={(e) => {
          setFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          onBlur?.(e);
        }}
        {...props}
      />
      {secure ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={hidden ? "Show password" : "Hide password"}
          hitSlop={8}
          onPress={() => setHidden((h) => !h)}
          className="active:opacity-60"
        >
          <Icon icon={hidden ? EyeOff : Eye} size="lg" />
        </Pressable>
      ) : (
        trailing
      )}
    </View>
  );
}
