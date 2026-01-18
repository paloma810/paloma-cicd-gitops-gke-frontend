const { defineConfig } = require('@vue/cli-service')

// 環境に応じてWebSocketURLを切り替え
const wsProtocol = process.env.NODE_ENV === 'PROD' ? 'wss' : 'ws'
const wsHost = process.env.VUE_APP_WS_HOST || 'localhost'
const wsPort = process.env.VUE_APP_WS_PORT || '8080'
const webSocketURL = `${wsProtocol}://${wsHost}:${wsPort}/ws`

module.exports = defineConfig({
  transpileDependencies: true,

  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  },
  devServer: {
    // 1. 外部からのホストヘッダーを許可する
    allowedHosts: 'all',
    // 2. クライアント（ブラウザ）が接続すべきURLを明示する
    client: {
      // 環境に応じてWebSocketURLを設定
      webSocketURL: webSocketURL,
    },
    compress: true,
  },
})
