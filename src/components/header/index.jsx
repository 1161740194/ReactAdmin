import React from 'react'
import { reqWeather } from '../../api'
import menuList from '../../config/menuConfig'
import { withRouter } from 'react-router-dom'
import { formateDate } from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import StorageUtils from '../../utils/StorageUtils'
import LinkButton from '../link-button'
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import './index.less'
/*
    头部
*/
class Header extends React.Component {
    state = {
        currentTime: formateDate(Date.now()),  // 当前时间字符串
        weather: '',
        username: memoryUtils.user.username
    }
    getTime = () => {
        // 每隔一秒获取当前时间，并更新currentTime
        this.intervalId = setInterval(() => {
            const  currentTime = formateDate(Date.now())
            this.setState({ currentTime })
        }, 1000)
    }
    getWeather = async () => {
        // 调用异步请求数据
       const weather = await reqWeather('371200')
       this.setState({weather})
    }

    getTitle = () => {
        // 得到当前请求路径
        const path = this.props.location.pathname
        let title
        menuList.forEach(item => {
            if (item.key === path) { // 如果当前item的ke与path匹配，显示对应的title
                title =  item.title
            } else if (item.children) {
                // 在所有的子item中查找匹配
              const cItem =  item.children.find( cItem => cItem.key === path )
              if (cItem) {
                  title = cItem.title
              }
            }
        })
        return title
        
    }
    logout = () => {
        let that = this
        Modal.confirm({
            title: '确定退出么？',
            icon: <ExclamationCircleOutlined />,
            onOk() {
              // 删除local里面的数据
              StorageUtils.removeUser()
              memoryUtils.user = {}
              // 跳转到login
              that.props.history.replace('/login')
            }
          })
    }
    /* 
        第一次reader()之后执行执行一次
        一般在此执行异步操作： ajax请求/启动定时器
    */
    componentDidMount() {
        // 获取当前时间
        this.getTime()
        // 获取当前天气
        this.getWeather()
    }
    /*
        在当前组件卸载之前调用
    */
    componentWillUnmount() {
        // 清楚定时器
        clearInterval(this.intervalId)
    }
    render() {
        const { currentTime, weather, username } = this.state
        // 得到当前需要显示的title
        const title = this.getTitle()
        return (
            <div className="header">
                <div className="header-top">
                <span>欢迎，{username}</span>
                    <LinkButton onClick={ () => this.logout()} >退出</LinkButton>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">
                        {title}
                    </div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                        <img src="" alt=""/>
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header)