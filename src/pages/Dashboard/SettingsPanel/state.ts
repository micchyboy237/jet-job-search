import { atom } from "jotai";
import { Settings } from "./types";

const getSystemDarkMode = () => {
  if (typeof window !== "undefined") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  return false; // Default to light mode if not in a browser environment
};

const initialValue: Settings = {
  darkMode: getSystemDarkMode(),
  emailNotifications: false,
};

export const settingsAtom = atom<Settings>(initialValue);
export const updateSettingsAtom = atom(
  null,
  (get, set, update: Partial<Settings>) => {
    const currentSettings = get(settingsAtom);
    set(settingsAtom, { ...currentSettings, ...update });
  }
);
