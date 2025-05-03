import Browser, { type Theme } from 'webextension-polyfill';
import {
	colorScheme,
	convertToComputedColor,
	defaultDarkColor,
	defaultLightColor,
	getBorderColor,
	getDarkestColor,
	getLightestColor,
	type ColorScheme,
} from './colors';

export const retrieveThemeColors = async (
	updateInfo?: Theme.ThemeUpdateInfo
) => {
	if (Browser.theme) {
		// This only works in Firefox
		const theme = await Browser.theme.getCurrent();
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
	} else {
		// Error retrieving colors
		return Promise.resolve({
			backgroundColor: undefined,
			foregroundColor: undefined,
			borderColor: undefined,
		});
	}
};
