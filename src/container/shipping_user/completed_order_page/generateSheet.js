import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { ExportOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Tooltip, Upload, Button, Modal, Input, Radio, Select, message, Checkbox } from 'antd';
// import {actions} from '../../../reducers/saveOrder'
import XLSX from 'xlsx'
import { actions } from '../../../reducers/saveOrder'
import { actions as fetchOrderAction} from '../../../reducers/order'
import { actions as fileAction} from '../../../reducers/handleFile'
import EditableForm from '../components/addableFrom'



class CollectionsPage extends React.Component {

  constructor(props){
    super(props);
}

  state = {
    visible: false,
    confirmLoading: false,
    data : [] 
  }
  
handleGenerateOrder = () => {
 var req = {} ;
 req.agentType = this.props.agentType;
 req.records = this.props.data
 this.props.generateSheet(req)
} 

handleCancel = () => {
    this.setState({ visible: false });
  }

onChange = (checkedValues) => {
    console.log('checked = ', checkedValues);
  }

  render() {
    const { visible, confirmLoading, ModalText, impotButtomIsDisable } = this.state;
    const titleContent = this.props.data.length == 0 || this.props.agentType.length == 0 ? '请选择至少一个订单和一种快递' :''

    return (
      <div style = {{display:'inline'}}    >
        <Tooltip placement="topLeft" title = {titleContent}>
        <Button type="primary" icon = {<ExportOutlined />} disabled = {this.props.data.length == 0 || this.props.agentType.length == 0} onClick={this.handleGenerateOrder} style={ { marginBottom : '10px'  } } loading = {false} > 生成订单</Button>
        </Tooltip>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    isLoading:state.globalState.isLoading,
    workbook:state.file
  }
}

function mapDispatchToProps(dispatch) {
  return{
    generateSheet : bindActionCreators(fileAction.get_workbook, dispatch),
       }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionsPage)



// export default CollectionsPage 




