import React from "react";
import { TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";

export interface SheetTabsProps {
  tabs: {
    id: string;
    label: string;
  }[];
  activeTabId: string;
  onActiveTabIdChange: (id: string) => void;
}

export default function SheetTabs(props: SheetTabsProps) {
  const { tabs, activeTabId, onActiveTabIdChange } = props;

  return (
    <TabList>
      {tabs.map((it) => (
        <TouchableWithoutFeedback
          onPress={() => onActiveTabIdChange(it.id)}
          key={it.id}
        >
          <TabItem>
            <TabItemLabel active={activeTabId === it.id}>
              {it.label}
            </TabItemLabel>

            {activeTabId === it.id && <TabItemPointer />}
          </TabItem>
        </TouchableWithoutFeedback>
      ))}
    </TabList>
  );
}

const TabList = styled.View`
  width: 100%;
  padding: 8px 48px;
  flex-direction: row;
  justify-content: space-around;
`;

const TabItem = styled.View`
  align-items: center;
`;

const TabItemLabel = styled.Text<{ active: boolean }>`
  color: ${({ theme, active }) =>
    active ? theme.colors.text.primary : theme.colors.text.transparentPrimary};
  font-family: ${({ theme }) => theme.fonts.heavy};
  font-size: 18px;
  margin-bottom: 4px;
`;

const TabItemPointer = styled.View`
  width: 0;
  height: 0;
  border-style: "solid";
  border-left-width: 4px;
  border-right-width: 4px;
  border-bottom-width: 6px;
  border-left-color: transparent;
  border-right-color: transparent;
  color: ${({ theme }) => theme.colors.text.primary};
`;
