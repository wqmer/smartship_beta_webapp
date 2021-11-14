import React, { useState, useEffect, useRef } from 'react';
import _ from 'lodash';

import ReactDOM from 'react-dom';
import QueueAnim from 'rc-queue-anim';
import 'antd/dist/antd.css';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import {
    Space,
    Tabs,
    Skeleton,
    Input,
    DatePicker,
    Typography,
    Layout,
    message,
    notification,
    Pagination,
    BackTop,
    Spin,
    Badge,
    Menu,
    Dropdown,
    Button,
    Table,
    Divider,
    Select,
} from 'antd';
import { Popconfirm } from 'antd';
import Animate from 'rc-animate';
import { TweenOneGroup } from 'rc-tween-one';
import { Alert } from 'antd';


import { get, post } from '../../util/fetch';
import { actions as actions_user_order } from '../../reducers/shipping_platform/user/order'
import Filter from './filter'
import { handle_error } from '../../util/error'
import format from '../../util/format'
import { SearchOutlined } from '@ant-design/icons';
import ModalAddressForm from '../ModalAddAddress';
// import ModalAddressForm from '../ModalAddAddress';
import Pusher from 'pusher-js';


// import TweenOneGroupBody from '../components/motion/TweenOneGroup'
// import  Message from '../components/message'
// import MyQueueAnim from '../components/motion/QueueAnim'
// import AnimateBody from '../components/motion/AntimateBody'
// const PUSHER_APP_KEY = 'a02e0dd4b8d8317e5b47';
// const PUSHER_APP_CLUSTER = 'us3';
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;
const { Option } = Select;
const { Text } = Typography;
const InputGroup = Input.Group;
const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

function callback(key) {
    console.log(key);
}

const preffix = (
    <SearchOutlined
        style={{
            fontSize: 16,
            opacity: 0.4
        }}
    />
);

const menu = (
    <Menu >
        <Menu.Item key="1">USPS</Menu.Item>
        <Menu.Item key="2">UPS 2nd Day air</Menu.Item>
        <Menu.Item key="3">FEDEX Ground</Menu.Item>
    </Menu>
);

const width_colum = {
    long: 300,
    medium: 200,
    short: 150
}

const define_current_page = (updated_total, current_page_size, pervious_page) => {
    let result = {
        end: undefined,
        start: undefined,
        current: undefined
    }
    //处理当前页码
    //只有当减少数据的情况下 考虑页码变动
    //当前页码如果小于数据变动后的总页码，页码数不变，否则使用总页码，即在最后一页
    let total_page = Math.ceil(updated_total / current_page_size)
    let current_page = total_page > pervious_page ? pervious_page : total_page
    //判断当前页如果是0 说明已经再最后一页
    if (current_page == 0) current_page = 1
    result.current = current_page
    return result
}

const handle_request = (_id) => {
    return (
        {
            'delete': {
                url: '/user/delete_drafts',
                body: { order_id: Array.isArray(_id) ? _id : [_id] }
            },
            'submit': {
                url: '/user/update_drafts',
                body: { order_id: Array.isArray(_id) ? _id : [_id], status: "ready_to_ship" }
            },
            'cancel': {
                url: '/user/update_drafts',
                body: { order_id: Array.isArray(_id) ? _id : [_id], status: "draft" }
            },
        }
    )
}

const { Search } = Input;

// const get_filter_tag = (filter) => {
//     const filter_tag_name = {
//         "created_at": "创建时间",
//         "server_status": "请求状态"
//     }
//     let is_all = filter.length == 0 && (this.state.searching_string == undefined || this.state.searching_string == '' )

//     let filter_tag  = is_all ? ['is_all'] : Object.getOwnPropertyNames(filter).map(item => filter_tag_name[item])
//     return filter_tag
// }

class MyTable extends React.Component {
    constructor(props) {
        super(props)
    }
    state = {
        status: this.props.page_name,
        total: 0,
        page_size: 20,
        current_page: 1,
        searching_string: undefined,
        filter: {},
        filter_tags: ['is_all'],
        visible: false,
        selectedRowKeys: [],
        dataFromCheck: [],
        data: [],
        is_fetching: true,
        message: '',
        disabled: true,
        data_picker: {
            start: undefined,
            end: undefined
        },
        is_first_render: true,
    };

    onRef = (ref) => {
        this.child = ref
    }

