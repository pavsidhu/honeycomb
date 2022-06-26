import React, { PropsWithChildren } from "react";
import { ViewStyle } from "react-native";
import styled from "styled-components/native";

export interface SettingsGroupProps extends PropsWithChildren<{}> {
  style?: ViewStyle;
}

export default function SettingsGroup(props: SettingsGroupProps) {
  const { style } = props;

  const length = React.Children.count(props.children);
  const newChildren = React.Children.map(props.children, (child, index) => {
    if (index + 1 === length) return child;

    return (
      <>
        {child}
        <Divider />
      </>
    );
  });

  return <Root style={style}>{newChildren}</Root>;
}

const Root = styled.View`
  padding: 8px 16px;
  width: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.medium.px};
  background: ${({ theme }) => theme.colors.background.secondary};
`;

const Divider = styled.View`
  height: 1px;
  background: rgba(0, 0, 0, 0.1);
  margin: 4px 8px;
`;
