const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: ['@babel/polyfill', './src/js/index.js'],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/bundle.js'
	},
	devServer: {
		contentBase: './dist'
	},
	plugins: [
		new HTMLWebpackPlugin({
			filename: 'index.html',
			template: './src/index.html'
		})
	],
	module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
			},
			// {
			// 	test: /\.css$/,
			// 	use: [{
			// 		loader: 'style-loader'
			// 	},
			// 	{
			// 		loader: 'css-loader'
			// 	}
			// 	]
            // },

			{
				test: /\.(png|jpe?g|gif)$/,
				use: [
				  {
					loader: 'file-loader',
					options: {},
				  },
				],
			},


			{
		    	test: /\.((s*)css)$/,
		        use: [
		        	{
		            // Adds CSS to the DOM by injecting a `<style>` tag
		            loader: 'style-loader'
		          },
		          {
		            // Interprets `@import` and `url()` like `import/require()` and will resolve them
		            loader: 'css-loader'
		          },
		          {
		            // Loader for webpack to process CSS with PostCSS
		            loader: 'postcss-loader',
		            options: {
		              plugins: function () {
		                return [
		                  require('autoprefixer')
		                ];
		              }
		            }
		          },
		          {
		            // Loads a SASS/SCSS file and compiles it to CSS
		            loader: 'sass-loader'
		          }
		        ]
			}



		]
	}

}
