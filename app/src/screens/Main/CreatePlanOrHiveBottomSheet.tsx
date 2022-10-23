import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { forwardRef } from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import styled, { useTheme } from "styled-components/native";

import CreatePlanIcon from "../../../assets/images/icons/calendar.svg";
import Stack from "../../components/Stack";
import { LightThemeProvider } from "../../theme";

export interface CreatePlanOrHiveBottomSheetProps {
  onCreatePlanPress: () => void;
  onCreateHivePress: () => void;
}

const CreatePlanOrHiveBottomSheet = forwardRef<
  BottomSheet,
  CreatePlanOrHiveBottomSheetProps
>((props, ref) => {
  const { onCreatePlanPress, onCreateHivePress } = props;

  const theme = useTheme();

  return (
    <LightThemeProvider>
      <BottomSheet
        enablePanDownToClose
        snapPoints={[256]}
        index={-1}
        ref={ref}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            {...props}
          />
        )}
      >
        <BottomSheetView>
          <Title>What would you like to do?</Title>

          <TouchableWithoutFeedback onPress={onCreatePlanPress}>
            <ListItem>
              <Stack
                flexDirection="row"
                gap={8}
                style={{ alignItems: "center" }}
              >
                <CreatePlanIcon
                  width={32}
                  height={32}
                  fill={theme.colors.icon.primary}
                />

                <View>
                  <ListItemTitle>Create a new plan</ListItemTitle>
                  <ListItemSubtitle>
                    Have an event in mind? Share it with others!
                  </ListItemSubtitle>
                </View>
              </Stack>
            </ListItem>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={onCreateHivePress}>
            <ListItem>
              <Stack
                flexDirection="row"
                gap={8}
                style={{ alignItems: "center" }}
              >
                <CreatePlanIcon
                  width={32}
                  height={32}
                  fill={theme.colors.icon.primary}
                />
                <View>
                  <ListItemTitle>Create a new hive</ListItemTitle>
                  <ListItemSubtitle>
                    Build your own group of like-minded people!
                  </ListItemSubtitle>
                </View>
              </Stack>
            </ListItem>
          </TouchableWithoutFeedback>
        </BottomSheetView>
      </BottomSheet>
    </LightThemeProvider>
  );
});

export default CreatePlanOrHiveBottomSheet;

const Title = styled.Text`
  font-size: 24px;
  font-family: ${({ theme }) => theme.fonts.heavy};
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;
  margin-bottom: 16px;
`;

const ListItem = styled.View`
  background: ${({ theme }) => theme.colors.background.secondary};
  margin-top: 8px;
  padding: 8px 12px;
`;

const ListItemTitle = styled.Text`
  font-size: 22px;
  font-family: ${({ theme }) => theme.fonts.heavy};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const ListItemSubtitle = styled.Text`
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.text.secondary};
`;
