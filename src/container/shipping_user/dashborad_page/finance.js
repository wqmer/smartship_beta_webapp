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
import { Statistic, Card, Row, Col } from 'antd';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from '../../../reducers/order'
// import { shipping_user_actions } from '../../../reducers/shipping_platform/user'
import { actions as actions_user_order } from '../../../reducers/shipping_platform/user/order'
import { ArrowUpOutlined, ArrowDownOutlined, ExclamationCircleOutlined, CarryOutOutlined, SnippetsOutlined } from '@ant-design/icons';

// import DemoBasicChart from '../../../components/BasicChart'
import MultiChart from '../../../components/MultiChart'
// import Filter from './filter'

import MyTable from '../../../components/Table'
import dashboard_page_asset from '../../../asset/dashboard_page'
import Demo_chart from '../../../components/Chart'
import DemoBarChart from '../../../components/BarChart'
import Demo_pie from '../../../components/Pie'
import Demo_dounut from '../../../components/Donut'
import Demo_map from '../../../components/Map'

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


const finance = () => {
    return (
        <div style={{ background: '#fff' }}>


            <Row style={{ background: '#fff', boxShadow: '1px 1px 5px rgba(0,21,41,.18)', padding: "16px 32px 16px 32px" }} gutter={24}>
                <Col span={4}>
                    <a onClick={() => console.log(123)}>
                        <Statistic
                            style={{ display: "inline-block" }}
                            title="交易额"
                            value={5023023}
                            suffix={<span>美金<span style={{ marginLeft: 6, color: '#cf1322', fontSize: 16 }}> <ArrowDownOutlined /> 200%</span></span>}
                        />
                    </a>
                </Col>

                <Col span={1}>  <Divider style={{ height: 48 }} type="vertical" /></Col>

                <Col span={4}>
                    <a onClick={() => console.log(123)}>
                        <Statistic
                            title="成本"
                            value={4002000}
                            suffix={<span>美金<span style={{ marginLeft: 6, color: '#3f8600', fontSize: 16 }}> <ArrowUpOutlined /> 10%</span></span>}
                        />
                    </a>
                </Col>
                <Col span={1}>  <Divider style={{ height: 48 }} type="vertical" /></Col>
                <Col span={4}>
                    <a onClick={() => console.log(123)}>
                        <Statistic
                            title="利润"
                            value={9989.5}
                            suffix={<span>美金<span style={{ marginLeft: 6, color: '#3f8600', fontSize: 16 }}> <ArrowUpOutlined /> 10%</span></span>}
                        />
                    </a>
                </Col>
                <Col flex="auto" style={{ textAlign: "right" }}>
                    <Space style={{ marginTop: 16, }}>
                        <Radio.Group style={{ marginLeft: 32 }} defaultValue="a" buttonStyle="solid">
                            <Radio.Button value="a">今日</Radio.Button>
                            <Radio.Button value="b">本周</Radio.Button>
                            <Radio.Button value="c">本月</Radio.Button>
                            <Radio.Button value="d">今年</Radio.Button>
                        </Radio.Group>
                        <RangePicker />
                    </Space>
                </Col>
            </Row>
    
            <div style={{ padding: "12px 32px 0px 32px"  }} ><MultiChart /></div>

            <Divider />

            <Row style={{ padding: "0px 32px 0px 32px"  }} gutter={24}>
                <Col span={12}>  <DemoBarChart /> </Col>
                <Col span={12}> <Demo_pie />  </Col>
            </Row>

            {/* <Space size={50}>
                <a onClick={() => console.log(123)}><Statistic title="完成订单" value={5000} suffix="条" /></a>
                <Divider style={{ height: 48 }} type="vertical" />
                <a onClick={() => console.log(123)}><Statistic title="草稿订单" value={100} suffix="条"  /></a>
                <Divider style={{ height: 48 }} type="vertical" />
                <a onClick={() => console.log(123)}><Statistic title="异常订单" value={5} suffix="条" /></a>
            </Space> */}
        </div>)
}

export default finance