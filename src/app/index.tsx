import { useRouter } from "expo-router";
import { View } from "react-native";

import { Button, Text } from "@/components/ui";

export default function Index() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center gap-6 bg-surface-gray px-5">
      <Text variant="heading">Welcome to Roam!</Text>
      {__DEV__ ? (
        <Button
          title="Design system"
          variant="secondary"
          onPress={() => router.push("/design-system")}
          className="self-stretch"
        />
      ) : null}
    </View>
  );
}
