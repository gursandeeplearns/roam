import { Redirect, Stack } from "expo-router";
import {
  ArrowRight,
  Bath,
  Bookmark,
  Building2,
  Calendar,
  CreditCard,
  FileText,
  Heart,
  House,
  List,
  Lock,
  Luggage,
  Map,
  MapPin,
  MessageSquareMore,
  PawPrint,
  Search,
  Settings,
  Share,
  SlidersHorizontal,
  Star,
  TreePalm,
  TreePine,
  User,
  Waves,
} from "lucide-react-native";
import { useState, type ReactNode } from "react";
import { ScrollView, Switch, View } from "react-native";

import { GlassTabBar } from "@/components/glass-tab-bar";
import { ListingCard } from "@/components/listing-card";
import { PolicyCard } from "@/components/policy-card";
import { ProfileRow, ProfileRowGroup } from "@/components/profile-row";
import {
  Alert,
  Badge,
  Button,
  Chip,
  Icon,
  IconButton,
  SearchField,
  SegmentedControl,
  Stepper,
  Text,
  TextField,
  Wordmark,
} from "@/components/ui";
import { colors } from "@/theme";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View className="gap-4 rounded-2xl bg-surface p-5">
      <Text variant="title">{title}</Text>
      {children}
    </View>
  );
}

// PLACEHOLDER: replace with the official Google "G" asset from assets/ once supplied.
function GoogleMark() {
  return (
    <View className="h-6 w-6 items-center justify-center rounded-full border border-border">
      <Text variant="caption">G</Text>
    </View>
  );
}

const FILTERS = ["Cabins", "Under $300", "Pet Friendly", "Quiet"];
const CATEGORIES = [
  { label: "All Stays", icon: House },
  { label: "Cabins", icon: TreePine },
  { label: "Beach", icon: Waves },
  { label: "City", icon: Building2 },
  { label: "Villas", icon: TreePalm },
];
const ICONS = [House, Search, Heart, Calendar, User, Settings, MapPin, SlidersHorizontal];

