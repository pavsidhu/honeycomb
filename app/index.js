import "react-native-gesture-handler";
import { registerRootComponent } from "expo";

// Polyfill for crypto.getRandomValues() (used for UUID generation)
import "react-native-get-random-values";

import App from "./src/App";

registerRootComponent(App);
