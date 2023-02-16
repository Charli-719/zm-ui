// ref: https://umijs.org/config/
import routes from "./routes"
import theme from "./theme"
import proxy from "./proxy";

const { REACT_APP_ENV } = process.env;

export default {
  hash: true, // 配置是否让生成的文件包含 hash 后缀，通常用于增量发布和避免浏览器加载缓存。
  history: { // 配置 history 类型和配置项
    type: 'hash' // 可选 browser、hash 和 memory
  },
  base: '/', // 设置路由前缀，通常用于部署到非根目录。
  publicPath: './', // 配置 webpack 的 publicPath。当打包的时候，webpack 会在静态文件路径前面添加 publicPath 的值
  locale: {
    default: 'zh-CN',// 默认语言，当检测不到具体语言时，展示 default 中指定的语言。
    antd: true, // 开启后，支持 antd 国际化
    baseNavigator: true,// 开启浏览器语言检测。
  },
  routes, //路由文件
  theme, //主题色系
  proxy: proxy[REACT_APP_ENV || 'dev'], //本地代理
  title: "title",
  favicon: '/favicon.ico',// 修改浏览器上的icon
  fastRefresh: {},// Fast Refresh 热更新. 开发时可以保持组件状态，同时编辑提供即时反馈。
  // mfsu: {}, //mfsu: https://github.com/umijs/umi/issues/6766
  webpack5:{},
  nodeModulesTransform: { // 设置 node_modules 目录下依赖文件的编译方式。
    type: 'none', // 可选all 或 null
  },
  mock: {}, //是否使用本地模拟数据, false: 使用远程服务器接口数据; {}: 使用本地模拟数据
  dynamicImport: {
    loading: '@/components/loading',
  }
}
