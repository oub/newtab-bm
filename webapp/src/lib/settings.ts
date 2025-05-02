import { writable, type Writable } from 'svelte/store';

export type LabelsSettings = 'always' | 'hover' | 'never';
export type DensitySettings = 'large' | 'medium' | 'compact';

const STORAGE_KEY = 'newtab-settings';

const storedSettings = localStorage.getItem(STORAGE_KEY);

const initialSettings = storedSettings
	? JSON.parse(storedSettings)
	: {
			density: 'medium',
			labels: 'always',
			showSettings: false,
	  };

export let settings: Writable<{
	density: DensitySettings;
	labels: LabelsSettings;
	showSettings: boolean;
}> = writable(initialSettings);

settings.subscribe((value) => {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
});
