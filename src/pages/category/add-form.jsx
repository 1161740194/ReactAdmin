import React from 'react'
import { Form, Select, Input } from 'antd'
import debounce from '../../utils/debounce'
const FromItem = Form.Item
const SelectOption = Select.Option
export default class AddForm extends React.Component {
    constructor() {
        super()
        // input防抖
        this.handleAttrs = debounce(this.handleInput, 100, false)
        this.handleId = debounce(this.handleSelect, 100, false)
        
    }
    state = {
        testVal: '',
        parentId: '',
    }
    // 向父组件传递的name值
    handleInput = (e) => {
        this.setState({
            testVal: e
        })
        this.props.categoryName(this.state.testVal)
       

    }
    // 向父组件传递的ID值
    handleSelect = (data) => {
        this.setState({
            parentId: data
        })
        this.props.parentId(this.state.parentId)
    }
    
    render() {
        // 接受父组件传递的数据
        const data = this.props.data.categories
        const parentId= this.props.data.parentId
        return (
            <Form>
                <FromItem >
                    {/* 把对应的id传递给函数 */}
                    <Select defaultValue={parentId} onChange={(data) => this.handleId(data) }>
                    <SelectOption value={'0'}>一级分类</SelectOption>
                        {/* 通过父组件传递过来的数据，动态渲染option */}
                        {data.map(item => { 
                                return <SelectOption
                                key={item._id}
                                value={item._id}>
                                {item.name}</SelectOption>
                        })}             
                    </Select>
                </FromItem>
                <FromItem >
                    {/* 把对应的value传递给函数 */}
                    <Input onChange={(e) => this.handleAttrs(e.target.value)} placeholder="请输入分类名称" />
                </FromItem>

            </Form>
        )
    }
}

