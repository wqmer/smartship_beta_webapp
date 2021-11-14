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
// import { actions } from '../../../reducers/order'
// import { shipping_user_actions } from '../../../reducers/shipping_platform/user'
// import { actions as actions_user_order } from '../../../reducers/shipping_platform/user/order'

// import MyTable from './table'
// import Filter from './filter'

// import MyTable from '../../../components/Table'



import Mytable from '../Table'
import Statistic from '../Statistic'


const { Search } = Input;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { Option } = Select;
const InputGroup = Input.Group;

const width_colum = {
    long: 200,
    medium: 150,
    short: 150
}

function callback(key) {
    console.log(key);
}

class PorcessingPage extends Component {
    constructor(props) {
        super(props);
        this.eventSource = new EventSource("http://localhost:8081/api/forwarder/event");
    }

    state = {
        statistic_content: this.props.statistic_content
        // { title: "当前生成中", value: 198, unit: '条' },
    }

    //父组件添加ref方法，然后在子组件添加props onRef={this.onRef} ，即可调用子方法
    onRef = (ref) => {
        this.child = ref
    }

    triggerTableFetch() {
        this.child.fetch_data()
    }

    setStatisticValue(value) {
        let { statistic_content } = this.props
        let updateContent = statistic_content.map(item => {
            if (item.title == "当前生成中") item.value = value
            return item
        })
        // console.log(updateContent)
        this.setState({ statistic_content: updateContent })
    }

    shouldComponentUpdate(nextProps, nextState) {
        // if (this.props.collapsed != nextProps.collapsed) return false
        // if (this.props.header_hidden != nextProps.header_hidden) return false
        return true
    }

    //加载页面后回到顶部
    componentDidMount() {
        // setTimeout(() => this.triggerTableFetch(), 5000)
        this.eventSource.onmessage = e => {
            const currentOrderNumber = JSON.parse(e.data).processingOrder
            if (currentOrderNumber > 0) this.triggerTableFetch()
            this.setStatisticValue(currentOrderNumber)
        }
        window.scrollTo(0, 0)
    }

    componentWillUnmount() {
        this.eventSource.close()
        window.scrollTo(0, 0)
    }

    render() {

        // console.log(url)
        // console.log(this.props.refs)
        return (
            <div>
                <Statistic statistic_content={this.state.statistic_content} />
                <Mytable
                    {...this.props}
                    showAlert={false}
                    checkBox={false}
                    onRef={this.onRef} />
            </div>

        )
    }
}

export default PorcessingPage