import { useRouter } from "expo-router";
import { useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { breakpoints, colors } from "../constants/theme";
import { APP_TABS } from "../data/navigation";
import { BottomTabBar, TopAppNav } from "./ui";

export function AppNavigation({ activeRoute, showBottomTabs = true }: { activeRoute: string; showBottomTabs?: boolean }) {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const activeIndex = APP_TABS.findIndex((tab) => tab.route === activeRoute);
  const selectedIndex = activeIndex === -1 && activeRoute === "/pro" ? APP_TABS.findIndex((tab) => tab.route === "/demandes") : activeIndex;

  const onChange = (index: number) => {
    const route = APP_TABS[index]?.route;
    if (route) router.push(route as never);
  };

  if (width >= breakpoints.tablet || selectedIndex === -1) {
    return <TopAppNav activeIndex={selectedIndex} onChange={onChange} />;
  }
  if (!showBottomTabs) return null;

  return (
    <BottomTabBar
      items={APP_TABS}
      activeIndex={selectedIndex}
      onChange={onChange}
      style={{ position: "absolute", left: 0, right: 0, bottom: 0, zIndex: 10, paddingBottom: insets.bottom, backgroundColor: colors.surface }}
    />
  );
}
