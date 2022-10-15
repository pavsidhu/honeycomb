import styled from "styled-components/native";

const ErrorMessage = styled.Text`
  margin-top: 4px;
  margin-left: 4px;
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.text.error};
`;

export default ErrorMessage;
