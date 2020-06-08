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
## 1、后台应用
启动应用:mongodb服务
使用postman调试接口（根据接口文档）：
    访问测试接口：post请求参数在body中设置
    保存测试接口
    导出/导入所有测试接口

## 2、编写ajax代码

### 1). ajax请求函数模块
    封装axios + promise
    函数的返回值是promise对象 ===> 后面用上 async awiat
    自己创建promise
        1、内部统一处理异步请求异常：外部调用不再使用try...catch来处理请求错误
        2、异步返回是响应数据（而不是响应对象）：外部调用异步得到的就直接是数据了（response ---> response.data）

### 2). 接口请求函数模块：api/index.js
    根据接口文档编写
    接口请求函数使用ajax(),返回值promise对象

### 3). 解决ajax跨域请求问题
    办法：配置代理 ==> 只能解决开发环境
    编码：package.json
    ```
    "proxy": "http://localhost:5000"
    ```
### 4). async和await理解
  a、  简化promise对象的使用： 不再使用then() 来指定成功/失败的回调函数
  b、  再返回promsie的表达式左侧写await  
  c、  await所在函数最近的函数左侧写async 

## 3、实现登陆（包含自动登录）
login.jsx

### 1).调用登陆接口请求 
### 2).如果失败显示错误信息
### 3).如果成功了：
    保存user到local内中中去
    跳转到admin
### 4).如果内存中有user值，自动跳转到admin页面
    在amdmin/index读取local里面的user到内存中保存
    admin.jsx判断有没有user（_id）,自动跳转
    localstorageUtils.js包含使用localstorage来保存user相关操作的工具模块
    使用第三方库store, 简化代码，兼容不同浏览器
    memoryUtils.js用来在内存中存储数据

## 4、搭建admin整体页面结构
### 1）. 整体布局使用  antd中的layout组件
### 2）. 拆分组件
    leftNav: 左侧组件
    Header: 右侧头部
### 3）. 子路由
    定义路由组件
    注册路由组件

## 5、 LeftNav组件

### 1）. 使用antd的组件
    menu / Item / SubMenu

### 2）. 使用react-router
    whithRouter(): 包装非路由组件，给其传入： history/location/mtach属性
    hsitory: push()/replace()/goBack()
    location: pathname属性
    match: params属性

### 3）. componentWillMount 与 compoentDidMount比较
     componentWillMount: 在第一次render() 前调用一次，为第一次reader()准备数据同步
     compoentDidMount: 在第一次render() 前调用一次，启用异步任务，后面异步更新状态

### 4). 根据动态生出Item和SubItem的数组
    map() + 递归：多级菜单列表
    reduce() + 递归：多级菜单列表

### 5). 两个问题
    刷新时如何选中对应的菜单项？
        selectedkey是当前请求的path
    刷新子路径时，自动打开子菜单列表？
        openkey

# day03
## 1、退出登录
    使用antd的modal组件提示
    清楚local里面和本地内存数据

## 2、jsonp解决ajax跨域的原理
    1). jsonp只能解决GET类型的ajax请求跨域问题
    2). jsonp请求不是ajax请求，而是一般的get请求
    3). 基本原理
        浏览器端:
            动态生成<script>来请求后台接口(src就是接口的url)
            定义好用于接收响应数据的函数，并将函数名通过请求参数提交给后台(如:callback=fn)
        服务器端:
            接收到请求处理产生结果数据后，返回一个函数调用的js代码，并将结果数据作为实参传入函数调用
        浏览器端:
             收到响应自动执行函数调用的js代码，也就执行了提前定义好的回调函数，并得到了需要的结果数据

## 3、页面显示对应路由的title
    1). 使用withRouter()转换成路由组件
    2). 获取当前路由地址
    3). 根据当前路由地址和menulist进行查找使用map查找，再使用find进行二次查找


# day04
## 创建添加组件和更新组件
## 子组件向父组件传值,父组件过去对应的id和name值
    1、发生改变时定义一个函数
    2、通过双向数据流方法改变this.state.value的值。
    3、在props挂载一个函数方法，并把同步更新this.state.value 传递给父组件
    4、父组件通过props挂载的函数获取相应的值通过函数方式
    5、注：input和select给一个防抖操作，防止传递时值不对应