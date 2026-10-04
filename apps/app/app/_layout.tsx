import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AccountProvider } from "../contexts/account";
import { colors } from "../constants/theme";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AccountProvider>
        <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.primaryDark,
          },
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontWeight: "800",
          },
          headerShadowVisible: true,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="demandes" options={{ title: "Mes demandes", headerShown: false }} />
        <Stack.Screen name="profil" options={{ title: "Mon compte", headerShown: false }} />
        <Stack.Screen name="pro" options={{ title: "Espace pro", headerShown: false }} />
        <Stack.Screen
          name="artisan/[slug]"
          options={{
            title: "Fiche artisan",
          }}
        />
        <Stack.Screen
          name="demande"
          options={{
            title: "Votre besoin",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="reclamations"
          options={{
            title: "Mes réclamations",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="artisans"
          options={{
            title: "Trouver un artisan",
            headerShown: false,
          }}
        />
        </Stack>

        <StatusBar style="dark" />
      </AccountProvider>
    </SafeAreaProvider>
  );
}
