import { Redirect, useLocalSearchParams } from "expo-router";

export default function BookScreen() {
  const params = useLocalSearchParams<{ artisanId?: string; category?: string; artisan?: string; metier?: string }>();
  return (
    <Redirect
      href={{
        pathname: "/demande",
        params: {
          artisanId: params.artisanId ?? params.artisan,
          category: params.category ?? params.metier,
        },
      }}
    />
  );
}
