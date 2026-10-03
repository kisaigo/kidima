import { Stack } from "expo-router";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { colors } from "../constants/theme";

export default function RootLayout() {
  useEffect(() => {
    StatusBar.setHidden(false);
  }, []);

  return (
    <>
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
        <Stack.Screen
          name="menu"
          options={{
            headerShown: false,
          }}
        />
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
          }}
        />
        <Stack.Screen
          name="book"
          options={{
            title: "Devis",
          }}
        />
        <Stack.Screen
          name="reclamations"
          options={{
            title: "Signalements",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="artisans"
          options={{
            title: "Gestion",
          }}
        />
        <Stack.Screen
          name="dashboard"
          options={{
            headerShown: false,
          }}
        />
      </Stack>

      <StatusBar style="light" />
    </>
  );
}
