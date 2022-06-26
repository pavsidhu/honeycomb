import React from "react";
import styled from "styled-components/native";

export interface ProgressBarProps {
  percent: number;
}

export default function ProgressBar(props: ProgressBarProps) {
  return (
    <Track>
      <Progress style={{ width: `${props.percent}%` }} />
    </Track>
  );
}

const Track = styled.View`
  background: ${({ theme }) => theme.colors.background.secondary};
  height: 6px;
  width: 100%;
`;

const Progress = styled.View`
  background: ${({ theme }) => theme.colors.common.yellow.dark};
  height: 100%;
`;
