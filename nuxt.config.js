const stylus = require('stylus-loader')
const rupture = require('rupture')
const prefixer = require('autoprefixer-stylus')

require('dotenv').config()

export default {
	mode: 'universal',
	/*
  ** Headers of the page
  */
	head: {
		title: 'NuxtQL',
		meta: [
			{
				charset: 'utf-8' 
			},
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1' 
			},
			{
				hid: 'description',
				name: 'description',
				content: 'Nuxt.js App with GraphQL' 
			}
		],
		link: [
			{
				rel: 'icon',
				type: 'image/x-icon',
				href: '/favicon.ico' 
			}
		]
	},
	/*
  ** Progress bar configuration
  */
	loading: {
		color: '#00a2ff',
		throttle: 300
	},
	/*
  ** Global CSS
  */
	css: [
		'~assets/stylus/core.styl'
	],
	/*
  ** Plugins to load before mounting the App
  */
	plugins: [
		'~plugins/axios',
		'~plugins/validation',
		'~plugins/directives',
		'~plugins/mixins'
	],
	/*
  ** Nuxt.js dev-modules
  */
	buildModules: [
		'@nuxtjs/eslint-module'
	],
	/*
  ** Nuxt.js modules
  */
	modules: [
		'@nuxtjs/auth',
		'@nuxtjs/axios',
		'@nuxtjs/dotenv',
		'@nuxtjs/svg',
		'nuxt-fontawesome'
	],
	/*
  ** Auth module
  */
	auth: {
		strategies: {
			local: {
				endpoints: {
					login: {
						url: '/login',
						method: 'post',
						propertyName: 'token'
					},
					user: {
						url: '/users',
						method: 'get',
						propertyName: false
					},
					logout: false
				}
			}
		},
		redirect: {
			logout: '/login'
		}
	},
	/*
  ** Axios module
  */
	axios: {
		baseURL: process.env.API || 'http://localhost:3333/api/v1'
	},
	/*
  ** FontAwesome module
  */
	fontawesome: {
		component: 'icon', 
		imports: [
			{
				set: '@fortawesome/free-solid-svg-icons',
				icons: [
					'fas' 
				]
			}
		]
	},
	/*
  ** Router configuration
  */
	router: {
		middleware: [
			'auth',
			'navigation'
		],
		linkExactActiveClass: 'active'
	},
	/*
  ** Build configuration
  */
	build: {
		transpile: [
			'vee-validate/dist/rules'
		],
		plugins: [
			new stylus.OptionsPlugin({
				default: {
					use: [
						prefixer(),
						rupture()
					]
				}
			}) 
		],
		/*
    ** You can extend webpack config here
    */
		extend (config, ctx) {

		}
	}
}
