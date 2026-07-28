const ROOM_CREATED_MESSAGE_PATTERN = /^.+방이 생성되었습니다\.?$/;

export const isSystemChatMessage = (message) => {
  if (!message) return false;

  if (message.message_type === "system") {
    return true;
  }

  const content = String(message.content || "").trim();
  return ROOM_CREATED_MESSAGE_PATTERN.test(content);
};

export const formatChatMessagePreview = (message) => {
  if (!message) {
    return "";
  }

  if (isSystemChatMessage(message)) {
    return message.content;
  }

  const name =
    message.sender?.nickname ??
    message.sender?.username ??
    "알 수 없음";

  return `${name}: ${message.content}`;
};
