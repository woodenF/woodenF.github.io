module.exports = {
	// theme: 'yubisaki',
	title: 'Kyle',
	description: `以我观物，故物皆着我之色彩`,
	head: [
		['link', { rel: 'icon', href: `/favicon.ico` }]
	],
	base: '/',
	repo: 'https://github.com/woodenF/blog',
	dest: './docs/.vuepress/dist',
	ga: '',
	serviceWorker: true,
	evergreen: true,
	themeConfig: {
		background: `/img/`,
		github: 'woodenF',
		// logo: '/img/logo.png',
		accentColor: '#ac3e40', 
		per_page: 6,
		// lastUpdated: 'Last Updated',
		// date_format: 'yyyy-MM-dd HH:mm:ss',
		nav: [
			{ text: '记录', link: '/about/记录.md' },
			{ text: '关于', link: '/about/index.md' },
			{
				text: 'Github', link: 'https://github.com/woodenF'
			}
		],
		sidebar: {
		'/blog/':[{
			title: 'JavaScript',
			collapsable: true,
			children: [
				'JavaScript/design',
				'JavaScript/maze',
				'JavaScript/judge',
				'JavaScript/sudoku',
				'JavaScript/Webpack4.x',
				'JavaScript/VSCodePlugin'
			]
		}, {
			title: 'JavaScript深入',
			collapsable: true,
			children: [
				'JavaScript深入/',
				'JavaScript深入/从原型到原型链'
			]
		}]},
		serviceWorker: {
			updatePopup: true
		},
		displayAllHeaders: false
	},
	markdown: {
		anchor: {
			permalink: true
		},
		toc: {
			includeLevel: [1, 2]
		},
		config: md => {
			// 使用更多 markdown-it 插件！
			md.use(require('markdown-it-task-lists'))
				.use(require('markdown-it-imsize'), { autofill: true })
		}
	},
	// postcss: {
	// 	plugins: [require('autoprefixer')]
	// },
}