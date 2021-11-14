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

const MyStatistic = (props) => {
    return (
        <Row justify="center" style={{ background: '#fff', padding: "32px 32px 16px 32px", boxShadow: 'rgb(217, 217, 217) 1px 1px 7px 0px' }} >
            {props.statistic_content.map((item, index) =>
                !item.is_divide ?
                    <Col   key={item.title} span={4} >
                        <Statistic
                            key={item.title}
                            // style={{ display: "inline-block" , transform: 'scale(1.2)'}}
                            // onMouseEnter = {() => console.log('I am in ')}
                            style={{ display: "inline-block" }}
                            title={item.title}
                            value={item.value}
                            suffix={<span>{item.unit}</span>}
                        />
                    </Col > : <Col span={2}>  <Divider key={item.title} style={{ height: 48 }} type="vertical" /></Col>

            )}

        </Row>
    )
}

export default MyStatistic
