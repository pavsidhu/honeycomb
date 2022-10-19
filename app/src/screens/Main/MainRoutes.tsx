enum MainRoutes {
  HomeTab = "Home tab",
  HomeFeed = "Home feed",

  Plan = "Plan",
  PlanAttendees = "Plan attendees",

  HivesTab = "Hives tab",
  HivesFeed = "Hives feed",
  Hive = "Hive",

  CreatePlan = "Create plan",
  CreateHive = "Create hive",

  Settings = "Settings",
}

export type MainRoutesParamList = {
  [MainRoutes.HomeTab]: undefined;
  [MainRoutes.HivesTab]: undefined;

  [MainRoutes.HomeFeed]: undefined;

  [MainRoutes.Plan]: { planId: string };
  [MainRoutes.PlanAttendees]: { planId: string };

  [MainRoutes.HivesFeed]: undefined;

  [MainRoutes.Hive]: { hiveId: string };

  [MainRoutes.Settings]: undefined;

  [MainRoutes.CreatePlan]: undefined;
  [MainRoutes.CreateHive]: undefined;
};

export default MainRoutes;
