import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Tabs } from 'antd';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import setting_page_asset from '../../../asset/setting_page'
import mapNameToComponent from '../../../components'
import NotFound from '../../../components/notFound'
const { TabPane } = Tabs;

const extractStrFromUrl = (str) => {
    // var str = this.props.history.location.pathname.substring('/user/'.length) || '/' //  /seller/order/new   --->  order/new 
    var pathArray = str.split('/').filter(i => i != '')
    var Parent = pathArray.shift()
    var LastChild = pathArray[pathArray.length - 1]
    return {
        Parent,  //order/new   --> order
        Children: pathArray, //order/new   --> new 
        // 设置为0 表示如果有大于1个子类，都不继续向下映射 暂时只允许一个子类出现在面包屑中，防止对应边栏key和面包屑等不能对应问题。
        LastChildOfUrl: '/' + LastChild
    }
}


class SettingPage extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        activeKey: extractStrFromUrl(this.props.history.location.pathname.substring('/user/'.length) || '/').Children[0]
    }

    onRef = (ref) => {
        this.child = ref
    }

    triggerTableFetch() {
        this.child.fetch_data()
    }


    render() {
        const { login, register, isFetching } = this.props;
        const { url } = this.props.match;

        // console.log('is fecthing ? ' + isFetching)
        return (
            <div >
                <Tabs
                    // tabBarStyle = {{ borderRadius: "3px", boxShadow: 'rgb(217, 217, 217) 1px 1px 7px 0px', padding: 16, paddingLeft: 32, paddingRight: 32, background: '#ffffff', }}
                    // type="card"
                    // animated={true}

                    activeKey={this.state.activeKey}
                    size='large'
                    style={{ borderRadius: "3px", boxShadow: 'rgb(217, 217, 217) 1px 1px 7px 0px', padding: 32, paddingTop: 16, background: '#fafafa', }}
                    onChange={(key) => {
                        this.setState({ activeKey: key })
                        this.props.history.push(`/user/setting/${key}`)
                    }}
                // defaultActiveKey="ledger"
                // onChange={(key) => <Link to={`/user${parent.url}${child.url}`}><span>{child.name}</span></Link>}
                // onTabClick={(key) => {
                //     if (key == "ledger" || key == "address") this.triggerTableFetch()
                //     console.log(key)
                // }}
                >
                    {setting_page_asset(this).map(item =>
                        <TabPane
                            style={{ minHeight: 700, }}
                            tab={<span>{item.title}</span>}
                            key={item.key}
                        >
                            <Switch>
                                <Route exact key={item.key} path={`${url}/${item.router}`}
                                    render={(props) => {
                                        props = { ...this.props, ...item.component.prop, onRef: this.onRef }
                                        // props.clear_search_bar =  this.props.clear_search_bar
                                        return mapNameToComponent(item.component.type, props)
                                    }}
                                />
                                <Route component={NotFound} />
                            </Switch>
                        </TabPane>)
                    }
                </Tabs>
            </div>
        )
    }
    componentDidMount() {
        // this.props.auth()
    }
}

function mapStateToProps(state) {
    return {
        status_code: state.globalState.status_code,
        isFetching: state.globalState.isFetching,
        user_info: state.shipping_platform_user.account.user_info
    }
}

function mapDispatchToProps(dispatch) {
    return {
        // login: bindActionCreators(user_account_actions.get_login, dispatch),
        // auth: bindActionCreators(user_account_actions.user_auth, dispatch),
        // register: bindActionCreators(IndexActions.get_register, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingPage)