
export const bundles = {
	'react-i18next': {
		dependencies: ['i18next'],
		resources: [
			{
				tag: 'script',
				name: 'react-i18next',
				version: '10.11.4',
				path: '/react-i18next.min.js',
				var: 'ReactI18next',
			},
		],
	},
	i18next: {
		dependencies: [],
		resources: [
			{
				tag: 'script',
				name: 'i18next',
				version: '15.1.3',
				path: '/dist/umd/i18next.min.js',
				var: 'i18next',
			},
		],
	},
	react: {
		dependencies: [],
		resources: [
			{
				tag: 'script',
				name: 'react',
				version: '16.12.0',
				path: '/umd/react.development.js',
				var: 'React',
			},
			{
				tag: 'script',
				name: 'react-dom',
				version: '16.12.0',
				path: '/umd/react-dom.development.js',
				var: 'ReactDOM',
			},
		],
	},
	jquery: {
		dependencies: [],
		resources: [
			{
				tag: 'script',
				name: 'jquery',
				version: '3.5.1',
				path: '/dist/jquery.js',
				var: 'jQuery',
			},
		],
	},
};
