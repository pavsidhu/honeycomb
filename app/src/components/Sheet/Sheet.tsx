import styled from "styled-components/native";

const Sheet = styled.ScrollView`
  flex: 1;
  background: ${({ theme }) => theme.colors.background.primary};
  border-top-left-radius: 56px;
  border-top-right-radius: 56px;
`;

export default Sheet;
