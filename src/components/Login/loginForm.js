import { LockOutlined, UserOutlined } from '@ant-design/icons';
// import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Form, Input, Button, Checkbox } from 'antd';
import React, { Component } from 'react';


const NormalLoginForm = (props) => {

  const onFinish = values => {
    // console.log('Received values of form: ', values);
    props.login(values)
    // e.preventDefault();
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="user_name"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <a href="">register now!</a>
      </Form.Item>
    </Form>
  );
};


// const NormalLoginForm = () => {
//   const handle_login = e => {
//     e.preventDefault();
//     this.props.form.validateFields((err, values) => {
//       if (!err) {
//         this.props.login(values)
//         console.log('Received values of form: ', values);
//       }
//     });
//   }

//     return (
//       <Form 
//        onSubmit={handle_login} >
//         <Form.Item
//           name="user_name"
//           rules={[{ required: true, message: '请输入你的用户名!' }]}
//         >
//           <Input prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
//         </Form.Item>

//         <Form.Item
//           name="password"
//           rules={[{ required: true, message: '请输入你的密码' }]}
//         >
//           <Input prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
//         </Form.Item>


//         {/* <FormItem>
//           {getFieldDecorator('remember', {
//             valuePropName: 'checked',
//             initialValue: true,
//           })(
//             <Checkbox>记住账号</Checkbox>
//           )}
//           <a className="login-form-forgot" href="">忘记密码</a>
//           <Button type="primary" htmlType="submit" className="login-form-button">
//             登录
//           </Button>
//           或者 <a href="">现在就注册!</a>
//         </FormItem> */}


//         <Form.Item name="remember" valuePropName="checked">
//           <Checkbox>Remember me</Checkbox>
//         </Form.Item>

//         <Form.Item >
//           <Button type="primary" htmlType="submit">
//             Submit
//         </Button>
//         </Form.Item>
//       </Form>
//     );
//   }




export default NormalLoginForm