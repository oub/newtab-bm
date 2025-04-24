import { writable, type Writable } from "svelte/store";
import { browser, type Theme } from "webextension-polyfill-ts";

export type ColorScheme = "dark" | "light" | "unset";

// Create a writable store with initial value 'unset'
export const colorScheme: Writable<ColorScheme> = writable("unset");

function getRGB(color: string): [number, number, number] {
  // Handle hex colors
  if (color.startsWith("#")) {
    const hex = color.slice(1);
    return [
      parseInt(hex.slice(0, 2), 16),
      parseInt(hex.slice(2, 4), 16),
      parseInt(hex.slice(4, 6), 16),
    ];
  }

  // Handle rgb/rgba colors
  const match = color.match(/\d+/g);
  if (match) {
    return [
      parseInt(match[0], 10),
      parseInt(match[1], 10),
      parseInt(match[2], 10),
    ];
  }

  return [0, 0, 0];
}

function getLuminance(color: string): number {
  const [r, g, b] = getRGB(color);
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

function convertToComputedColor(color: string): string {
  const tempElement = document.createElement("div");
  tempElement.style.color = color;
  document.body.appendChild(tempElement);
  const computedStyle = getComputedStyle(tempElement);
  const computedColor = computedStyle.color;
  document.body.removeChild(tempElement);
  return computedColor;
}

function getDarkestColor(color1: string, color2: string): string {
  return getLuminance(color1) < getLuminance(color2) ? color1 : color2;
}

const defaultBackgroundColor = "#fff";
const defaultForegroundColor = "#000";

export const retrieveColors = (updateInfo?: Theme.ThemeUpdateInfo) =>
  browser.theme.getCurrent().then((theme) => {
    let backgroundColor = theme.colors?.popup ?? defaultBackgroundColor;
    let foregroundColor = theme.colors?.popup_text ?? defaultForegroundColor;

    // Convert colors to computed values
    foregroundColor = convertToComputedColor(foregroundColor);
    backgroundColor = convertToComputedColor(backgroundColor);

    let borderColor = convertToComputedColor(
      `color-mix(in srgb, ${foregroundColor} 30%, ${backgroundColor})`
    );

    // Sometimes, theme.getCurrent() returns null, so we need to estimate the color scheme
    let scheme: ColorScheme =
      getDarkestColor(backgroundColor, foregroundColor) === backgroundColor
        ? "dark"
        : "light";

    if (scheme === "light") {
      backgroundColor = getDarkestColor(backgroundColor, "#f9f9f9");
    }

    colorScheme.set(scheme);

    return { backgroundColor, foregroundColor, borderColor };
  });
