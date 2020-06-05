// 入口js
import React from 'react'
import ReactDom from 'react-dom'
import storeUtils from './utils/StorageUtils'
import memoryUtils from './utils/memoryUtils'
import App from './App'

// 读取local中保存的user,保存到uer中
 const user = storeUtils.getUser()
 memoryUtils.user = user
// 将APP组件渲染到index页面的div上
ReactDom.render(
    <App/>,
    document.getElementById('root')
)