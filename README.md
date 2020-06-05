# day01
## 1、项目开发准备
### 1）. 描述项目
### 2）. 技术选型
### 3）. API接口文档/接口文档/测试接口

## 2、启动项目开发
### 1）. 使用react脚手架创建项目
```
create-react-app project-name
```
### 2）. 开发环境运行
```
npm start

```
### 3）. 生产环境打包运行
```
 npm run build
 serve build
```

## 3、git管理项目
### 1）. 创建远程仓库
### 2）. 创建本地仓库
```
    a. 配置.gitignore
    b. git init
    c. git add .
    d. git commit -m "init"
```
### 3）. 将本地仓库推送到远程仓库
```
git remote add origin url

git push origin master
```
### 4）. 在本地创建dev分支，并推送到git
```
git checkout -b dev

git push origin dev
```
### 5）. 如果本地有修改
```
git add .

git commit -m "xxx"

git push origin dev
```
### 6）. 克隆仓库
```
git clone url

git checkout -b dev origin/dev

git pull origin dev
```
### 7）. 如果远程修改
```
git pull origin dev
```

## 4. 创建项目的基本结构
api: ajax请求的模块
commponents: 非路由组件
pages: 路由组件
App.js: 应用的根组件
index.js: 入门js

## 5. 引入antd

下载antd的包，按需打包：只打包impot引入的js/css

### 下载包工具

### config-overrides.js
```
const {
    override,
    fixBabelImports,
    addLessLoader
} = require('customize-cra');
module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        lessOptions: {
            javascriptEnabled: true,
            modifyVars: {
                '@primary-color': '#1DA57A'
            },
        },
    })
);
```
### package.json
```
"scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-scripts eject"
  },
```

### 自定义主题

config-overrides.js

### 使用antd组件

根据antd的文档编写

## 6. 引入路由
### 下载包
```
react-router-dom
```
### 拆分应用路由
Login: 登陆
Admin: 后台管理界面

### 注册路由
```
 BrowserRouter /  Router, 
 <Router>
    <Switch>
        <Route>
```





## 7. Login静态组件
自定义一部分样式
使用antd的组件实现表单页面
Form / Form.Item
Input
Icon
Button

## 8. 收集数据和表单的前台验证 
使用antd内置方法rules进行格式验证
使用antd内置方法onFinish验证通过并提交表单对象
使用antd内置方法onFinishFailed验证失败返回结果


# day02
