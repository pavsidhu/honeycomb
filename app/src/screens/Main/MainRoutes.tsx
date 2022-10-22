enum MainRoutes {
  HomeTab = "HomeTab",
  HomeFeed = "HomeFeed",

  DiscoverTab = "DiscoverTab",
  DiscoverFeed = "DiscoverFeed",

  HivesTab = "HivesTab",
  HivesFeed = "HivesFeed",

  CreatePlan = "CreatePlan",
  Plan = "Plan",
  PlanAttendees = "PlanAttendees",

  CreateHive = "CreateHive",
  Hive = "Hive",
  HiveMembers = "HiveMembers",

  Settings = "Settings",
  AccountSettings = "AccountSettings",
}

export type MainRoutesParamList = {
  [MainRoutes.HomeTab]: undefined;
  [MainRoutes.HomeFeed]: undefined;

  [MainRoutes.DiscoverTab]: undefined;
  [MainRoutes.DiscoverFeed]: undefined;

  [MainRoutes.HivesTab]: undefined;
  [MainRoutes.HivesFeed]: undefined;

  [MainRoutes.CreatePlan]: undefined;
  [MainRoutes.Plan]: { planId: string };
  [MainRoutes.PlanAttendees]: { planId: string };

  [MainRoutes.CreateHive]: undefined;
  [MainRoutes.Hive]: { hiveId: string };
  [MainRoutes.HiveMembers]: { hiveId: string };

  [MainRoutes.Settings]: undefined;
  [MainRoutes.AccountSettings]: undefined;
};

export default MainRoutes;
