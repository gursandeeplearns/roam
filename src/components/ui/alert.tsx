import { CircleAlert, CircleCheck, X } from "lucide-react-native";
import { Pressable, View } from "react-native";

import { Icon } from "./icon";
import { Text } from "./text";

const tones = {
  success: {
    box: "bg-success-soft",
    icon: CircleCheck,
    iconFill: "success",
    text: "success",
    color: "success-text",
  },
  error: {
    box: "bg-danger-soft",
    icon: CircleAlert,
    iconFill: "danger",
    text: "danger",
    color: "danger",
  },
} as const;

export function Alert({
  tone,
  message,
  onDismiss,
  className = "",
}: {
  tone: keyof typeof tones;
  message: string;
  onDismiss?: () => void;
  /** Layout only (margin, flex). */
  className?: string;
}) {
  const t = tones[tone];

  return (
    <View
      accessibilityRole="alert"
      className={`min-h-14 flex-row items-center gap-3 rounded-lg px-4 py-3 ${t.box} ${className}`}
    >
      <Icon icon={t.icon} size="lg" color="surface" fill={t.iconFill} />
      <Text variant="caption" tone={t.text} className="flex-1">
        {message}
      </Text>
      {onDismiss ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Dismiss"
          hitSlop={8}
          onPress={onDismiss}
          className="active:opacity-60"
        >
          <Icon icon={X} size="md" color={t.color} />
        </Pressable>
      ) : null}
    </View>
  );
}
