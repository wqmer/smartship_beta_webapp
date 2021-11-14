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

// import MyTable from './table'
// import Filter from './filter'

import MyTable from '../../../components/Table'
import dashboard_page_asset from '../../../asset/dashboard_page'
import Demo_chart from '../../../components/Chart'
import Demo_pie from '../../../components/Pie'
import Demo_dounut from '../../../components/Donut'
import Demo_map from '../../../components/Map'

import { Skeleton } from 'antd';

import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import NotFound from '../../../components/notFound'
import { ArrowUpOutlined, ArrowDownOutlined, ExclamationCircleOutlined, CarryOutOutlined, SnippetsOutlined } from '@ant-design/icons';

const { Search } = Input;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { Option } = Select;
const InputGroup = Input.Group;


const project = () => {
    return (
        <div style={{ background: '#fff' }}>
        
                {/* <Divider /> */}
                <Row style={{ background: '#fff',  boxShadow: 'rgb(217, 217, 217) 1px 1px 7px 0px', padding: "16px 32px 16px 32px" }} gutter={24}>
                <Col span={4}>
                    <a onClick={() => console.log(123)}>
                        <Statistic                      
                            // style={{ display: "inline-block" , transform: 'scale(1.2)'}}
                            // onMouseEnter = {() => console.log('I am in ')}
                            style={{ display: "inline-block" }}
                            title="咨询用户"
                            value={500}
                            suffix={<span>条<span style={{ marginLeft: 6, color: '#cf1322', fontSize: 16 }}> <ArrowDownOutlined /> 10%</span></span>}
                        />
                    </a>
                </Col>

                <Col span={1}>  <Divider style={{ height: 48 }} type="vertical" /></Col>

                <Col span={4}>
                    <a onClick={() => console.log(123)}>
                        <Statistic
                            title="注册用户"
                            value={100}
                            suffix={<span>条<span style={{ marginLeft: 6, color: '#3f8600', fontSize: 16 }}> <ArrowUpOutlined /> 10%</span></span>}
                        />
                    </a>
                </Col>
                <Col span={1}>  <Divider style={{ height: 48 }} type="vertical" /></Col>
                <Col span={4}>
                    <a onClick={() => console.log(123)}>
                        <Statistic
                            title="访问量"
                            value={1000}
                            suffix={<span>条<span style={{ marginLeft: 6, color: '#3f8600', fontSize: 16 }}> <ArrowUpOutlined /> 17.5%</span></span>}
                        />
                    </a>
                </Col>
                <Col flex="auto" style={{ textAlign :"right" }}>
                <Space style={{ marginTop: 16,}}>
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
      
            {/* <Divider /> */}
            <span style={{padding: "0px 32px 0px 32px" , display: "inline-block", width: "48%" }}>  <Demo_pie /> </span>
            <Divider style={{ height: 150 }} type="vertical" />
            <span style={{ padding: "0px 32px 0px 32px" , display: "inline-block", width: "48%" }}>  <Demo_dounut /> </span>
            <Divider />
            <div style={{ padding: "0px 32px 0px 32px"  }}><Demo_chart /></div> 
            {/* <div><Demo_map /></div> */}
        </div>)
}

export default project