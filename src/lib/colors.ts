import { writable, type Writable } from "svelte/store";

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

export function convertToComputedColor(color: string): string {
  const tempElement = document.createElement("div");
  tempElement.style.color = color;
  document.body.appendChild(tempElement);
  const computedStyle = getComputedStyle(tempElement);
  const computedColor = computedStyle.color;
  document.body.removeChild(tempElement);
  return computedColor;
}

export function getDarkestColor(color1: string, color2: string): string {
  return getLuminance(color1) < getLuminance(color2) ? color1 : color2;
}
