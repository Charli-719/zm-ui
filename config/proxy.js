/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * -------------------------------
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */

export default {
  localhost: {
    '/admin/': {
      target: 'http://10.10.52.113:8080/',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
  },
  dev: {
    '/api/': {
      target: 'http://wp.dev.touty.io/',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
  },
  uat: {
    '/api/': {
      target: 'http://wp.uat.touty.io/',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
  },
  prod: {
    '/api/': {
      target: 'http://wp.touty.io/',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
  },
};
