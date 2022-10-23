import React, { PropsWithChildren, ReactNode } from "react";
import { View, ViewStyle } from "react-native";

export interface StackProps extends PropsWithChildren<object> {
  flexDirection?: "row" | "column";
  gap?: number;
  divider?: ReactNode;
  style?: ViewStyle;
}

export default function Stack(props: StackProps) {
  const { flexDirection = "column", gap = 0, divider, style } = props;

  const length = React.Children.count(props.children);

  const styleDiff =
    flexDirection === "column" ? { marginBottom: gap } : { marginRight: gap };

  const newChildren = React.Children.map(props.children, (child, index) => {
    if (index + 1 === length) return child;

    const newChild = React.isValidElement(child)
      ? React.cloneElement(child, {
          style: [child.props.style, styleDiff],
        })
      : child;

    if (!divider) return newChild;

    return (
      <>
        {divider}
        {newChild}
      </>
    );
  });

  return <View style={[style, { flexDirection }]}>{newChildren}</View>;
}
