import React from 'react'
import { Card, Table, Button, message, Modal } from 'antd';
import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { reqCategories, reqAddCategories, reqUpdateCategories } from '../../api'
import UpdateForm from './update-form'
import AddForm from './add-form'
import LinkButton from '../../components/link-button'
/*
商品分类
*/
export default class Category extends React.Component {
    state = {
        // 一级分类列表
        categories: [],
        // 二级分类列表
        subCategories: [],
        loading: false, // 是否正在获取数据
        parentId: '0',
        childId: '0',
        parentName: '',
        categoryName: ''
    }
    // 获取一级分类数据
    getCategory = async () => {
        // 再发请求前显示loading
        this.setState({
            loading: true
        })
        const { parentId } = this.state
        const result = await reqCategories(parentId)
        this.setState({
            loading: false
        })
        if (result.status === 0) {
            // 取出分类数组（可能是一级，或者二级）
            const categories = result.data
            if (parentId === '0') {
                this.setState({ categories })
            } else {
                this.setState({
                    subCategories: categories
                })
            }

        } else {
            message.error('获取分类数据失败')
        }

    }
    // 获取二级分类数据
    showSubCategories = async (category) => {
        
        this.setState({
            parentId: category._id,
            parentName: category.name
        }, () => {
            this.getCategory()
        })
        
        
    }
    // 返回一级菜单
    backCategory = () => {
        // 更新为显示一级状态
        this.setState({
            // 父类ID
            parentId: '0',
            // 父级名称
            parentName: '',
            // 子列表
            subCategories: [],
            showStatus: 0,
            confirmLoading: false
        })
    }
    // 初始化columns数据
    initColumns = () => {
        this.columns = [
            {
                title: '分类名称',
                dataIndex: 'name' // 显示对应的属性名
            },
            {
                title: '操作',
                render: (category) => ( // 返回需要显示的标签
                    <span>
                        <LinkButton onClick={() => {this.showUpdateCategory(category) ; this.getId(category)}}>修改分类</LinkButton>
                        {this.state.parentId === '0' ? <LinkButton
                            style={{ marginLeft: "15px" }}
                            onClick={() => this.showSubCategories(category)}>
                            查看子分类
                        </LinkButton> : null}

                    </span>
                ),
                width: "30%"
            }
        ];
    }
    // 是否显示添加
    showAddCategory = () => {
        this.setState({
            showStatus: 1,

        });
        
      };
    // 加添分类
    addCategory = async () => {
        const { childId }= this.state
        const {categoryName} = this.state
        const result = await reqAddCategories(childId, categoryName)
        this.getCategory()
        if (result.status === 0) {
            message.success('修改成功')
        }
        this.handleCancel()
    }
    // 获取子组件传来的name
    handleGet = (val) => {
        this.setState({categoryName: val});
        
    }
    // 获取子组件传来的id
    getParentId = (val) => {
        this.setState({
            childId: val
        })
    }
    // 是否显示更新分类
    showUpdateCategory = (category) => {
        this.category = category
        // 更新状态
        this.setState({
            showStatus: 2,

        });
    }
    // 更新分类

    updateCategory = async () => {
        const categoryName = this.state.categoryName
        const categoryId = this.category._id
        const result = await reqUpdateCategories({categoryId, categoryName})
        this.getCategory()
        if (result.status === 0) {
            message.success('修改成功')
        }
        this.handleCancel()
    }
    // 关闭添加
      handleCancel = () => {
        this.setState({
            showStatus: 0,
        });
      };
    // 为第一次render() 准备数据
    componentWillMount() {
        this.initColumns()
    }
    // 发送ajax请求
    componentDidMount() {
        this.getCategory()
    }
    // 页面渲染
    render() {
        const { categories, loading, subCategories, parentId, parentName, showStatus, confirmLoading } = this.state
        const title = parentName === '' ? '一级分类列表' : (
            <span>
                <LinkButton onClick={() => this.backCategory()}>一级分类列表</LinkButton>
                <ArrowRightOutlined style={{ margin: '0 15px' }} />
                <       span>{parentName}</span>
            </span>
        )
        const extra = (
            <div>
                <Button type="primary" onClick={this.showAddCategory}>
                    <PlusOutlined />
                    添加
                </Button>
                <Modal
                    title="添加分类"
                    visible={showStatus === 1 }
                    onOk={this.addCategory}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                >       
                        {/* 接受自组件传递的参数 */}
                        <AddForm categoryName={this.handleGet.bind(this)} 
                                parentId= {this.getParentId.bind(this)} 
                                data={{categories, parentId}}/>
                </Modal>
                <Modal
                    title="添加分类"
                    visible={showStatus === 2 }
                    onOk={this.updateCategory}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                >
                        <UpdateForm handleValue={this.handleGet.bind(this)} />
                </Modal>
            </div>
        )
        return (
            <div className="category">
                <Card
                    className="category-card" title={title} extra={extra} style={{ width: '100%' }}>
                    <Table
                        rowKey="_id"
                        loading={loading}
                        dataSource={parentId === '0' ? categories : subCategories}
                        columns={this.columns}
                        bordered={true}
                        pagination={{ defaultPageSize: 5, showQuickJumper: true }} />;
                </Card>
            </div>
        )
    }
}