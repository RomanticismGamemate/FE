import { useEffect, useRef, useState } from "react";

/** 스크롤 중일 때만 true — 스크롤바 auto-hide용 */
export const useAutoHideScrollbar = (hideDelayMs = 700) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const hideTimerRef = useRef(null);

  useEffect(
    () => () => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
    },
    [],
  );

  const onScroll = () => {
    setIsScrolling(true);

    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
    }

    hideTimerRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, hideDelayMs);
  };

  return { isScrolling, onScroll };
};
