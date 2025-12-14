const { defineConfig } = require('@vue/cli-service')
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
      // ここを 'wss://ドメイン名/ws' に設定するのが重要です
      webSocketURL: 'wss://www.hato-inds.com/ws',
    },
    compress: true,
  },
})
