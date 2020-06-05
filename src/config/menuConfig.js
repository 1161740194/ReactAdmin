const menuList = [
{
    title: '首页',
    key: '/home',
    icon: 'iconfont iconHome '
},
{
    title: '商品',
    key: '/products',
    icon: 'iconfont iconshangpin',
    children: [
        {
            title: '品类管理',
            key: '/category',
            icon: 'iconfont iconleimupinleifenleileibie'
        },
        {
            title: '商品管理',
            key: '/product',
            icon: 'iconfont iconguanli'
        }
    ]
},
{
    title: '用户管理',
    key: '/user',
    icon: 'iconfont iconuser'
},
{
    title: '角色管理',
    key: '/role',
    icon: 'iconfont iconjiaoseguanli'
},
{
    title: '图形图表',
    key: '/charts',
    icon: 'iconfont icontuxing',
    children: [
        {
            title: '柱状图',
            key: '/charts/bar',
            icon: 'iconfont iconzhuxingtu'
        },
        {
            title: '折线图',
            key: '/charts/line',
            icon: 'iconfont icontubiaozhexiantu'
        },
        {
            title: '饼状图',
            key: '/charts/pie',
            icon: 'iconfont icontubiao08'
        }
    ]
},
]

export default menuList