    // get_filter_tag = (filter) => {
    //     const filter_tag_name = {
    //         "created_at": "创建时间",
    //         "server_status": "请求状态",
    //     }
    //     let filter_tag = Object.getOwnPropertyNames(filter).map(item => filter_tag_name[item])
    //     if (this.state.searching_string) filter_tag.push('is_searching')
    //     let updated_filter_tag = filter_tag.length == 0 ? ["is_all"] : filter_tag
    //     // console.log(this.state.searching_string )
    //     return updated_filter_tag
    // }


    //请求表格数据，并展示页面
    fetch_data(api_url_pagniate = this.props.api_url['get_data_pignate'], state = this.state) {
        this.setState({ is_fetching: true });
        post(api_url_pagniate, {
            'searching_string': state.searching_string,
            'status': this.props.page_name,
            "page": state.current_page,
            "limit": state.page_size,
            "filter": state.filter
        })
            .then(payload => {
                console.log(payload)
                this.setState({
                    ...state,
                    current: payload.totalPages,
                    total: payload.data.totalDocs,
                    data: payload.data.docs,

                    is_fetching: false,
                    is_first_render: false,
                })
            })
            .catch(error => {
                notification.error(format.notfication_remote_server_error(handle_error(error).message))
                if (!handle_error(error).is_authed) this.props.history.push(`/login`)
            })
        // .catch(error => { console.log(error) })
        // .finally(this.props.get_order_count())
    }

    handle_action(_id, type) {
        this.setState({ is_fetching: true });
        post(handle_request(_id)[type].url, handle_request(_id)[type].body).then(payload => {
            let data_amount = this.state.total - payload.data.n
            let result = define_current_page(data_amount, this.state.page_size, this.state.current_page)
            let update_content = {
                ...this.state,
                current_page: result.current,
                is_fetching: false,
                selectedRowKeys: this.state.selectedRowKeys.filter((item) => !handle_request(_id)[type].body[this.props.row_key].includes(item))
            }
            this.fetch_data(api_url_pagniate, update_content)
            message.success(payload.message)
        })
            .catch(error => notification.error(format.notfication_remote_server_error(handle_error(error).message)))
            .finally()
    }

    handle_table_change = (pagination, filters, sorter) => {
        this.fetch_data(this.props.api_url['get_data_pignate'], { ...this.state, page_size: pagination.pageSize, current_page: pagination.current })
    }

    //勾选控制
    check_all_data(api_url_pagniate, state = this.state) {
        this.setState({ is_fetching: true });
        post(api_url_pagniate,
            {
                'searching_string': state.searching_string,
                'status': this.props.page_name,
                "filter": state.filter,
                "page": 1,
            })
            .then(payload => {
                let check = {
                    selectedRowKeys: [...payload.data.docs.map((item) => item[this.props.row_key])],
                }
                this.setState({
                    ...state,
                    ...check,
                    is_fetching: false,
                })
                this.props.get_order_count()
            })
            .catch(error => {
                notification.error(format.notfication_remote_server_error(handle_error(error).message))
            })
            .finally()
    }

