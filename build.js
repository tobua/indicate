// https://github.com/jackmoore/autosize/blob/master/build.js

const package = require('./package.json')
const fs = require('fs')
const babel = require('babel-core')

function build(code) {
	const header = [
		'/**',
		package.name + ' ' + package.version, '',
    package.description, '',
		'License: ' + package.license,
    'Author: ' + package.author,
		'Repository: ' + package.repository
	].join('\n * ') + '\n */\n\n'

	fs.writeFileSync('dist/indicate.js', header + code)
  console.log('Indicate was built.')
}

function transform(filepath) {
	babel.transformFile(filepath, {
    presets: ['es2015'],
    plugins: ['transform-es2015-modules-umd']
  }, (error, result) => {
		if (error) {
			return console.log(error)
		} else {
			build(result.code)
		}
	})
}

fs.watch(package.main, () => transform(package.main))

transform(package.main)
