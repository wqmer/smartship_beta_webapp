import React from 'react'
import { Button } from 'antd'

export const Logined = (props) => (
    <div>
        <p>欢迎：{props.user_info.user_name}</p>
        <Button onClick={() => props.history.push('/user/order_log/ready_to_ship')} type="primary">点击进入管理页面</Button>
    </div>
);