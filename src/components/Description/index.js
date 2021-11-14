import { Descriptions, Badge } from 'antd';
import { Space, Card } from 'antd';
import React, { Component, PropTypes } from 'react'

const Detail = (props) => {
  const { order } = props
  window.scrollTo(0, 0)
  return (
    <div >


      <Descriptions style={{ padding: '16px', paddingLeft: "32px", paddingRight: "32px", boxShadow: '1px 1px 5px rgba(0,21,41,.18)' }} title="订单信息" bordered>
        {/* <Descriptions.Item label="Product">123</Descriptions.Item> */}
        <Descriptions.Item label="Product">{order.sender.sender_name}</Descriptions.Item>
        <Descriptions.Item label="Billing Mode">Prepaid</Descriptions.Item>
        <Descriptions.Item label="Automatic Renewal">YES</Descriptions.Item>
        <Descriptions.Item label="Order time">2018-04-24 18:00:00</Descriptions.Item>
        <Descriptions.Item label="Usage Time" span={2}>
          2019-04-24 18:00:00
     </Descriptions.Item>
        <Descriptions.Item label="Status" span={3}>
          <Badge status="processing" text="Running" />
        </Descriptions.Item>
        <Descriptions.Item label="Negotiated Amount">$80.00</Descriptions.Item>
        <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
        <Descriptions.Item label="Official Receipts">$60.00</Descriptions.Item>
      </Descriptions>

      <Descriptions style={{ marginTop: "16px", padding: '16px', paddingLeft: "32px", paddingRight: "32px", boxShadow: '1px 1px 5px rgba(0,21,41,.18)' }} title="包裹信息" bordered >
        {/* <Descriptions.Item label="Product">123</Descriptions.Item> */}
        <Descriptions.Item label="Product">{order.sender.sender_name}</Descriptions.Item>
        <Descriptions.Item label="Billing Mode">Prepaid</Descriptions.Item>
        <Descriptions.Item label="Automatic Renewal">YES</Descriptions.Item>
        <Descriptions.Item label="Order time">2018-04-24 18:00:00</Descriptions.Item>
        <Descriptions.Item label="Usage Time" span={2}>
          2019-04-24 18:00:00
     </Descriptions.Item>
        <Descriptions.Item label="Status" span={3}>
          <Badge status="processing" text="Running" />
        </Descriptions.Item>
        <Descriptions.Item label="Negotiated Amount">$80.00</Descriptions.Item>
        <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
        <Descriptions.Item label="Official Receipts">$60.00</Descriptions.Item>
      </Descriptions>

    </div>
  )
}



export default Detail