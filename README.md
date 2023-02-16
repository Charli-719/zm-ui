# ui

#### 介绍
ui管理端

#### 软件架构
软件架构说明


#### 安装教程
- 确保电脑已安装git、node、idea
1、使用 npm clone ***(gitlab项目地址) 把项目克隆到本地
2、使用 npm install 安装项目用到的modules
3、使用 npm start 启动运行项目
项目启动成功访问 http://localhost:8000

#### 使用说明
<details>
<summary>展开查看</summary>
<pre><code>.
├── ui
│   ├── config
│   │   └── config.js(基本配置)
│   │   └── proxy.js(本地代理配置)
│   │   └── routes.js(路由配置)
│   │   └── theme.js(主体色系配置)
│   ├── dist(打包输出)
│   ├── mock(mock数据)
│   │   ├── mock (模拟数据文件)
│   ├── node_modules(安装包，执行npm install后自动出现此文件)
│   ├── public(公共文件,里面的文件打包时可以直接copy到打包文件dist内. 主要放置favicon)
│   ├── src
│   │   ├── assets (静态资源)
│   │   ├── components (公共组件)
│   │   │   └── loading(loading组件)
│   │   ├── data(数据请求文件)
│   │   │   └── Srvice(接口)
│   │   │   └── utils(全局方法)
│   │   ├── layout (外层布局)
│   │   ├── pages (router页面 umi约定名称)
│   │   │   └── home(首页)
│   │   │   └── member(学员管理)
│   │   │   │    └── sstudenttudent(学员信息)
│   │   │   │    └── contact(联系人信息)
│   │   │   │    └── progress(学习进度)
│   │   │   └── resource(资源中心)
│   │   │   │    └── examination(试卷库)
│   │   │   │    └── question(题库)
│   │   │   │    └── courseware(课件管理)
│   │   │   └── subject(学科管理)
│   │   │   │    └── category(学科类别)
│   │   │   │    └── course(科目信息)
│   │   │   └── system(系统设置)
│   │   │   │    └── account(账号管理)
│   │   │   │    └── permission(权限管理)
│   │   │   └── user(个人中心)
│   │   │   │   └── info(个人信息)
│   │   │   │   └── logout(退出登录)
│   │   │   │   └── login(登录页面)
│   │   │   └── website(官网管理)
│   │   │   │   └── consult(咨询管理)
│   │   │   └── 404.js(404页面)
│   │   │   └── document.ejs(HTML template)
│   │   │   └── index.js(首页--判断用户是否登录等)
│   │   ├── global.less (全局样式)
│   ├── env (环境变量)
│   ├── eslintrc 代码规范检查
│   ├── gitignore 忽略提交的代码
│   ├── Dockerfile Docker部署的文件
│   ├── package.json 入口页、所有依赖、以及项目启动打包编译
│   ├── README.md
│   ├── webpack.config.js webpack打包
├── 完结
.</code></pre>
</details>
