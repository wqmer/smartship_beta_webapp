import React from 'react';
import ReactDOM from 'react-dom';
import QueueAnim from 'rc-queue-anim';
import 'antd/dist/antd.css';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { DownOutlined } from '@ant-design/icons';
import { Menu, Dropdown, Button, Table, Divider } from 'antd';
import { Popconfirm, message} from 'antd';
import Animate from 'rc-animate';
import { TweenOneGroup } from 'rc-tween-one';
import { Alert } from 'antd';
import EditOrder from './editOrder'


class moreAction  extends React.Component {
      constructor(props){
          super(props)
      }

render(){
    const myMenu =  ( data => 
    <Menu>  
    <Menu.Item>
    <Popconfirm title = "确认为待发货吗?" 
                onConfirm={( ) => {   
                const key = '待发货'
                this.props.handleMarkToship(data, key)   
               }} // redux saga 异步确认
                onCancel={this.props.cancel} okText="确认" cancelText="取消">
    <a> 标记为待发货</a>   
    </Popconfirm> 
    </Menu.Item>

    <Menu.Item>
            <EditOrder data = {data}/> 
    </Menu.Item>

    <Menu.Item>
    <Popconfirm title="确认要删除吗?" 
                onConfirm={() => {   
                this.props.onDelete(data._id)    
              }} // redux saga 异步确认
                onCancel={this.props.cancel} okText="确认" cancelText="取消">
    <a>删除</a>   
    </Popconfirm> 
    </Menu.Item>

  </Menu>
  )


return (
    <div style = {{display : 'inline'}} > 
       <Dropdown overlay= {myMenu(this.props.data)}><a className="ant-dropdown-link"  >更多<DownOutlined /></a></Dropdown>
   </div>
);
}














}















export default moreAction 















