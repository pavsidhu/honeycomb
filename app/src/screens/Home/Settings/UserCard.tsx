import React from "react";
import { TouchableWithoutFeedback, ViewStyle } from "react-native";
import styled from "styled-components/native";
import Avatar from "../../../components/Avatar/Avatar";
import { useCurrentUserAvatar } from "../../../supabase/entities/avatars";
import { useCurrentUser } from "../../../supabase/entities/users";

interface UserCardProps {
  onPress: () => void;
  style?: ViewStyle;
}

export default function UserCard(props: UserCardProps) {
  const { onPress, style } = props;

  const { data: currentUserAvatar } = useCurrentUserAvatar();
  const { data: currentUser } = useCurrentUser();

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Root style={style}>
        <Avatar uri={currentUserAvatar?.uri} size={80} />
        {currentUser && (
          <Details>
            <Name>{`${currentUser.firstName} ${currentUser.lastName}`}</Name>
            <PhoneNumber>{"+" + currentUser.phoneNumber}</PhoneNumber>
          </Details>
        )}
      </Root>
    </TouchableWithoutFeedback>
  );
}

const Root = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.medium.px};
  width: 100%;
`;

const Details = styled.View`
  margin-left: 16px;
`;

const Name = styled.Text`
  font-size: 28px;
  font-family: ${({ theme }) => theme.fonts.heavy};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const PhoneNumber = styled.Text`
  font-size: 20px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.text.primary};
`;
