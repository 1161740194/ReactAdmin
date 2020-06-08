import React from 'react'
import { Form, Input } from 'antd'
import debounce from '../../utils/debounce'
const FromItem = Form.Item
export default class UpdateForm extends React.Component {
    constructor() {
        super()
        // input防抖
        this.handleAttrs = debounce(this.handleAttr,666,false)
    }
    state = {
        testVal: ''
    }
    // 向父组件传递的参数
    handleAttr = (e) => {
        this.setState({
            testVal: e
        })
       this.props.handleValue(this.state.testVal)
        
    }
    render() {
        return (
            <Form>
                <FromItem >
                    <Input  onChange={(e) => this.handleAttrs(e.target.value)} placeholder="请输入分类名称" />
                </FromItem>

            </Form>
        )
    }
}

