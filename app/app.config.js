import "dotenv/config";

export default {
  name: "Honeycomb",
  displayName: "Honeycomb",
  expo: {
    name: "Honeycomb",
    slug: "honeycomb",
    version: "1.0.0",
    description: "Nurture your hive...",
    icon: "./assets/images/logo/app-icon.png",
    privacy: "hidden",
    platforms: ["ios"],
    orientation: "portrait",
    assetBundlePatterns: ["**/*"],
    notification: { iosDisplayInForeground: true },
    splash: {
      image: "./assets/images/logo/splash-screen.png",
      backgroundColor: "#FFC72D",
    },
    extra: {
      apiUrl: process.env.API_URL,
      termsOfServiceUrl: process.env.TERMS_OF_SERVICE_URL,
      privacyPolicyUrl: process.env.PRIVACY_POLICY_URL,
    },
  },
};
