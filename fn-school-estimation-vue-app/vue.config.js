var webpack = require('webpack')
	
module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        'VUE_APP_IMAGE_SERVER': JSON.stringify('http://localhost:5000/images/'),
        'VUE_APP_API_URL': JSON.stringify('http://localhost:5000/api')
      })
    ]
	}
}
