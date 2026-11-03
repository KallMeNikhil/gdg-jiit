"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePointerFine } from "./useMediaQuery";

export function useLive(hold = 1400) {
  const fine = usePointerFine();
  const [live, setLive] = useState(false);
  const timer = useRef(0);

  const tap = useCallback(() => {
    if (fine) return;
    window.clearTimeout(timer.current);
    setLive(true);
    timer.current = window.setTimeout(() => setLive(false), hold);
  }, [fine, hold]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return { fine, live: !fine && live, tap };
}
