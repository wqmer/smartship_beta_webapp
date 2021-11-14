import React, { Component, PropTypes } from 'react'
import {
    Tabs,
    Divider,
    Input,
    BackTop,
    List,
    Avatar,
    Pagination,
    Spin,
    Button,
    Badge,
    DatePicker,
    Select,
} from 'antd';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from '../../../reducers/order'
// import { shipping_user_actions } from '../../../reducers/shipping_platform/user'
import { actions as actions_user_order } from '../../../reducers/shipping_platform/user/order'
import mapNameToComponent from '../../../components'
import Description from '../../../components/Description'
import beta_tool_page from '../../../asset/beta_tool_page'
import NotFound from '../../../components/notFound'


const { Search } = Input;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { Option } = Select;
const InputGroup = Input.Group;


class tool extends Component {
    constructor(props) {
        super(props);
    }

    // onRef = (ref) => {
    //     this.child = ref
    // }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.collapsed != nextProps.collapsed) return false
        if (this.props.header_hidden != nextProps.header_hidden) return false
        return true
    }

    //加载页面后回到顶部
    componentDidMount() {
        window.scrollTo(0, 0)
        // this.props.onRef(this)
    }

    componentWillUnmount(){
        window.scrollTo(0, 0)
    }

    render() {
        const { url } = this.props.match;
        // console.log(url)
        // console.log(this.props.refs)
        return (
            <Switch>
                {beta_tool_page(this).map(item =>
                    <Route exact key={item.router} path={`${url}/${item.router}`}
                        render={(props) => {                        
                            props = { ...this.props, ...item.component.prop, onRef: this.onRef }
                            // props.clear_search_bar =  this.props.clear_search_bar
                            return mapNameToComponent(item.component.type, props)
                        }}
                    />
                )}
 
                <Route component={NotFound} />
            </Switch>
        )
    }
}



function mapStateToProps(state) {
    return {
        //    order:state.user.order,
        isFetching: state.globalState.isFetching
    }
}

function mapDispatchToProps(dispatch) {

    return {
        reset_order_result: bindActionCreators(actions_user_order.reset_order_result, dispatch),
        //   getAllorder : bindActionCreators(actions.get_all_order,dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(tool)