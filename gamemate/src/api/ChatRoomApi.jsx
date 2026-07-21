const API_BASE_URL = process.env.REACT_APP_API_BASE_URL?.replace(/\/+$/, "");

if (!API_BASE_URL) {
  throw new Error("REACT_APP_API_BASE_URL 환경변수가 설정되지 않았습니다.");
}

const ROOMS_URL = `${API_BASE_URL}/api/rooms/`;

const parseErrorMessage = async (
  response,
  fallbackMessage = "요청을 처리하는 중 문제가 발생했습니다.",
) => {
  try {
    const errorData = await response.json();

    return (
      errorData?.message ||
      errorData?.detail ||
      errorData?.error ||
      fallbackMessage
    );
  } catch {
    return fallbackMessage;
  }
};

/**
 * 내가 참여 중인 방 목록 조회
 * GET https://api.gamemate.kr/api/rooms/mine/
 */
export const getMyRooms = async () => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("로그인이 필요합니다.");
  }

  const response = await fetch(`${ROOMS_URL}mine/`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("로그인 정보가 만료되었습니다. 다시 로그인해 주세요.");
    }

    throw new Error(
      await parseErrorMessage(
        response,
        "채팅방 목록을 불러오는 중 문제가 발생했습니다.",
      ),
    );
  }

  const data = await response.json();

  return Array.isArray(data) ? data : [];
};

/**
 * 특정 방 메시지 목록 조회
 * GET https://api.gamemate.kr/api/rooms/{room_id}/messages/
 */
export const getRoomMessages = async ({ roomId, afterId } = {}) => {
  if (roomId === undefined || roomId === null || roomId === "") {
    throw new Error("roomId는 필수입니다.");
  }

  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("로그인이 필요합니다.");
  }

  const searchParams = new URLSearchParams();

  if (afterId !== undefined && afterId !== null && afterId !== "") {
    searchParams.set("after_id", String(afterId));
  }

  const queryString = searchParams.toString();

  const requestUrl =
    `${ROOMS_URL}${encodeURIComponent(roomId)}/messages/` +
    (queryString ? `?${queryString}` : "");

  const response = await fetch(requestUrl, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("로그인 정보가 만료되었습니다. 다시 로그인해 주세요.");
    }

    if (response.status === 403) {
      throw new Error("승인된 방 멤버만 메시지를 조회할 수 있습니다.");
    }

    if (response.status === 404) {
      throw new Error("존재하지 않는 채팅방입니다.");
    }

    throw new Error(
      await parseErrorMessage(
        response,
        "채팅 메시지를 불러오는 중 문제가 발생했습니다.",
      ),
    );
  }

  const data = await response.json();

  return Array.isArray(data) ? data : [];
};
