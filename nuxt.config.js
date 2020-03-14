require('dotenv').config()

const stylus = require('stylus-loader')
const rupture = require('rupture')
const prefixer = require('autoprefixer-stylus')
const url = 'https://callmai-admin.herokuapp.com/api/v1'

export default {
	mode: 'universal',
	/*
  ** Headers of the page
  */
	head: {
		title: 'Callmaí — ADMIN',
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
				content: 'Callmaí — ADMINISTRATION SYSTEM' 
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
		'~plugins/directives'
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
						url: `${url}/login`,
						method: 'post',
						propertyName: 'token'
					},
					user: {
						url: `${url}/user`,
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
	axios: {},
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
