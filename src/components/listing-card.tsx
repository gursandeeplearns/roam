import { Image as ExpoImage } from "expo-image";
import { Heart, MapPin, Star, type LucideIcon } from "lucide-react-native";
import { styled } from "nativewind";
import { Pressable, View } from "react-native";

import { Icon, IconButton, Text } from "@/components/ui";

const Image = styled(ExpoImage, { className: "style" });

export function ListingCard({
  title,
  location,
  rating,
  reviewCount,
  amenities,
  pricePerNight,
  imageUri,
  favorite,
  onToggleFavorite,
  onPress,
  className = "",
}: {
  title: string;
  location: string;
  rating: number;
  reviewCount: number;
  amenities: { icon: LucideIcon; label: string }[];
  pricePerNight: number;
  imageUri: string;
  favorite: boolean;
  onToggleFavorite: () => void;
  onPress?: () => void;
  /** Layout only (margin, width). */
  className?: string;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${title}, ${location}, rated ${rating}, $${pricePerNight} a night`}
      onPress={onPress}
      className={`flex-row gap-4 rounded-xl bg-surface p-3 shadow-card active:opacity-90 ${className}`}
    >
      <View className="h-40 w-40 overflow-hidden rounded-lg">
        <Image
          source={{ uri: imageUri }}
          contentFit="cover"
          transition={200}
          accessible={false}
          className="h-full w-full"
        />
        <IconButton
          icon={Heart}
          size="sm"
          tone="white"
          selected={favorite}
          accessibilityLabel={favorite ? "Remove from saved" : "Save stay"}
          onPress={onToggleFavorite}
          className="absolute right-2 top-2"
        />
      </View>

      <View className="flex-1 justify-center gap-2">
        <Text variant="title" numberOfLines={2}>
          {title}
        </Text>
        <View className="flex-row items-center gap-1">
          <Icon icon={MapPin} size="sm" color="text-placeholder" />
          <Text variant="caption" tone="secondary" numberOfLines={1}>
            {location}
          </Text>
        </View>
        <View className="flex-row items-center gap-1">
          <Icon icon={Star} size="sm" color="primary" fill="primary" />
          <Text variant="caption">{rating.toFixed(1)}</Text>
          <Text variant="caption" tone="placeholder">
            ({reviewCount})
          </Text>
        </View>
        <View className="flex-row flex-wrap gap-2">
          {amenities.map((amenity) => (
            <View
              key={amenity.label}
              className="h-7 flex-row items-center gap-1 rounded-sm bg-surface-gray px-2"
            >
              <Icon icon={amenity.icon} size="sm" />
              <Text variant="small">{amenity.label}</Text>
            </View>
          ))}
        </View>
        <View className="flex-row items-baseline gap-1">
          <Text variant="title">${pricePerNight}</Text>
          <Text variant="body" tone="placeholder">
            / night
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
