import { writable, type Writable } from "svelte/store";

export type LabelMode = "all" | "bookmarks" | "subfolders" | "hover" | "never";
export type Density = "large" | "medium" | "compact";

const STORAGE_KEY = "newtab-settings";

const storedSettings = localStorage.getItem(STORAGE_KEY);

const initialSettings = storedSettings
  ? JSON.parse(storedSettings)
  : { labelMode: "all", density: "medium", showSettings: false };

export let settings: Writable<{
  density: Density;
  labelMode: LabelMode;
  showSettings: boolean;
}> = writable(initialSettings);

settings.subscribe((value) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
});
