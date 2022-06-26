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
    notification: {
      iosDisplayInForeground: true,
    },
    extra: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
      termsOfServiceUrl: process.env.TERMS_OF_SERVICE_URL,
      privacyPolicyUrl: process.env.PRIVACY_POLICY_URL,
    },
  },
};
