import { Text } from "react-native";

// PLACEHOLDER: replace with the "roam" logo asset from assets/ once supplied.
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Text
      accessibilityRole="header"
      className={`text-wordmark text-text-primary ${className}`}
    >
      roam
    </Text>
  );
}
