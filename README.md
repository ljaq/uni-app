本项目是一个基于 [uni-app](https://uniapp.dcloud.io/) + [Vue 3](https://vuejs.org/) + [Pinia](https://pinia.vuejs.org/) 的多端应用

## 目录结构

```
.
├── src/                # 源码目录
│   ├── api/            # API 请求相关
│   ├── components/     # 业务组件
│   ├── constant/       # 常量配置
│   ├── hooks/          # 自定义 hooks
│   ├── layouts/        # 页面布局
│   ├── pages/          # 页面文件
│   ├── static/         # 静态资源
│   ├── stores/         # 状态管理
│   ├── types/          # 类型定义
│   ├── utils/          # 工具函数
│   ├── App.vue         # 应用入口
│   ├── main.ts         # 入口文件
│   ├── manifest.json   # 应用配置
│   ├── pages.json      # 页面配置
│   └── uni.scss        # 全局样式
├── package.json        # 项目依赖及脚本
├── vite.config.ts      # Vite 配置
├── tsconfig.json       # TypeScript 配置
├── .env.*              # 环境变量
├── index.html          # H5 入口
└── ...                 # 其它配置文件
```

## 技术栈

- **框架**：Vue 3、uni-app
- **状态管理**：Pinia
- **UI 组件**：Wot Design Uni
- **构建工具**：Vite
- **类型系统**：TypeScript

## 快速开始

1. 安装依赖

   ```sh
   yarn install
   ```

2. 运行开发环境（以微信小程序为例）

   ```sh
   yarn dev:mp-weixin
   ```

   更多命令见 package.json。

3. 构建生产环境

   ```sh
   yarn build:mp-weixin:prod
   ```

## 相关配置

- 环境变量配置见 .env.development 和 .env.production
- Vite 配置见 vite.config.ts
