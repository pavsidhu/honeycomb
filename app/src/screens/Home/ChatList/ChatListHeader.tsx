import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import React from "react";
import { SafeAreaView, TouchableHighlight } from "react-native";
import styled from "styled-components/native";
import AddFriendsIcon from "../../../../assets/images/icons/add-friends.svg";
import LogoSvg from "../../../../assets/images/logo/logo.svg";
import HomeRoutes from "../HomeRoutes";
import Avatar from "../../../components/Avatar";
import IconButton from "../../../components/IconButton";
import { useCurrentUserAvatar } from "../../../supabase/entities/avatars";

export default function ChatListHeader(props: NativeStackHeaderProps) {
  const { data: currentUserAvatar } = useCurrentUserAvatar();

  return (
    <Root>
      <SafeAreaView>
        <Contents>
          <LogoContainer>
            <Logo />
          </LogoContainer>

          <IconButton
            onPress={() => props.navigation.push(HomeRoutes.Friends)}
            variant="secondary"
            style={{ marginRight: 16 }}
          >
            <AddFriendsIcon />
          </IconButton>

          <TouchableHighlight
            onPress={() => props.navigation.push(HomeRoutes.Settings)}
          >
            <Avatar uri={currentUserAvatar?.uri} size={40} />
          </TouchableHighlight>
        </Contents>
      </SafeAreaView>
    </Root>
  );
}

const Root = styled.View`
  background: ${({ theme }) => theme.colors.background.default};
`;

const Contents = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 16px 24px;
`;

const LogoContainer = styled.View`
  flex: 1;
`;

const Logo = styled(LogoSvg)`
  width: 180px;
  height: 40px;
`;
