import Browser from 'webextension-polyfill';

export let getBrowser = (): 'firefox' | 'chrome' => {
	let browser: 'firefox' | 'chrome' = Browser.theme ? 'firefox' : 'chrome';

	getBrowser = () => browser;

	return browser;
};
