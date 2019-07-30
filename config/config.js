export default {
  singular: true,
    plugins: [
        ['umi-plugin-react', {
            //umi-plugin-react插件配置 详情-》https://umijs.org/zh/plugin/umi-plugin-react.html#%E5%AE%89%E8%A3%85
            antd: true,
            dva: true,
            locale: {
              enable: true,
            },
        }],
    ],
  routes: [{
    path: '/',
    component: '../layout',
    routes: [
      {
        path: '/puzzlecards',
        component: './puzzlecards'
      },
      {
        path: '/',
        component: 'Helloworld',
      },
      {
        path: '/helloworld',
        component: 'Helloworld'
      },
      {
        path: '/dashboard',
        routes: [
          { path: '/dashboard/analysis', component: 'Dashboard/Analysis' },
          { path: '/dashboard/monitor', component: 'Dashboard/Monitor' },
          { path: '/dashboard/workplace', component: 'Dashboard/Workplace' },
        ]
      },
    ],
  }],
    proxy: {
       '/dev': {
         target: 'https://08ad1pao69.execute-api.us-east-1.amazonaws.com',
         changeOrigin: true,
       },
      },
};