import React, { useState, useEffect } from 'react';
import { AccountBookOutlined, AccountBookTwoTone, AccountBookFilled } from '@ant-design/icons';
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
    Space,
    Typography
} from 'antd';
import { get, post } from '../../util/fetch';
import { Statistic, Card, Row, Col } from 'antd';

const { Text, Link } = Typography;

const Balance = (props) => {

    const [value, setData] = useState(0);
    useEffect(() => {
        // const fetchData = async () => {
        //     console.log('request to data')
        //     const result = await get('/user/userInfo',);
        //     setData(result.data.balance);
        // };
        // fetchData();
        setData(props.balance);
    });

    return (
        <Space style={{ marginRight: 24 }} size='middle'>
           
            {/* <a><AccountBookFilled onClick={() => console.log(123)} /></a> */}
            {/* <a><AccountBookTwoTone onClick={() => console.log(123)} /> </a>   */}
            <Text type="secondary">余额:</Text>
            <Statistic
                // key={item.title}
                // style={{ display: "inline-block" , transform: 'scale(1.2)'}}
                // onMouseEnter = {() => console.log('I am in ')}
                style={{ display: "inline-block" }}
                value={value}
                precision={2}
                valueStyle={{ fontSize: 20, fontWeight: 500 }}
                prefix={'$ '}
            // suffix={<span>{item.unit}</span>}
            />
             {/* <a><AccountBookOutlined /></a> */}
        </Space>
    )
}




export default Balance