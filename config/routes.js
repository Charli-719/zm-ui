export default [
  //登录路由
  {
    path: '/login',
    layout: false,
    component: './user/Login',
  },
  {
    path: '/',
    component: '@/layouts/index',
    //配置路由的高阶组件封装(比如，可以用于路由级别的权限校验)
    wrappers: [
      '@/pages/index',
    ],
    routes: [
      { path: '/', redirect: '/home' },
      // { path: '/index', component: '../pages/index' },
      { path: '/home', component: '../pages/home/index' },//home
      { path: '/category', component: '../pages/subject/category/index' }, //category
      { path: '/course', component: '../pages/subject/course/index' }, //course
      { path: '/student', component: '../pages/member/student/index' }, //student
      {component: '../pages/404.js'}
    ],
  },
  {
    component: './404.js', wrappers: ['@/pages/index']
  },
];
