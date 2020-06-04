import React from 'react'
import { Form, Input, Button  } from 'antd'
import './login.less'
import logo from './images/logo.png'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

/* 不能写在import之前 */
const FormItem = Form.Item
/* 登陆路由界面*/
export default class Login extends React.Component {
    /* 提交表单对象 */
    onFinish = (values) => {
        console.log(values)
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
            }  else {
                resolve() // 验证通过
            }
        })

        return promise
    }
    render() {
        return <div className="login">
            <header className="login-header">
                <img src={ logo } alt="logo"></img>
                <h1>React项目：后台管理系统</h1>
            </header>
            <section className="login-content">
                <h2>用户登录</h2>
                <Form onFinish={(values) => {this.onFinish(values)}} onFinishFailed={ (err) => this.onFinishFailed(err) }>
                    < FormItem name="username" rules={[
                        // 声明式验证
                        { required: true, whitespace: true, message: '请输入用户名！'},
                        { min: 4, message: '用户名大于4位！'},
                        { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文，数字或下划线组成'},
                        ]}>
                        <Input  size="large" placeholder="用户名" prefix={<UserOutlined />} />
                    </FormItem>
                    < FormItem name="password" rules={[
                        { validator: this.validatorPwd}
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