export default function DesignSystemScreen() {
  const [name, setName] = useState("");
  const [filters, setFilters] = useState<string[]>(["Cabins"]);
  const [category, setCategory] = useState("All Stays");
  const [favorite, setFavorite] = useState(false);
  const [saved, setSaved] = useState(false);
  const [tab, setTab] = useState<"home" | "search" | "trips" | "profile">("home");
  const [view, setView] = useState<"list" | "map">("list");
  const [instantBook, setInstantBook] = useState(true);
  const [guests, setGuests] = useState(1);
  const [alerts, setAlerts] = useState({ success: true, error: true });

  if (!__DEV__) return <Redirect href="/" />;

  return (
    <ScrollView
      className="flex-1 bg-surface-gray"
      contentContainerClassName="gap-4 px-5 py-6"
      keyboardShouldPersistTaps="handled"
    >
      <Stack.Screen options={{ title: "Design system" }} />

      <Section title="01. Brand">
        <Wordmark />
        <Text variant="heading" tone="placeholder">
          Find unforgettable stays for every kind of trip.
        </Text>
      </Section>

      <Section title="02. Color palette">
        <View className="flex-row flex-wrap gap-3">
          {Object.entries(colors).map(([token, value]) => (
            <View key={token} className="w-24 gap-1">
              <View
                className="h-14 rounded-md border border-border"
                style={{ backgroundColor: value }}
              />
              <Text variant="small">{token}</Text>
              <Text variant="small" tone="secondary">
                {value}
              </Text>
            </View>
          ))}
        </View>
      </Section>

      <Section title="03. Typography">
        <Text variant="display">Find your next stay</Text>
        <Text variant="heading">Modern Cabin with Hot Tub</Text>
        <Text variant="title">Title · Modern Cabin</Text>
        <Text variant="body" tone="secondary">
          From mountain cabins to oceanfront villas, roam helps you find
          unforgettable stays for every kind of trip.
        </Text>
        <Text variant="label">Label · Personal info</Text>
        <Text variant="caption">Caption · Lake Arrowhead, CA</Text>
        <Text variant="small" tone="secondary">
          Small · Full refund up to 7 days before check-in.
        </Text>
        <Text variant="button">Button · Book this stay</Text>
      </Section>

      <Section title="04. Buttons">
        <Button
          title="Book this stay"
          trailing={<Icon icon={ArrowRight} size="lg" />}
        />
        <Button
          title="Continue with Google"
          variant="secondary"
          leading={<GoogleMark />}
        />
        <View className="flex-row gap-3">
          <Button title="Loading" size="md" loading className="flex-1" />
          <Button title="Disabled" size="md" disabled className="flex-1" />
        </View>
        <View className="flex-row gap-4">
          <IconButton
            icon={Heart}
            accessibilityLabel={favorite ? "Remove from saved" : "Save stay"}
            selected={favorite}
            onPress={() => setFavorite((f) => !f)}
          />
          <IconButton icon={Share} accessibilityLabel="Share" />
          <IconButton icon={Search} accessibilityLabel="Search" />
          <IconButton
            icon={Bookmark}
            accessibilityLabel={saved ? "Remove bookmark" : "Bookmark"}
            selected={saved}
            onPress={() => setSaved((s) => !s)}
          />
        </View>
      </Section>

      <Section title="05. Input fields">
        <SearchField placeholder="Cabins in California" onFilterPress={() => {}} />
        <TextField
          icon={User}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
          accessibilityLabel="Name"
        />
        <TextField
          icon={Lock}
          placeholder="Password"
          secure
          defaultValue="roam-secret"
          accessibilityLabel="Password"
        />
      </Section>

      <Section title="06. Filter chips">
        <View className="flex-row flex-wrap gap-3">
          {FILTERS.map((label) => (
            <Chip
              key={label}
              label={label}
              selected={filters.includes(label)}
              onPress={() =>
                setFilters((current) =>
                  current.includes(label)
                    ? current.filter((f) => f !== label)
                    : [...current, label],
                )
              }
            />
          ))}
        </View>
        <View className="flex-row flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <Chip
              key={c.label}
              label={c.label}
              icon={c.icon}
              size="sm"
              tone="primary"
              selected={category === c.label}
              onPress={() => setCategory(c.label)}
            />
          ))}
        </View>
      </Section>

      <Section title="07. Listing card">
        <ListingCard
          title="Modern Cabin with Hot Tub"
          location="Lake Arrowhead, CA"
          rating={4.9}
          reviewCount={342}
          amenities={[
            { icon: Bath, label: "Hot Tub" },
            { icon: PawPrint, label: "Pet Friendly" },
          ]}
          pricePerNight={280}
          imageUri="https://picsum.photos/seed/roam-cabin/480/480"
          favorite={favorite}
          onToggleFavorite={() => setFavorite((f) => !f)}
        />
      </Section>

      <Section title="08. Policy card">
        <PolicyCard
          icon={MessageSquareMore}
          title="Ask about policies"
          description="Cancellation, house rules, pets, check-in and more."
        />
        <PolicyCard
          icon={FileText}
          title="Free cancellation"
          description="Full refund up to 7 days before check-in."
        />
      </Section>

      <Section title="09. Profile row">
        <ProfileRowGroup className="border border-border">
          <ProfileRow icon={User} label="Personal info" />
          <ProfileRow icon={CreditCard} label="Payment methods" />
          <ProfileRow icon={Luggage} label="Trips" />
        </ProfileRowGroup>
      </Section>

      <Section title="10. Bottom navigation">
        <GlassTabBar
          respectSafeArea={false}
          className="px-0"
          activeKey={tab}
          onSelect={setTab}
          items={[
            { key: "home", label: "Home", icon: House },
            { key: "search", label: "Search", icon: Search },
            { key: "trips", label: "Trips", icon: Calendar },
            { key: "profile", label: "Profile", icon: User },
          ]}
        />
      </Section>

      <Section title="11. Iconography">
        <View className="flex-row flex-wrap gap-3">
          {ICONS.map((glyph, i) => (
            <View
              key={i}
              className="h-14 w-14 items-center justify-center rounded-full border border-border"
            >
              <Icon icon={glyph} size="lg" />
            </View>
          ))}
        </View>
      </Section>

      <Section title="12. Segmented control">
        <SegmentedControl
          value={view}
          onChange={setView}
          options={[
            { value: "list", label: "List", icon: List },
            { value: "map", label: "Map", icon: Map },
          ]}
        />
      </Section>

      <Section title="13. Toggles / Steppers">
        <View className="flex-row items-center gap-6">
          <Switch
            accessibilityLabel="Instant book"
            value={instantBook}
            onValueChange={setInstantBook}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={colors.surface}
            ios_backgroundColor={colors.border}
          />
          <Stepper label="Guests" value={guests} onChange={setGuests} min={1} max={16} />
        </View>
      </Section>

      <Section title="14. Status / Alerts">
        {alerts.success ? (
          <Alert
            tone="success"
            message="Account created successfully"
            onDismiss={() => setAlerts((a) => ({ ...a, success: false }))}
          />
        ) : null}
        {alerts.error ? (
          <Alert
            tone="error"
            message="Something went wrong. Please try again."
            onDismiss={() => setAlerts((a) => ({ ...a, error: false }))}
          />
        ) : null}
        {!alerts.success || !alerts.error ? (
          <Button
            title="Reset alerts"
            variant="secondary"
            size="md"
            onPress={() => setAlerts({ success: true, error: true })}
          />
        ) : null}
      </Section>

      <Section title="15. Tags / Badges">
        <View className="flex-row flex-wrap gap-3">
          <Badge label="Guest favorite" tone="favorite" icon={Star} />
          <Badge label="New" tone="success" />
          <Badge label="20% off" tone="promo" />
          <Badge label="Superhost" tone="info" />
        </View>
      </Section>
    </ScrollView>
  );
}
