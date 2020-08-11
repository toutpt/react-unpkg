
export const bundles = {
	'@material-ui/core': {
		dependencies: [],
		resources: [
			{
				tag: 'script',
				name: '@material-ui/core',
				version: '4.10.0',
				path: '/umd/material-ui.production.min.js',
				var: 'MaterialUI',
			},
			{
				tag: 'link',
				url: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap',
			}
		],
	}
}

