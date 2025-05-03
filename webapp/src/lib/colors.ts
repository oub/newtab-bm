import { writable, type Writable } from 'svelte/store';

export const defaultLightColor = '#f9f9f9';
export const defaultDarkColor = '#141414';

export type ColorScheme = 'dark' | 'light' | 'unset';

// Create a writable store for Firefox with initial value 'unset'
export const colorScheme: Writable<ColorScheme> = writable('unset');

export function getBorderColor(
	foregroundColor: string,
	backgroundColor: string,
	theme: 'light' | 'dark' = 'light'
): string {
	const opacity: number = theme === 'light' ? 40 : 20;
	return `color-mix(in srgb, ${foregroundColor} ${opacity}%, ${backgroundColor})`;
}
export function getRGB(color: string): [number, number, number] {
	// Handle hex colors
	if (color.startsWith('#')) {
		const hex = color.slice(1);
		if (hex.length === 3) {
			return [
				parseInt(hex[0] + hex[0], 16),
				parseInt(hex[1] + hex[1], 16),
				parseInt(hex[2] + hex[2], 16),
			];
		} else if (hex.length === 6) {
			return [
				parseInt(hex.slice(0, 2), 16),
				parseInt(hex.slice(2, 4), 16),
				parseInt(hex.slice(4, 6), 16),
			];
		}
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

export function getLuminance(color: string): number {
	const [r, g, b] = getRGB(color);
	return 0.299 * r + 0.587 * g + 0.114 * b;
}

export function convertToComputedColor(color: string): string {
	const tempElement = document.createElement('div');
	tempElement.style.color = color;
	document.body.appendChild(tempElement);
	const computedColor = getComputedStyle(tempElement).color;
	document.body.removeChild(tempElement);
	return computedColor;
}

export function getLightestColor(color1: string, color2: string): string {
	console.log(
		'lightest',
		color1,
		getRGB(color1),
		color2,
		getRGB(color2),
		getLuminance(color1) > getLuminance(color2) ? color1 : color2
	);
	return getLuminance(color1) > getLuminance(color2) ? color1 : color2;
}

export function getDarkestColor(color1: string, color2: string): string {
	return getLuminance(color1) < getLuminance(color2) ? color1 : color2;
}
