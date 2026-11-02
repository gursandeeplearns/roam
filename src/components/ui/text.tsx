import { Text as RNText, type TextProps as RNTextProps } from "react-native";

const variants = {
  display: "text-display",
  heading: "text-heading",
  title: "text-title",
  body: "text-body",
  label: "text-label",
  caption: "text-caption",
  small: "text-small",
  button: "text-button",
} as const;

const tones = {
  primary: "text-text-primary",
  secondary: "text-text-secondary",
  placeholder: "text-text-placeholder",
  inverse: "text-surface",
  success: "text-success-text",
  danger: "text-danger",
  info: "text-info-text",
} as const;

export type TextVariant = keyof typeof variants;
export type TextTone = keyof typeof tones;

export function Text({
  variant = "body",
  tone = "primary",
  className = "",
  ...props
}: RNTextProps & {
  variant?: TextVariant;
  tone?: TextTone;
  /** Layout only (margin, flex, alignment). Add a variant or tone for a new look. */
  className?: string;
}) {
  return (
    <RNText
      className={`${variants[variant]} ${tones[tone]} ${className}`}
      {...props}
    />
  );
}
