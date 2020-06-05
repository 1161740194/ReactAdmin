import React from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd';
import menuList from '../../config/menuConfig'
import './index.less'
import logo from '../../assets/images/logo.png'
/*
    左侧导航左键
*/
const { SubMenu } = Menu;
const MenuItem = Menu.Item
export default class LeftNav extends React.Component {
    /*
        根据menu的数据数组生成对应的标签数组
        使用map,递归进行渲染
        
    */
    getMenuNodes = (menuList) => {
        const path = this.props.path
        return menuList.map(item => {
           if (!item.children) {
                return (
                    <MenuItem key={item.key} icon={<i className={item.icon} style={{marginRight: '12px', fontSize: '12px'}}></i>}>
                            <Link to={item.key}>
                               
                                <span>{item.title}</span>
                            </Link>
                     </MenuItem>
                )
           } else {
            //    查找一个与当前请求路径匹配的子路由
              const cItem = item.children.find(cItem => cItem.key === path)
            //    如果存在需要展开
            if (cItem) {
                this.openkey = item.key
            }
               return (
                <SubMenu key={item.key} title={item.title} icon={ <i className={item.icon} style={{marginRight: '12px', fontSize: '12px'}}></i>}>
                    {this.getMenuNodes(item.children)}
                </SubMenu>
               )
           }
        })
    }
    // 在第一次render（）之前执行
    componentWillMount() {
        this.menuNodes = this.getMenuNodes(menuList)
    }
    render() {
        const path = this.props.path
        const openkey = this.openkey
        return (
            <div className="left-nav">
                <Link to="/home" className="left-nav-header">
                    <img src={logo} alt="logo" />
                    <h1>硅谷后台</h1>
                </Link>
                <div style={{ width: '100%' }}>
                    <Menu
                        selectedKeys={[path]}
                        mode="inline"
                        theme="dark"
                        defaultOpenKeys = {[openkey]}
                    >
                        {
                           this.menuNodes 
                        }
                    </Menu>
                </div>
            </div>
        )
    }
}