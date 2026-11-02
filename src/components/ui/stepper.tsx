import { Minus, Plus, type LucideIcon } from "lucide-react-native";
import { Pressable, View } from "react-native";

import { Icon } from "./icon";
import { Text } from "./text";

function StepButton({
  icon,
  disabled,
  onPress,
}: {
  icon: LucideIcon;
  disabled: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      hitSlop={4}
      className={`h-12 w-12 items-center justify-center rounded-full active:bg-surface-gray ${disabled ? "opacity-30" : ""}`}
    >
      <Icon icon={icon} size="lg" />
    </Pressable>
  );
}

export function Stepper({
  value,
  onChange,
  label,
  min = 0,
  max = 99,
  className = "",
}: {
  value: number;
  onChange: (value: number) => void;
  /** What is being counted, e.g. "Guests". Read by screen readers. */
  label: string;
  min?: number;
  max?: number;
  /** Layout only (margin, alignment). */
  className?: string;
}) {
  const decrement = () => value > min && onChange(value - 1);
  const increment = () => value < max && onChange(value + 1);

  return (
    <View
      accessible
      accessibilityRole="adjustable"
      accessibilityLabel={label}
      accessibilityValue={{ min, max, now: value }}
      accessibilityActions={[{ name: "increment" }, { name: "decrement" }]}
      onAccessibilityAction={(e) =>
        e.nativeEvent.actionName === "increment" ? increment() : decrement()
      }
      className={`h-14 flex-row items-center gap-2 self-start rounded-full border border-border bg-surface px-1 ${className}`}
    >
      <StepButton icon={Minus} disabled={value <= min} onPress={decrement} />
      <Text variant="title" className="min-w-8 text-center">
        {value}
      </Text>
      <StepButton icon={Plus} disabled={value >= max} onPress={increment} />
    </View>
  );
}
