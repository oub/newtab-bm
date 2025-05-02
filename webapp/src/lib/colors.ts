import { writable, type Writable } from 'svelte/store';
import Browser, { type Theme } from 'webextension-polyfill';

export const defaultLightColor = '#f9f9f9';
export const defaultDarkColor = '#141414';

export type ColorScheme = 'dark' | 'light' | 'unset';

// Create a writable store for Firefox with initial value 'unset'
export const colorScheme: Writable<ColorScheme> = writable('unset');

export const getBorderColor = (
	foregroundColor: string,
	backgroundColor: string
): string => `color-mix(in srgb, ${foregroundColor} 40%, ${backgroundColor})`;

export const retrieveColors = (updateInfo?: Theme.ThemeUpdateInfo) => {
	if (Browser.theme) {
		// This only works in Firefox
		return Browser.theme.getCurrent().then((theme) => {
			let backgroundColor: string =
				(theme.colors?.popup as string) ?? defaultLightColor;
			let foregroundColor: string =
				(theme.colors?.popup_text as string) ?? defaultDarkColor;

			// Convert colors to computed values
			foregroundColor = convertToComputedColor(foregroundColor);
			backgroundColor = convertToComputedColor(backgroundColor);

			let borderColor = getBorderColor(foregroundColor, backgroundColor);

			// Sometimes, theme.getCurrent() returns null, so we need to estimate the color scheme
			let scheme: ColorScheme =
				getDarkestColor(backgroundColor, foregroundColor) === backgroundColor
					? 'dark'
					: 'light';

			if (scheme === 'light') {
				backgroundColor = getDarkestColor(backgroundColor, defaultLightColor);
			} else {
				backgroundColor = getLightestColor(backgroundColor, defaultDarkColor);
			}

			colorScheme.set(scheme);

			return { backgroundColor, foregroundColor, borderColor };
		});
	} else {
		// Error retrieving colors. Falling back to defaults
		return Promise.resolve({
			backgroundColor: undefined,
			foregroundColor: undefined,
			borderColor: undefined,
		});
	}
};

function getRGB(color: string): [number, number, number] {
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

function getLuminance(color: string): number {
	const [r, g, b] = getRGB(color);
	return 0.299 * r + 0.587 * g + 0.114 * b;
}

function convertToComputedColor(color: string): string {
	const tempElement = document.createElement('div');
	tempElement.style.color = color;
	document.body.appendChild(tempElement);
	const computedStyle = getComputedStyle(tempElement);
	const computedColor = computedStyle.color;
	document.body.removeChild(tempElement);
	return computedColor;
}

function getLightestColor(color1: string, color2: string): string {
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
function getDarkestColor(color1: string, color2: string): string {
	return getLuminance(color1) < getLuminance(color2) ? color1 : color2;
}
