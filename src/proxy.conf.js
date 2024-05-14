const PROXY_CONFIG = [
  {
    context: [
      '/session'
    ],
    target: "https://generative-api.verbeux.com.br/",
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      "^/": ""
    }
  }
]

module.exports = PROXY_CONFIG