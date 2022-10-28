import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useLayoutEffect } from "react";
import { StatusBar } from "react-native";
import { ThemeProvider } from "styled-components/native";
import "react-native-url-polyfill/auto";

import Auth from "./screens/Auth";
import { baseTheme, lightTheme } from "./theme";
import trpc, { trpcClient } from "./trpc";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function App() {
  const [haveFontsLoaded] = useFonts({
    [baseTheme.fonts.regular]: require("../assets/fonts/TextaAlt-Regular.ttf"),
    [baseTheme.fonts.medium]: require("../assets/fonts/TextaAlt-Medium.ttf"),
    [baseTheme.fonts.bold]: require("../assets/fonts/TextaAlt-Bold.ttf"),
    [baseTheme.fonts.heavy]: require("../assets/fonts/TextaAlt-Heavy.ttf"),
  });

  useLayoutEffect(() => {
    if (haveFontsLoaded) SplashScreen.hideAsync();
  }, [haveFontsLoaded]);

  if (!haveFontsLoaded) return null;

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={lightTheme}>
          <NavigationContainer>
            <StatusBar barStyle="dark-content" animated />
            <Screen />
          </NavigationContainer>
        </ThemeProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

function Screen() {
  // return <Main />;
  return <Auth />;

  // const { data: currentUser, isLoading } = useCurrentUser();
  // if (!isLoading) return null;
  // return currentUser ? <Main /> : <Auth />;
}
