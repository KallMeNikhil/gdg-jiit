"use client";

import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  window.addEventListener("gdg:intro", onChange);
  return () => window.removeEventListener("gdg:intro", onChange);
}

function read() {
  const state = document.documentElement.dataset.intro;
  return state === "skip" || state === "done";
}

export function useIntroDone() {
  return useSyncExternalStore(subscribe, read, () => false);
}
