import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';


import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';


import { Button, Modal, Input, Radio, Select, message } from 'antd';

const FormItem = Form.Item;

const formItemLayout = {
  // labelCol: {
  // xs: { span: 24 },
  // sm: { span: 8 },
  // },
  wrapperCol: {
  xs: { span: 24 },
  sm: { span: 16 },
},
};

const CollectionCreateForm = Form.create()(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const {
        visible, onCancel, onCreate, form,
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
        //   width = {800}
          width = "60%"
          bodyStyle={{ height: 650}}
        //   style = {}
          title="新建订单"
          okText="确认添加"
          cancelText='取消'
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="inline">
 
            <FormItem label="寄件人姓名"  >
              {getFieldDecorator('sender_name', {
                rules: [{ required: true, message: '请输入寄件人姓名' }],
              })(
                <Input autoComplete="off" placeholder='不要超过20个字符' style={{ width: 200}} />
              )}
            </FormItem>
            <FormItem label="公司"  style={{ margin: '0 0 0 10px' }}>
              {getFieldDecorator('Company', {
                rules: [{ required: false, message: '' }],
              })(
                <Input autoComplete="off" placeholder='可不填' style={{ width: 225 }} />
              )}
            </FormItem>
 


            <FormItem label="寄送地址一"       >
              {getFieldDecorator('sender_add1', {
                rules: [{ required: true, message: '请输入寄件人地址一' }],
              })(
                <Input autoComplete="off" placeholder='街道，路名英文' style={{ width: 500 }} />
              )}
            </FormItem>
            <FormItem label="寄送地址二"    style={{ margin: '0 0 0 10px' }} >
              {getFieldDecorator('sender_add2', {
                rules: [{ required: false , message: '请输入寄件人地址二' }],
              })(
                <Input autoComplete="off" placeholder='门牌号，公寓编号，选填' style={{ width: 500 }} />
              )}
            </FormItem>
     


  

            
          </Form>
        </Modal>
      );
    }
  }
);


export default CollectionCreateForm