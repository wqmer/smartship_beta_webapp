import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import CheckForm from './checkForm'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {actions} from '../../../reducers/saveOrder'
import { FileExcelOutlined, PlusOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Modal, Input, Radio, Select, message } from 'antd';

import EditableForm from './addableFrom'

class CollectionsPage extends React.Component {
  state = {
    visible: false,
  };

  showModal = () => {
    this.setState({ visible: true });
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  handleCreate = (e) => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      e.preventDefault();
      this.props.saveOneorder(values);
      form.resetFields();
      this.setState({ visible: false });
       message.success('添加成功');// redux saga 异步确认
    });
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  render() {
    return (
      <div style = {{display:'inline'}}    >
        <Button type="dashed" icon = {<PlusOutlined />} style={ { marginBottom : '10px' }  } onClick={this.showModal}>添加订单</Button>
        <Button type="dashed" icon = {<FileExcelOutlined />} style={ { marginBottom : '10px' , marginLeft: '10px' } } > 批量导入</Button>
        <EditableForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
         order:state.user.order,
         isFetching:state.globalState.isFetching
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



// export default CollectionsPage 




