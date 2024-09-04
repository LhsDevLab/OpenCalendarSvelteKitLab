import { writable, type Writable } from "svelte/store";

export interface ScreenInfo {
  isLandscape: boolean;
  isSmallWidth: boolean;
  isSmallHeight: boolean;
}

export const ScreenInfoValue: Writable<ScreenInfo> = writable<ScreenInfo>({
  isLandscape: false,
  isSmallWidth: false,
  isSmallHeight: false,
});
