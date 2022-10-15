import { NavigationContainer } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import { StatusBar } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { ThemeProvider } from "styled-components/native";
import { baseTheme, lightTheme } from "./theme";
import Auth from "./screens/Auth";
import Main from "./screens/Main";
import "react-native-url-polyfill/auto";

SplashScreen.preventAutoHideAsync();

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
    <ThemeProvider theme={lightTheme}>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" />
        <Screen />
      </NavigationContainer>
    </ThemeProvider>
  );
}

function Screen() {
  return <Main />;
  // return <Auth />;

  // const { data: currentUser, isLoading } = useCurrentUser();
  // if (!isLoading) return null;
  // return currentUser ? <Main /> : <Auth />;
}
