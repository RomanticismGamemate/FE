const ROOM_CREATED_MESSAGE_PATTERN = /^.+방이 생성되었습니다\.?$/;

export const isSystemChatMessage = (message) => {
  if (!message) return false;

  if (message.message_type === "system") {
    return true;
  }

  const content = String(message.content || "").trim();
  return ROOM_CREATED_MESSAGE_PATTERN.test(content);
};
