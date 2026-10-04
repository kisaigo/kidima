import { Redirect, useLocalSearchParams } from "expo-router";

export default function BookScreen() {
  const params = useLocalSearchParams<{ artisanId?: string; category?: string }>();
  return <Redirect href={{ pathname: "/demande", params }} />;
}
