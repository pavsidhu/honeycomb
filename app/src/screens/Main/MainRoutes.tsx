enum MainRoutes {
  HomeTab = "HomeTab",
  Plan = "Plan",

  HivesTab = "HivesTab",
  Hive = "Hive",

  CreatePlan = "Create Plan",
  CreateHive = "Create Hive",

  Settings = "Settings",
}

export type MainRoutesParamList = {
  [MainRoutes.HomeTab]: undefined;
  [MainRoutes.Plan]: { planId: string };

  [MainRoutes.HivesTab]: undefined;
  [MainRoutes.Hive]: { hiveId: string };

  [MainRoutes.Settings]: undefined;

  [MainRoutes.CreatePlan]: undefined;
  [MainRoutes.CreateHive]: undefined;
};

export default MainRoutes;
