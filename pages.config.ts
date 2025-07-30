import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages';

export default defineUniPages({
  pages: [],
  globalStyle: {
    navigationBarTextStyle: 'black',
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTitleText: 'uni-app',
  },
  easycom: {
    autoscan: true,
    custom: {
      '^wd-(.*)': 'wot-design-uni/components/wd-$1/wd-$1.vue',
    },
  },
  tabBar: {
    color: '#816f49',
    selectedColor: '#942e21',
    backgroundColor: '#fff',
    list: [
      {
        pagePath: 'pages/home/index',
        iconPath: './static/tab-icons/home.png',
        selectedIconPath: './static/tab-icons/home-active.png',
        text: '首页',
      },
      {
        pagePath: 'pages/my/index',
        iconPath: './static/tab-icons/my.png',
        selectedIconPath: './static/tab-icons/my-active.png',
        text: '我的',
      },
    ],
  },
});
