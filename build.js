const webpack = require('webpack')

function pack() {
	const compiler = webpack({
	  entry: './Indicate.js',
	  output: {
			library: 'Indicate',
	    filename: 'dist/indicate.js'
	  },
		module: {
			rules: [
		    {
		      test: /\.js$/,
		      exclude: /node_modules/,
		      use: {
		        loader: 'babel-loader',
		        options: {
		          presets: ['env']
		        }
		      }
		    },
				{
					test: /\.scss$/,
					use: [{
					    loader: "style-loader"
					}, {
					    loader: "css-loader"
					}, {
					    loader: "sass-loader"
					}]
        }
		  ]
		}
	})

	const watching = compiler.watch({}, (err, stats) => {
		if (err || stats.hasErrors()) {
			return console.log('Error: ', err)
	  }

		console.log(stats.toString({
	    chunks: true,
	    colors: true
	  }))
	})
}

pack()
