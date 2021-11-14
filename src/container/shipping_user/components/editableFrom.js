import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import CheckForm from './checkForm'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {actions} from '../../../reducers/saveOrder'
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Modal, Input, Radio, Select, message } from 'antd';

const FormItem = Form.Item;

const CollectionCreateForm = Form.create()(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const {
        visible, onCancel, onCreate, form ,data
      } = this.props;
      
      const { getFieldDecorator } = form;

      const Option = Select.Option;

      function handleChange(value) {
        console.log(`selected ${value}`);
      }
      
      function cancel(e) {
        console.log(e);
        message.error('Click on No');
      }

      return (
        <Modal
          visible={visible}
          title="编辑订单"
          okText="确认编辑"
          cancelText = '取消'
          onCancel={onCancel}
          onOk={onCreate}
        >
         <Form layout="inline">
            <FormItem label="姓名"  >
              {getFieldDecorator('Name', { rules: [{ required: true, message: '请输入姓名' }], initialValue : this.props.data.Name }   )
              (
                <Input autoComplete="off"   style={{ width: 150 }}/>
              )}
            </FormItem>
            <FormItem label="产品">
              {getFieldDecorator('Product' , {rules: [{ required: true, message: '请选择要代购的产品' }] , initialValue : this.props.data.Product
              })(   
                  
              <Select placeholder = '选择商品类别' style={{ width: 150 }} onChange={handleChange}>
                <Option value="衣服">衣服</Option>
                <Option value="鞋子">鞋子</Option>
                {/* <Option value="disabled" disabled>Disabled</Option> */}
                <Option value="奢侈品">奢侈品</Option>
                <Option value="化妆品">化妆品</Option>
              </Select>  
              
              
              )}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);


export default CollectionCreateForm