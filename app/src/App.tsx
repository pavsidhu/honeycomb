import { QueryClientProvider } from "react-query";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StatusBar, useColorScheme } from "react-native";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { ThemeProvider } from "styled-components/native";
import { baseTheme, lightTheme, darkTheme } from "./theme";
import { useSetupQueryClient } from "./queryClient";
import Main from "./screens/Main";
import "react-native-url-polyfill/auto";

export default function App() {
  let [haveFontsLoaded] = useFonts({
    [baseTheme.fonts.regular]: require("../assets/fonts/TextaAlt-Regular.ttf"),
    [baseTheme.fonts.medium]: require("../assets/fonts/TextaAlt-Medium.ttf"),
    [baseTheme.fonts.bold]: require("../assets/fonts/TextaAlt-Bold.ttf"),
    [baseTheme.fonts.heavy]: require("../assets/fonts/TextaAlt-Heavy.ttf"),
  });

  const queryClient = useSetupQueryClient();
  const colorScheme = useColorScheme();

  if (!haveFontsLoaded) return <AppLoading />;

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={colorScheme === "dark" ? darkTheme : lightTheme}>
        <NavigationContainer>
          <StatusBar
            barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
          />

          <Main />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
