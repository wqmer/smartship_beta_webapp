import React, { Component, PropTypes } from 'react'
import { Tabs, List, Avatar, Pagination, Spin, Button } from 'antd';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// import { actions } from '../../../reducers/order'
import { actions as actions_user_order } from '../../../reducers/shipping_platform/user/order'
import Table from './table'
import xlsx from 'xlsx'
import GenerateSheet from './generateSheet'


const { TabPane } = Tabs;
class order extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        window.scrollTo(0, 0)
    }
    componentWillUnmount() {
        this.props.reset_order_result()
    }
    render() {
        return (
            <div>
                <Spin spinning={this.props.isFetching}  > <Table /></Spin>
            </div>
        )
    }
}



function mapStateToProps(state) {
    // console.log(state)
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
)(order)

