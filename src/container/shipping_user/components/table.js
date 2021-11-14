import React from 'react';
import ReactDOM from 'react-dom';
import QueueAnim from 'rc-queue-anim';
import 'antd/dist/antd.css';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from '../../../reducers/saveOrder'
import { actions as fetchOrderAction } from '../../../reducers/order'
import { DeleteOutlined, EditOutlined, ExportOutlined } from '@ant-design/icons';
import { Button, Table, Divider } from 'antd';
import { Popconfirm, message } from 'antd';
import Animate from 'rc-animate';
import EditableForm from './editableFrom'
import AddOrder from './modal'



class MyTable extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    visible: false,
    data: {}
  };

  handleData = (record) => {
    this.setState({ data: record });
  }

  showModal = () => {
    this.setState({ visible: true });
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
      values._id = this.state.data._id
      this.props.saveOneorder(values);

      form.resetFields();
      this.setState({ visible: false });
      message.success('修改成功');// redux saga 异步确认
    });
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }


  onDelete(_id) {
    this.props.deleteOneorder(_id)
  }

  render() {


    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
    };

    const columns = [{ title: '姓名', dataIndex: 'Name' },
    { title: '订单产品', dataIndex: 'Product' },
    { title: '创建日期', dataIndex: 'createdAt' },
    { title: '订单状态', dataIndex: 'Status', },
    {
      title: '操作', key: 'action',
      render: (text, record) => (
        <span>
          <Button onClick={() => {
            this.showModal()
            this.handleData(record)
          }}
            icon={<EditOutlined />} type="default" >编辑</Button>
          <Divider type="vertical" />
          <Popconfirm title="确认要删除此条记录吗?"
            onConfirm={() => {
              this.onDelete(record._id)
              message.success('已经删除')
            }} // redux saga 异步确认
            onCancel={cancel} okText="确认" cancelText="取消">
            <Button
              icon={<DeleteOutlined />}
              type="danger" >删除</Button>
          </Popconfirm>

        </span>
      ),
    }
    ];
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }} >
          <AddOrder />
          <div style={{ display: 'inline' }}   >
            <Button disabled type="primary" icon={<ExportOutlined />} style={{ marginBottom: '10px', marginLeft: '10px' }} > 生成订单</Button>
            <Button disabled type="danger" icon={<DeleteOutlined />} style={{ marginBottom: '10px', marginLeft: '10px' }} > 删除勾选</Button>
          </div>
        </div>
        <Table

          pagination={{ pageSize: 10, }}
          rowKey={record => record._id}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={this.props.order}
        />

        <EditableForm wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          data={this.state.data}
        />
      </div>
    );
  }
}

function cancel(e) {
  console.log(e);
  message.error('已经取消');
}


function mapStateToProps(state) {
  return {
    order: state.user.order,
    isFetching: state.globalState.isFetching
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteOneorder: bindActionCreators(actions.delete_one_order, dispatch),
    getAllorder: bindActionCreators(fetchOrderAction.get_all_order, dispatch),
    saveOneorder: bindActionCreators(actions.save_one_order, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyTable)

