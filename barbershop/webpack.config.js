var path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
  //...
  context: path.resolve(__dirname, 'src'),
  entry: './main.js',
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },
  

  devServer: {
    contentBase: path.join(__dirname, 'src'),
    compress: true,
    port: 8080
  },
  module:{
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader'
    },
    {
      test: /\.css$/i,
      use: ['style-loader', 'css-loader'],
    },
    {
      test: /\.(jpe?g|png|gif|svg)$/i,
      use: [
        'url-loader?limit=10000',
        'img-loader'
      ]
    },
    {
      test: /\.(png|jpg|gif)$/i,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 8192,
          },
        },
      ],
    },
  ]
    


  },
  plugins: [
    // убедитесь что подключили плагин!
    new VueLoaderPlugin()
  ]

};
