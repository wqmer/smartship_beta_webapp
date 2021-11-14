import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Modal, Input, Radio, Select, message } from 'antd';

import {actions} from '../../../reducers/saveOrder'
import EditableForm from '../components/editableFrom'
import Message from '../components/message'
import { getComponentDisplayName } from 'react-pure-lifecycle/lib/utils';



class CollectionsPage extends React.Component {
  state = {
    visible: false,
  };


  showModal = () => {
    this.setState({ visible: true });
    // console.log(this.props.data)
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }


  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
   
      values._id = this.props.data._id
      // console.log(values)
      this.props.saveOneorder(values);
      form.resetFields();
      this.setState({ visible: false});
    });
  }


  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  render() {
    // message.success('修改成功')
    return (
      <div>
        <a onClick={this.showModal}>编辑</a>
        <EditableForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          data = {this.props.data}
        />
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
         message:state.globalState.message
  }
}

function mapDispatchToProps(dispatch) {
  return{
        saveOneorder : bindActionCreators(actions.save_one_order, dispatch)
       }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionsPage)