    handleOnchange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
    }

    handleCheck = (action_type) => this.handle_action(this.state.selectedRowKeys, action_type)


    handleCleanCheck = () => { this.setState({ selectedRowKeys: [] }) }

    //处理筛选，search
    reset_all_filter() {
        let reset_content = { searching_string: '', filter: {}, filter_tags: ['is_all'] }
        this.fetch_data(this.props.api_url['get_data_pignate'], { ...this.state, ...reset_content })
        this.props.clear_search_bar()
    }

    handle_filter(filter_content, filter_tag, type = 'add') {
        let update
        if (type == 'add') {
            update = { ...this.state.filter, ...filter_content }
            let filter_tags = _.uniq(this.state.filter_tags.concat([filter_tag])).filter(item => item != 'is_all')
            this.fetch_data(this.props.api_url['get_data_pignate'], { ...this.state, filter: update, filter_tags })
        } else {
            let remove_key = Object.getOwnPropertyNames({ ...filter_content })[0]
            let { [remove_key]: deleted, ...rest } = this.state.filter;
            let filter_tags = _.uniq(this.state.filter_tags).filter(item => item != filter_tag)
            if (filter_tags.length == 0) filter_tags.push('is_all')
            this.fetch_data(this.props.api_url['get_data_pignate'], { ...this.state, filter: rest, filter_tags })
        }
    }

    handle_search = (string) => {
        let filter_tags = _.uniq(this.state.filter_tags.concat('is_searching')).filter(item => item != 'is_all')
        this.fetch_data(this.props.api_url['get_data_pignate'], { ...this.state, searching_string: string, filter_tags })
    }

    handle_clear_search = () => {
        let filter_tags = this.state.filter_tags.filter(item => item != 'is_searching')
        if (filter_tags.length == 0) filter_tags = ['is_all']
        this.fetch_data(this.props.api_url['get_data_pignate'], { ...this.state, searching_string: '', filter_tags })
        this.props.clear_search_bar()
    }

    handle_fitler_change = (value, dateString) => { this.child.onChange(value, dateString) }


    diaplay_button = () => {
        return (
            <div style={{ display: 'inline-block', marginLeft: 100 }}>
                <Button size='small' hidden={this.state.selectedRowKeys.length == 0} onClick={() => this.handleCheck(this.props.layout_button.action[0])} type="primary" icon={<UploadOutlined />} style={{ fontSize: '12px' }} >{this.props.layout_button.batch[0]}</Button>
                <Button size='small' hidden={this.state.selectedRowKeys.length == 0} onClick={() => this.handleCheck(this.props.layout_button.action[1])} type="danger" icon={<DeleteOutlined />} style={{ fontSize: '12px', marginLeft: '10px' }} >{this.props.layout_button.batch[1]}</Button>
            </div>
        );
    }

    //处理表格上方alert操作提示
    handle_message = (search_string) => {
        let message = (search_string ? <span ><Text strong>搜索结果</Text>：匹配 <Text type="warning" style={{ fontSize: '14px', fontWeight: 'bold' }}>{`"${search_string}"`} </Text> </span> : <span > 当前</span>)
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between' }} >
                <span>{message}<span> 一共 {this.state.total} </span> 记录。已经勾选 <a style={{ marginLeft: '5px', marginRight: '5px' }} >{this.state.selectedRowKeys.length}</a>项  {this.state.selectedRowKeys.length == 0 ? <span></span> : <a onClick={this.handleCleanCheck} style={{ marginLeft: '30px' }}>取消选择</a>} </span>
                {/* <span>已勾选 <a style={{ marginLeft: '5px', marginRight: '5px' }} >{this.state.selectedRowKeys.length}</a>项  {this.state.selectedRowKeys.length == 0 ? <span></span> : <a onClick={this.handleCleanCheck} style={{ marginLeft: '30px' }}>取消选择</a>} </span> */}
            </div>
        )
    }

    componentDidMount = () => {
        window.scrollTo(0, 0)
        if (this.props.onRef) this.props.onRef(this)
        this.fetch_data(this.props.api_url['get_data_pignate'])
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.page_name !== prevProps.page_name) {
            //切换页面，重置
            let reset = { search_string: '', page_size: 25, current_page: 1, filter: {}, is_first_render: true }
            this.fetch_data(this.props.api_url['get_data_pignate'], { ...this.state, ...reset })
        }
    }

    componentDidCatch(error, info) {
        // Display fallback UI
        console.log(error)
    }

    test = () => {
        console.log('test toggle')
        // this.setState({ collapsed: true})
    }

    render() {
        // console.log('i did rendered')
        // console.log(this.state.filter_tags)

        const tableLoading = {
            spinning: this.state.is_fetching,
            indicator: <Spin size='large' />,
        }
        const paginationProps = {
            // position:['topLeft'],
            total: this.state.total,
            pageSize: this.state.page_size,
            current: this.state.current_page,
            showSizeChanger: true,
            pageSizeOptions: ['20', '50', '100', '200']
        }

        const rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: this.handleOnchange,
            hideDefaultSelections: true,
            selections: [{
                key: 'all-data',
                text: '选择全部',
                onSelect: () => this.check_all_data(this.props.api_url['get_data_pignate'])

            }],
        };

        const ButtonGroup = () => {
            return (
                <div>
                    <Button disabled={this.state.selectedRowKeys.length == 0} onClick={() => this.handleCheck(this.props.layout_button.action[0])} type="primary" icon={<UploadOutlined />} style={{ marginBottom: '10px' }} >{this.props.layout_button.batch[0]}</Button>
                    <Button disabled={this.state.selectedRowKeys.length == 0} onClick={() => this.handleCheck(this.props.layout_button.action[1])} type="danger" icon={<DeleteOutlined />} style={{ marginBottom: '10px', marginLeft: '10px' }} >{this.props.layout_button.batch[1]}</Button>
                </div>
            )
        }




        return (
            <div>
                {this.props.filter_content ?
                    <div style={{ marginBottom: '16px' }} >
                        <Filter
                            filter_content={this.props.filter_content}
                            onRef={this.onRef}
                            page_name={this.props.page_name}
                            filter_tags={this.state.filter_tags}
                            handle_filter={(data, filter_tag, type) => this.handle_filter(data, filter_tag, type)}
                            searching_string={this.state.searching_string}
                            handle_clear_search={() => this.handle_clear_search()}
                            show_reset={!this.state.filter_tags.includes('is_all')}
                            reset_all_filter={() => this.reset_all_filter()}
                        /> </div>
                    : undefined}


                <div style={{ background: '#ffffff', boxShadow: 'rgb(217, 217, 217) 1px 1px 7px 0px' }}>

                    {/* <div style={{ marginBottom: '8px', textAlign: 'left', paddingRight : "48px"}}> */}
                    {/* <Button disabled={this.state.selectedRowKeys.length == 0} onClick={() => this.handleCheck(this.props.layout_button.action[0])} type="primary" icon={<UploadOutlined />} style={{ marginBottom: '10px' }} >{this.props.layout_button.batch[0]}</Button>
                            <Button disabled={this.state.selectedRowKeys.length == 0} onClick={() => this.handleCheck(this.props.layout_button.action[1])} type="danger" icon={<DeleteOutlined />} style={{ marginBottom: '10px', marginLeft: '10px' }} >{this.props.layout_button.batch[1]}</Button> */}
                    {/* <Space size='large'>
                            <Input addonBefore={preffix}
                                size="middle" 
                                style={{ width: 400 }}
                                placeholder="搜索" />                   
                        </Space> */}
                    {/* </div> */}


                    <Table
                        style={{}}
                        size={this.props.style ? this.props.style.size : "middle"}
                        title={
                            !this.props.alert && !this.props.buttons ? undefined : () =>
                                <div>
                                    {/* <div></div> */}
                                    <div style={{ textAlign: this.props.style ? this.props.style.button_position : 'right' }}>
                                        <Space style={{ paddingLeft: 16, paddingTop: 4, paddingRight: 16, }}>
                                            {this.props.buttons ? this.props.buttons.map(item =>
                                                item.component
                                                // <Button key={item.key} size='middle' disabled={item.isBatchAction == true && !this.state.selectedRowKeys.length > 0} type={item.type}>{item.content}</Button>
                                            ) : undefined}
                                        </Space>
                                    </div>
                                    <div
                                        hidden={!this.props.alert}
                                    // hidden={!this.state.selectedRowKeys.length > 0}
                                    >
                                        <Alert
                                            style={{ marginTop: '16px' }}
                                            message={this.handle_message(this.state.searching_string)}
                                            type="info"
                                        // banner
                                        // showIcon
                                        />
                                    </div>
                                </div >
                        }
                        // tableLayout = 'fixed'
                        expandable={{
                            expandIconColumnIndex: 2,
                            expandedRowRender: record => <p style={{ paddingLeft: 250 }}>test</p>,
                            // expandedRowRender , 
                            // rowExpandable: record => {return true },
                            rowExpandable: record => { if (record.parcel) return record.parcel.parcelList.length > 1 },

                            // expandIcon: ({ expanded, onExpand, record }) =>
                            //     expanded ? (
                            //         <span onClick={e => onExpand(record, e)} >o</span>
                            //     ) : (
                            //         <span onClick={e => onExpand(record, e)} >c</span>
                            //         )

                        }}

                        pagination={paginationProps}
                        rowKey={record => record[this.props.row_key]}
                        rowSelection={this.props.checkBox == undefined ? rowSelection : this.props.checkBox ? this.props.checkBox : undefined}
                        columns={this.props.table_content}
                        dataSource={this.state.data}
                        scroll={{ x: this.props.table_content.map(item => item.width).reduce((accumulator, currentValue) => accumulator + currentValue) + 200, y: 516 }}
                        loading={tableLoading}
                        onChange={this.handle_table_change}
                    />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    // console.log(state)
    return {
        isFetching: state.globalState.isFetching,
        // draft_order: state.shipping_platform_user.order.result,
        // order_count: state.shipping_platform_user.order.count
    }
}

function mapDispatchToProps(dispatch) {
    return {
        // get_order_count: bindActionCreators(actions_user_order.get_order_count, dispatch),
        // get_all_order: bindActionCreators(actions_user_order.get_all_order, dispatch),
        // submit_drafts: bindActionCreators(actions_user_order.update_order, dispatch),
        // delete_drafts: bindActionCreators(actions_user_order.delete_orders, dispatch),
        // reset_order_result: bindActionCreators(actions_user_order.reset_order_result, dispatch),
        // set_order_count: bindActionCreators(actions_user_order.set_order_count, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyTable)