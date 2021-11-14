import React from 'react';
import ReactDOM from 'react-dom';
import QueueAnim from 'rc-queue-anim';
import 'antd/dist/antd.css';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ExportOutlined, PrinterOutlined, PrinterTwoTone } from '@ant-design/icons';
import { Button, Table, Divider } from 'antd';
import { Badge, Alert, Popconfirm, message, Checkbox } from 'antd';
import XLSX from 'xlsx'
import Animate from 'rc-animate';
import { TweenOneGroup } from 'rc-tween-one';
import { actions } from '../../../reducers/saveOrder'
import { actions as actions_user_order } from '../../../reducers/shipping_platform/user/order'
import { actions as fetchOrderAction } from '../../../reducers/order'
import { actions as fileAction } from '../../../reducers/handleFile'
import EditableForm from '../components/editableFrom'
import GenerateSheet from './generateSheet'
import EditOrder from './editOrder'
import Moreaction from './moreAction'


import TweenOneGroupBody from '../components/motion/TweenOneGroup'
// import MyQueueAnim from '../components/motion/QueueAnim'
// import AnimateBody from '../components/motion/AntimateBody'

const width_colum = {
  long: 200,
  medium: 150,
  short: 100
}

class MyTable extends React.Component {
  constructor(props) {
    super(props)
  }


  state = {
    visible: false,
    selectedRowKeys: [],
    dataFromCheck: [],
    checkAgent: ['飞碟'],
    data: {}
  };

  handleCleanCheck = () => {
    this.setState({ selectedRowKeys: [], dataFromCheck: [] })
  }


