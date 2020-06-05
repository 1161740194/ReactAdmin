import React from 'react'
import { Redirect } from 'react-router-dom'
import { Form, Input, Button, message } from 'antd'
import { reqLogin } from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import storeUtils from '../../utils/StorageUtils'

import './login.less'
import logo from '../../assets/images/logo.png'
import { UserOutlined, LockOutlined } from '@ant-design/icons'


/* 不能写在import之前 */
const FormItem = Form.Item
/* 登陆路由界面*/
export default class Login extends React.Component {
    /* 提交表单对象 */
    onFinish = async (values) => {
        // 请求登陆 console.log(values)
        const { username, password } = values
        const result = await reqLogin(username, password)
        // const result = response.data
        if (result.status === 0) {
            // 登陆成功提示
            message.success('登陆成功')
            // 保存user
            const user = result.data
            memoryUtils.user = user // 保存到内存中
            storeUtils.saveUser(user) // 保存到local中去
            // 登陆成功跳转
            this.props.history.replace('/')
        } else {
            // 登陆失败提示
            message.error(result.msg)
        }
    };
    onFinishFailed = (err) => {
        console.log(err.errorFields[0].errors[0])
    }
    /* 对密码进行自定义验证 */
    validatorPwd = (rule, value) => {
        const promise = new Promise((resolve, reject) => {
            if (!value) {
                reject('请输入密码')
            } else if (value.length < 4) {
                reject('密码长度不能小于4位！')
            } else if (value.length > 12) {
                reject('密码长度不能大于12位！')
            } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
                reject('密码必须是英文，数字或下划线组成')
            } else {
                resolve() // 验证通过
            }
        })

        return promise
    }
    render() {
        // 如果用户已经登陆自动调转到管理界面
        const user = memoryUtils.user
        if (user && user._id) {
            return <Redirect to="/" />
        }

        return <div className="login">
            <header className="login-header">
                <img src={logo} alt="logo"></img>
                <h1>React项目：后台管理系统</h1>
            </header>
            <section className="login-content">
                <h2>用户登录</h2>
                <Form onFinish={(values) => { this.onFinish(values) }} onFinishFailed={(err) => this.onFinishFailed(err)}>
                    < FormItem name="username" rules={[
                        // 声明式验证
                        { required: true, whitespace: true, message: '请输入用户名！' },
                        { min: 4, message: '用户名大于4位！' },
                        { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文，数字或下划线组成' },
                    ]}>
                        <Input size="large" placeholder="用户名" prefix={<UserOutlined />} />
                    </FormItem>
                    < FormItem name="password" rules={[
                        { validator: this.validatorPwd }
                    ]} >
                        <Input type="password" size="large" placeholder="密码" prefix={<LockOutlined />} />
                    </FormItem>
                    < FormItem>
                        <Button type="primary" htmlType="submit">登陆</Button>
                    </FormItem>
                </Form>
            </section>
        </div>
    }
}
/*
1、前台表单验证
2、收集表单输入数据


*/