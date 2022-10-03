import React, { forwardRef } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import styled from "styled-components/native";
import { TouchableWithoutFeedback, View } from "react-native";

export interface CreatePlanOrHiveBottomSheetProps {
  onCreatePlanPress: () => void;
  onCreateHivePress: () => void;
}

const CreatePlanOrHiveBottomSheet = forwardRef<
  BottomSheet,
  CreatePlanOrHiveBottomSheetProps
>((props, ref) => {
  const { onCreatePlanPress, onCreateHivePress } = props;

  return (
    <BottomSheet
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
            {/* <Icon /> */}
            <View>
              <ListItemTitle>Create a new plan</ListItemTitle>
              <ListItemSubtitle>
                Have an event in mind? Share it with others!
              </ListItemSubtitle>
            </View>
          </ListItem>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={onCreateHivePress}>
          <ListItem>
            {/* <Icon /> */}
            <View>
              <ListItemTitle>Create a new hive</ListItemTitle>
              <ListItemSubtitle>
                Build your own group of like-minded people!
              </ListItemSubtitle>
            </View>
          </ListItem>
        </TouchableWithoutFeedback>
      </BottomSheetView>
    </BottomSheet>
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
