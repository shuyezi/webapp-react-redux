const config = require('./config.user')

const base = {
	appRoot: 'app',
	libRoot: 'libs',
	commonRoot: 'common',
	entry: 'index.js',
	libs: [
		'./libs/javascript/index.js',
		'./common/style/base.less',
        './common/style/common.less'
	],
	indexTpl: 'index.html',
	release: 'release',
	assets: 'assets',
	domain: '//localhost',
	cdnPath: '//localhost/static'
}

const production = base

const development = Object.assign({}, base, {
	release: 'release_debug',
	cdnPath: 'assets',
	port: config.port,
	domain: config.host || ''
})

module.exports = {
	production: production,
	development: development
}