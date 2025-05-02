export default {
	verbose: false,
	artifactsDir: './releases',
	build: {
		overwriteDest: true,
		filename: '{name}-{version}.xpi',
	},
	ignoreFiles: [
		'addons.mozilla.json',
		'*config.*',
		'index.html',
		'node_modules',
		'package*.json',
		'public',
		'releases',
		'src',
		'pnpm-lock.yaml',
		'screenshots',
	],
};
