import { Descriptions, Space, List, Typography, Divider, Row, Col } from 'antd';
import React, { Component } from 'react';


const { Paragraph } = Typography;
const { Text, Title } = Typography;

const OrderDetail = (props) =>
    // <List
    //     style={{ background: '#ffffff', boxShadow: 'rgb(204, 204, 204) 0px 0px 10px', }}
    //     size="large"
    //     header={<Text style={{ fontWeight: 200, fontSize: 19 }}>{props.title}</Text>}
    //     // footer={<div>Footer</div>}
    //     bordered
    //     dataSource={props.data}
    //     renderItem={item => (
    //         <List.Item>
    //             <Space size={300}>
    //                 <span style={{ fontWeight: 400, color: '#000000', width: '50%' }} > {item.label}</span>
    //                 <span style={{ textAlign: 'right' }}> content </span>
    //             </Space>
    //         </List.Item>
    //     )}
    // />

    <Descriptions size='middle'
        title={<Text type="secondary"  style={{ fontWeight: 200, fontSize: 19 }}>{props.title}</Text>}
        bordered
        style={{ borderRadius: "3px", boxShadow: '0px 3px 6px 0px rgba(0, 0, 0, 0.12)', padding: '18px', background: '#ffffff', paddingTop: 16 }}>
        {props.data.map(item =>
            <Descriptions.Item
                style={{ marginTop: 16 }}
                span={item.span == undefined ? 1 : item.span}
                key={item.label}
                label={<Text style={{ fontWeight: 350 }}> {item.label}</Text>}>
                {item.label == '运单号' ? <Text type="secondary" copyable={{ text: item.content, tooltips: false }}> {props.currentTrackingNumbers} </Text> : <Text type="secondary"> {item.content == undefined ? 'N/A' : item.content} </Text>}
                {/* <Text type="secondary"> {item.content == undefined ? 'N/A' :    item.content} </Text> */}
            </Descriptions.Item>)}
    </Descriptions>




export default OrderDetail


