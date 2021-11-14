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
    Radio,
    Select,
    Space
} from 'antd';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from '../../../reducers/order'
// import { shipping_user_actions } from '../../../reducers/shipping_platform/user'
import { actions as actions_user_order } from '../../../reducers/shipping_platform/user/order'

// import MyTable from './table'
// import Filter from './filter'

import MyTable from '../../../components/Table'
import dashboard_page_asset from '../../../asset/dashboard_page'
import Demo_chart from '../../../components/Chart'
import Demo_pie from '../../../components/Pie'
import Demo_dounut from '../../../components/Donut'
import Demo_map from '../../../components/Map'
import Project from './project'
import Order from './order'
import Finance from './finance'

import { Skeleton } from 'antd';

import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import NotFound from '../../../components/notFound'


const { Search } = Input;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { Option } = Select;
const InputGroup = Input.Group;

function callback(key) {
    console.log(key);
}

const mapRouterToComponet = (router) => {
    switch (router) {
        case 'project_summary':
            return (<Project />);
        case 'order_summary':
            return (<Order />)
        case 'finance_analyze':
            return (<Finance />);
        default:
            return undefined
    }
}


class dashboard extends Component {
    constructor(props) {
        super(props);
    }

    handle_search(value) {
        this.child.handle_search(value);
    }

    handle_clear_search() {
        this.child.handle_clear_search();
    }

    onRef = (ref) => {
        this.child = ref
    }


    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.collapsed != nextProps.collapsed) return false
        if (this.props.header_hidden != nextProps.header_hidden) return false
        return true
    }

    //加载页面后回到顶部
    componentDidMount() {
        window.scrollTo(0, 0)
        this.props.onRef(this)

    }

    render() {
        const { url } = this.props.match;
        return (
            <Switch>
                {dashboard_page_asset.map(item =>
                    <Route exact key={item.router} path={`${url}/${item.router}`}
                        render={(props) => (
                            mapRouterToComponet(item.router)
                        )}
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
)(dashboard)