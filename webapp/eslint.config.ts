import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import svelte from 'eslint-plugin-svelte';
import svelteParser from 'svelte-eslint-parser';

const compat = new FlatCompat();

export default [
	js.configs.recommended,
	...compat.config({
		extends: ['plugin:@typescript-eslint/recommended'],
	}),
	{
		files: ['**/*.ts'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
			},
		},
		plugins: {
			'@typescript-eslint': typescript,
		},
		rules: {
			'no-unused-vars': 'warn',
			'@typescript-eslint/no-explicit-any': 'warn',
		},
	},
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parser: svelteParser,
			parserOptions: {
				parser: tsParser,
			},
		},
		plugins: {
			svelte,
			'@typescript-eslint': typescript,
		},
		rules: {
			...svelte.configs.recommended,
		},
	},
];
