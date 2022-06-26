import React, { useState } from "react";
import styled from "styled-components/native";
import IconButton from "../../../components/IconButton";
import TextInput from "../../../components/TextInput";
import SendIcon from "../../../../assets/images/icons/send.svg";

export interface MessageInputProps {
  onSubmit: (text: string) => void;
}

export default function MessageInput(props: MessageInputProps) {
  const { onSubmit } = props;

  const [textMessage, setTextMessage] = useState("");
  const hasValidTextMessage = textMessage.trim().length > 0;

  function handleSubmit() {
    setTextMessage("");
    onSubmit(textMessage);
  }

  return (
    <Root>
      <TextMessageInputContainer>
        <TextInput
          placeholder="Send a message"
          value={textMessage}
          onChangeText={setTextMessage}
        />

        {hasValidTextMessage && (
          <SendIconButton variant="icon-only" onPress={handleSubmit}>
            <SendIcon />
          </SendIconButton>
        )}
      </TextMessageInputContainer>
    </Root>
  );
}

const Root = styled.View`
  width: 100%;
  margin: 0;
`;

const TextMessageInputContainer = styled.View`
  justify-content: center;
  padding: 8px 24px 0;
`;

const SendIconButton = styled(IconButton)`
  position: absolute;
  right: 32px;
  top: 16px;
`;
