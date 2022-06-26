import React from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import { Message } from "../../../supabase/entities/messages";
import MessageBubble from "./MessageBubble";

function renderMessage({ item }: { item: Message }) {
  return <MessageBubble message={item} />;
}

export interface MessageListProps {
  messages?: Message[];
}

export default function MessageList(props: MessageListProps) {
  const { messages } = props;

  return <FlatList data={messages} renderItem={renderMessage}></FlatList>;
}
