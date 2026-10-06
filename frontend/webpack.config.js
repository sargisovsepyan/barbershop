var path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
  //...
  context: path.resolve(__dirname, 'src'),
  entry: './main.js',
  // vue-loader 15 imports SFC styles for side effects. Webpack 5 reports a
  // harmless missing default export even though the styles are injected.
  ignoreWarnings: [
    /export 'default'.*was not found.*vue\?vue&type=style/
  ],
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },
  

  devServer: {
    static: {
      directory: path.join(__dirname, 'src')
    },
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
      use: [
        {
          loader: 'vue-style-loader',
          options: {
            esModule: false
          }
        },
        {
          loader: 'css-loader',
          options: {
            esModule: false
          }
        }
      ],
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