  handleOnchange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRowKeys, dataFromCheck: selectedRows });
  }

  handleCheck = (status) => {
    if (status === '删除') this.props.deleteOrders(this.state.selectedRowKeys)
    this.setState({ selectedRowKeys: [], dataFromCheck: [] })
  }

  handleMakrCheck = () => {
    this.setState({ selectedRowKeys: [], dataFromCheck: [] })
  }

  showModal = () => {
    this.setState({ visible: true });
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  onDelete(_id) {
    this.props.deleteOneorder(_id)
    this.setState({ selectedRowKeys: this.state.selectedRowKeys.filter((item) => item !== _id) })
  }

  // to do to anohter status
  handleMarkToship(record, key) {
    record.Status = key
    this.props.saveOneorder(record);
    this.setState({ selectedRowKeys: this.state.selectedRowKeys.filter((item) => item !== _id) })
  }

  onChange = (checkedValues) => {
    this.setState({ checkAgent: checkedValues })
    console.log('checked = ', checkedValues);
  }

  Oncancel = (e) => {
    console.log(e);
    message.error('已经取消');
  }

  componentDidMount() {
    this.props.get_order_count({ 'status': 'completed' });
  }

  render() {
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.handleOnchange,
      hideDefaultSelections: true,
      selections: [{
        key: 'all-data',
        text: '选择全部',
        onSelect: () => {
          this.setState({
            selectedRowKeys: [...this.props.readyToShip_order.map((item) => item._id)], // 
            dataFromCheck: [...this.props.readyToShip_order.map(item => item)]
          });
        },
      }],
    };


    const columns = [
      {
        title: '操作', key: 'print', width: width_colum.medium, align: 'center',
        fixed: 'left',
        render: (text, record) => (

          <span><PrinterTwoTone /> <a>打印</a></span>

        )
      },
      {
        title: '参考订单号', width: 250, dataIndex: 'customer_order_id', key: 'customer_order_id', align: 'center',
        // fixed: 'left'
      },
      { title: '渠道', width: width_colum.medium, dataIndex: 'carrier', align: 'center', key: 'carrier' },

      {
        title: '物流状态', width: width_colum.medium, align: 'center', key: 'server_response', render: () => (
          <span>
            <Badge status="success" />
            投递
        </span>
        )
      },
      {
        title: '运单号', width: width_colum.medium, dataIndex: 'parcel.tracking_nubmer', align: 'center', key: 'parcel_tracking_number', render: (record) => (
          <a>
            {record}
          </a>
        )
      },
      { title: '结算运费', width: width_colum.medium, dataIndex: 'postage.estimate_amount', align: 'center', key: 'postage_estimate_amount', },
      { title: '产品sku', width: width_colum.medium, dataIndex: 'parcel.sku', align: 'center', key: 'parcel_sku', },
      { title: '收件人', width: width_colum.long, dataIndex: 'recipient.recipient_name', align: 'center', key: 'Name' },
      {
        title: '收货地址',
        width: width_colum.long,
        dataIndex: 'recipient.add1',
        align: 'center',
        key: 'recipient_add1',
        render: (text, row) => { return (text + ' ' + row.recipient.add2) }
      },
      { title: '收货城市', width: width_colum.short, dataIndex: 'recipient.city', align: 'center', key: 'recipient_city', },
      { title: '收货州', width: width_colum.short, dataIndex: 'recipient.state', align: 'center', key: 'recipient_state', },
      { title: '收货邮编', width: width_colum.short, dataIndex: 'recipient.zipcode', align: 'center', key: 'recipient_zipcode', },
      { title: '尺寸', width: width_colum.medium, dataIndex: 'Reference2', align: 'center', key: 'Reference2', },
      { title: '重量', dataIndex: 'Weight', width: width_colum.short, align: 'center', key: 'Weight', },
      { title: '创建时间', width: width_colum.medium, dataIndex: 'createdAt', align: 'center', key: 'createdAt', },
      { title: '系统订单号', width: 250, dataIndex: 'order_id', align: 'center', key: 'order_id' },

    ];
    return (
      <div style={{ background: '#fff', padding: 32 }}>
        <Button disabled={this.state.selectedRowKeys.length == 0} onClick={() => this.handleCheck('打印')} type="primary" icon={<PrinterOutlined />} style={{ marginBottom: '10px' }} >批量打印</Button>
        <Button disabled={this.state.selectedRowKeys.length == 0} onClick={() => this.handleCheck('导出')} type="primary" icon={<ExportOutlined />} style={{ marginBottom: '10px', marginLeft: '10px' }} >导出记录</Button>

        <Alert style={{ marginBottom: '10px' }}
          message={<div>已经选择 <a style={{ marginLeft: '5px', marginRight: '5px' }} >{this.state.selectedRowKeys.length}</a>项<a onClick={this.handleCleanCheck} style={{ marginLeft: '30px' }}>取消选择</a> </div>}
          type="info" showIcon />
        <Table
          // components={{
          //   body: { wrapper: TweenOneGroupBody },
          // }}
          // components={{
          //   body: { wrapper: MyQueueAnim  },
          // }}
          // components={{
          //   body: { wrapper: AnimateBody  },
          // }}
          size='small'
          pagination={{ pageSize: 8, }}
          rowKey={record => record._id}
          rowSelection={rowSelection}
          columns={columns}
          scroll={{ x: 2600 }}
          dataSource={this.props.completed_order}
        // bordered
        // expandRowByClick ={true}
        // expandedRowRender = {expandedRowRender}
        />

      </div>
    );
  }
}



function mapStateToProps(state) {
  return {
    //  order:state.user.order,
    isFetching: state.globalState.isFetching,
    // isLoading: state.globalState.isLoading,
    // order: state.shipping_platform_user.order.result,
    completed_order: state.shipping_platform_user.order.result
    //  workbook:state.file,
    //  message:state.globalState.message
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // deleteOrders : bindActionCreators(fetchOrderAction.delete_orders, dispatch),
    // deleteOneorder : bindActionCreators(actions.delete_one_order, dispatch),
    // saveOneorder : bindActionCreators(actions.save_one_order, dispatch),
    // getWorkBook : bindActionCreators(fileAction.get_workbook, dispatch),
    submit_drafts: bindActionCreators(actions_user_order.update_order, dispatch),
    get_order_count: bindActionCreators(actions_user_order.get_order_count, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyTable)

