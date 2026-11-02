import {
  GlassView as ExpoGlassView,
  isLiquidGlassAvailable,
  type GlassViewProps,
} from "expo-glass-effect";
import type { LucideIcon } from "lucide-react-native";
import { styled } from "nativewind";
import type { ComponentType } from "react";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Icon, Text } from "@/components/ui";

// Default mapping (className -> style). An explicit mapping makes GlassView's prop union too complex for tsc.
const GlassView = styled(ExpoGlassView as ComponentType<GlassViewProps>);

const BAR = "h-18 flex-row items-center rounded-full px-1";

/**
 * Presentational tab bar. Not wired to navigation yet: pass it to
 * Expo Router `Tabs` as `tabBar` once tab routes exist.
 */
export function GlassTabBar<K extends string>({
  items,
  activeKey,
  onSelect,
  respectSafeArea = true,
  className = "",
}: {
  items: { key: K; label: string; icon: LucideIcon }[];
  activeKey: K;
  onSelect: (key: K) => void;
  /** Pads for the home indicator. Off when shown inline, e.g. on /design-system. */
  respectSafeArea?: boolean;
  /** Layout only (margin, position). */
  className?: string;
}) {
  const insets = useSafeAreaInsets();

  const tabs = items.map((item) => {
    const selected = item.key === activeKey;
    return (
      <Pressable
        key={item.key}
        accessibilityRole="tab"
        accessibilityLabel={item.label}
        accessibilityState={{ selected }}
        onPress={() => onSelect(item.key)}
        className="flex-1 items-center active:opacity-70"
      >
        <View
          className={`h-16 w-16 items-center justify-center gap-0.5 rounded-full ${selected ? "bg-primary" : ""}`}
        >
          <Icon icon={item.icon} size="lg" />
          <Text variant="small">{item.label}</Text>
        </View>
      </Pressable>
    );
  });

  return (
    <View
      accessibilityRole="tablist"
      className={`px-5 ${className}`}
      style={respectSafeArea ? { paddingBottom: insets.bottom } : undefined}
    >
      {isLiquidGlassAvailable() ? (
        <GlassView glassEffectStyle="regular" className={BAR}>
          {tabs}
        </GlassView>
      ) : (
        <View className={`${BAR} border border-surface bg-glass shadow-overlay`}>
          {tabs}
        </View>
      )}
    </View>
  );
}
