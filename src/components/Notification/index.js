import React, { Component, PropTypes ,useState} from 'react'

import { Badge, Menu, Dropdown, Button } from 'antd';



import { Tabs } from 'antd';

import {
  HomeOutlined,
  SettingFilled,
  SmileOutlined,
  SyncOutlined,
  BellOutlined
} from '@ant-design/icons';





const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const DemoTeb = () => (
  <Tabs defaultActiveKey="1" onChange={callback}>
    <TabPane tab="Tab 1" key="1">
      Content of Tab Pane 1
    </TabPane>
    <TabPane tab="Tab 2" key="2">
      Content of Tab Pane 2
    </TabPane>
    <TabPane tab="Tab 3" key="3">
      Content of Tab Pane 3
    </TabPane>
  </Tabs>
);




const menu = (
  <Menu >
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
        1st menu item
      </a>
    </Menu.Item>
    {/* <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
        2nd menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        3rd menu item
      </a>
    </Menu.Item> */}
  </Menu>
);

const Demo_notfication = () => {
  const [background, setBackground] = useState('#FFFFFF');
  return (
    <div
      onMouseLeave={() => setBackground('#FFFFFF')}
      onMouseEnter={() => setBackground('#F8F8F8')}
      style={{ cursor: 'pointer', paddingLeft: 16, paddingRight: 16, background: background }}
    >
      <Dropdown trigger ={['click']} overlay={menu} placement="bottomRight" arrow={true}>
        <Badge  count={9}>
          <BellOutlined style={{ fontSize: '18px' }} />
        </Badge>
      </Dropdown>
    </div>
  )
}















export default Demo_notfication