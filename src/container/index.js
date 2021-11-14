import React, { Component } from 'react';
import 'ant-design-pro/dist/ant-design-pro.css'
import {
    message,
    BackTop,
    notification,
    Tabs,
    PageHeader,
    Input,
    Dropdown,
    Button,
    Avatar,
    Layout,
    Menu,
    Breadcrumb,
    Badge,
} from 'antd';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import ComopnentLogin from './shipping_user/login_page';
import Component_ship_user from './shipping_user/homePage';
import Component_test_label from './shipping_user/components/shipping_label';
import NotFound from '../components/notFound'
import PrivateRoute from '../router/PrivateRoute';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions as user_account_actions } from '../reducers/shipping_platform/user'



export const history = createHistory();

class AppIndex extends Component {
    constructor(props) {
        super(props);
    }

    state = {}

    static getDerivedStateFromProps = (props, state) => {
        if (props.message && props.status_code === 0) {
            message.success(props.message)
        }
        if (props.message && props.status_code === 1) {
            let config = {
                message: '远程服务器报错',
                description: props.message,
            }
            notification.error(config)
        }
        return null
    }


    render() {
        return (
            <Router history={history} >
                <div>
                    <Switch>
                        {/* <Route path="/shop" component={ComponentHome} /> */}
                        {/* <Route exact path="/" component={ComponentUser} /> */}
                        {/* <Route exact path="/login" component={ComopnentLogin} /> */}
                        {/* <Route path="/user" component={Component_ship_user} /> */}
                        <Route path="/beta" component={Component_ship_user} />
                        {/* <Route path="/testLabel" component={Component_test_label} /> */}
                        {/* <Route path="/seller" component={ComponentUser} />     */}
                        <Route component={NotFound} />
                        {/* <Route path="/test" component={testDashboard} /> */}
                    </Switch>
                </div>
            </Router>
        )
    }
}

function mapStateToProps(state) {
    return {
        status_code: state.globalState.status_code,
        message: state.globalState.message,
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppIndex)