export type AuthRoutesParamList = {
  [AuthRoutes.Welcome]: undefined;
  [AuthRoutes.Verify]: {phoneNumber: string};
  [AuthRoutes.Onboarding]: undefined;
};

enum AuthRoutes {
  Welcome = 'Welcome',
  Verify = 'Verify',
  Onboarding = 'Onboarding',
}

export default AuthRoutes;
