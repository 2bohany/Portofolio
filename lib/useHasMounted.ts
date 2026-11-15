import { useSyncExternalStore } from "react";

function subscribe() {
  return () => {};
}
function getSnapshot() {
  return true;
}
function getServerSnapshot() {
  return false;
}

/** Hydration-safe "are we on the client yet" check, without setState-in-effect. */
export function useHasMounted() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
