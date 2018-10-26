module.exports = {
	// theme: 'yubisaki',
	title: 'Kyle',
	description: `woodenF's blog`,
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
		lastUpdated: 'Last Updated',
		date_format: 'yyyy-MM-dd HH:mm:ss',
		nav: [
			{ text: '主页', link: '/' },
			{ text: '记录', link: '/blog/JavaScript/' },
			{ text: '关于', link: '/about/' },
			{
				text: 'Github', items: [{
					text: 'GitHub地址', link: 'https://github.com/woodenF'
				}]
			}
		],
		sidebar: [
		'/about/',
		'/blog/JavaScript/',
		{
			title: 'JavaScript',
			link: '/blog/JavaScript/',
			children: [
				'/blog/JavaScript/设计模式'
			]
		}
		]
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