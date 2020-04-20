const fs = require('fs')

const getUriCatalog = function(uri) {
	return new Promise((resolve, reject) => {
		fs.readdir(uri, (err, files) => {
			resolve(files)
		})
	})
}

const getCatalog = async function() {
	let pCatalog = await getUriCatalog('./docs/blog');
	return new Promise((resolve, reject) => {
	 Promise.all(pCatalog.map(async (uri) => getUriCatalog(`./docs/blog/${uri}`)))
		.then((res) => {
			resolve( {
				'/blog/': pCatalog.map((uri, index) => {
					return {
						title: uri,
						collapsable: true,
						children: res[index]
					}
				})
			})
		})
	})

}

module.exports = {
	// theme: 'yubisaki',
	title: 'Kyle',
	description: `此时正当修行时`,
	head: [
		['link', { rel: 'icon', href: `/favicon.ico` }]
	],
	base: '/docs/src/',
	repo: 'https://github.com/woodenF/blog',
	dest: './docs/src',
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
				'JavaScript深入/从原型到原型链',
				'JavaScript深入/call和apply的模拟实现',
				'JavaScript深入/JavaScript的事件循环'
			]
		}, {
			title: '插件',
			collapsable: true,
			children: [
				'插件/使用ESlint约束代码风格',
				'插件/ESlint配置规则',
				
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