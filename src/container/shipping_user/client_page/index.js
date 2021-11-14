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
    Skeleton,
} from 'antd';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from '../../../reducers/order'
import { actions as actions_user_order } from '../../../reducers/shipping_platform/user/order'
// import { shipping_user_actions } from '../../../reducers/shipping_platform/user'

// import MyTable from './table'
import MyTable from '../../../components/Table'
import mapNameToComponent from '../../../components'
import client_page_asset from '../../../asset/client_page'
// import Filter from './filter'


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


class Client extends Component {
    constructor(props) {
        super(props);
    }

    fetch_data(value) {
        this.child.fetch_data({ ...this.child.state, searching_string: value });
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
        // console.log(url)
        // console.log(this.props.refs)
        return (
            <Switch>
                {client_page_asset.map(item =>
                    <Route exact key={item.router} path={`${url}/${item.router}`}
                        render={(props) => {
                            // let { api_url, filter_content, row_key, column_total_width, page_name, table_content, layout_button, onRef } = props
                            props = { ...item.component.prop, onRef: this.onRef }
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
        // reset_order_result: bindActionCreators(actions_user_order.reset_order_result, dispatch),
        //   getAllorder : bindActionCreators(actions.get_all_order,dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Client)
