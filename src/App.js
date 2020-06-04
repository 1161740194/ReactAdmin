import React from 'react'
import { BrowserRouter as Router, Route, Switch  } from 'react-router-dom'
import Login from './pages/login/login'
import Admin from './pages/admin/admin'
/* 
    应用的根组件
*/

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch> {/* 只匹配其中一个*/}
                <Route path='/login' component={ Login }></Route>
                <Route path='/' component={ Admin }></Route>
                </Switch>
            </Router>
        )
    }
} 