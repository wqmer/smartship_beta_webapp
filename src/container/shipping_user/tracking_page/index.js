import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import 'antd/dist/antd.css';
import _ from 'lodash'
import moment from 'moment'
import ShortUniqueId from 'short-unique-id';
import { handle_error } from '../../../util/error'
import {
    get,
    post
} from '../../../util/fetch';

import {
    CheckCircleTwoTone,
    CloseCircleTwoTone,
    ExclamationCircleTwoTone,
    LoadingOutlined,
} from '@ant-design/icons';

import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';

import {
    Alert,
    Empty,
    Spin,
    Table,
    PageHeader,
    Timeline,
    Button,
    Modal,
    Input,
    Radio,
    Select,
    Row,
    Col,
    message,
    Divider,
    Tabs,
} from 'antd';

import { actions as shipping_tool_actions } from '../../../reducers/shipping_platform/tool'

const uid = new ShortUniqueId();

const { TextArea } = Input;
const { TabPane } = Tabs;
const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};



const get_clear_data = (compoment) => {
    if (compoment.props.form.getFieldValue('tracking_number') == undefined) { 
        return [] 
    } else {
        let filter_data = (string) => _.trim(string.replace(/[\u4e00-\u9fff\u3400-\u4dff\uf900-\ufaff]/g, ''))
        let data = _.map(compoment.props.form.getFieldValue('tracking_number').split(/[\n ,]+/), filter_data)
        return (_.compact(_.uniq(data)))
    }
}

const Tracking_page = Form.create()(
    // eslint-disable-next-line
    class extends React.Component {
        state = {
            visible: false,
            is_fetching: false,
            result: [],
            input_length: 0
        };

        fetch_data = (request_data) => {
            const { resetFields } = this.props.form
            this.setState({ is_fetching: true })
            // message.loading({ content: '查询轨迹中', key: 'tracking', duration: 0 })
            post('/user/get_tracking', request_data)
                .then(payload => {
                    console.log(payload)
                    message.success({ content: '查询成功', key: 'tracking', duration: 1 });
                    this.setState({
                        is_fetching: false,
                        result: payload.data.result
                    })
                    // window.scrollTo(0, 600)
                })
                .catch(error => {
                    console.log(error);
                    message.error({ content: '查询失败', key: 'tracking', duration: 2 });
                    this.setState({
                        is_fetching: false,
                    })
                })
                .finally()
        }



        hideModal = () => {
            this.setState({
                visible: false,
            });
        };

        error = (select_record) => {
            Modal.error({
                title: '发生错误',

                content: select_record.message,
            });
        }

        info = (select_record) => {
            select_record.data.Events != undefined ?
                Modal.info({
                    title: '轨迹详情',
                    width: 550,
                    content: (
                        <Timeline style={{ marginTop: '36px',  maxHeight: 400 }} >
                            {
                                select_record.data.Events.map((item) => {
                                    return (<Timeline.Item key={item.Timestamp + uid.randomUUID(6)}>
                                        <div style={{ fontWeight: 'bold' }}>{item.EventDescription}  </div>
                                        <div><span>{moment(item.Timestamp).utc().format('LLLL')} </span></div>
                                        <div><span>{item.Address.City} </span> <span style={{ marginLeft: '5px' }}>{item.Address.StateOrProvinceCode} </span> </div>
                                    </Timeline.Item>)
                                })}
                        </Timeline>
                    ),
                    onOk() { },
                }) :
                Modal.warning({
                    title: '发生未知错误',
                    content: (<span>此跟踪号存在问题或者匹配多条信息，详情请点击 <a target="_blank" href={`https://www.fedex.com/apps/fedextrack/?tracknumbers=${select_record.trackingNo}`}>官网</a> 查询</span>)
                });
        }

        handle_submit = () => {
            this.props.form.validateFields((err, values) => {
                const { getFieldValue, getFieldDecorator, setFieldsValue, getFieldsValue, resetFields } = this.props.form
                //处理数据
                if (!err) {
                    let tracking_array = get_clear_data(this).map(item => { return { "trackingNumber": item } })
                    this.fetch_data({ parcels: tracking_array })
                }
                // resetFields()       
            })
        }

        handel_reset = () => {
            const { getFieldDecorator, setFieldsValue, getFieldsValue, resetFields } = this.props.form
            resetFields()
        }

        display_result = () => {
            const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
            const columns_success = [
                {
                    title: '跟踪号',
                    dataIndex: 'trackingNo',
                    key: 'trackingNo',
                    render: (tracking_number) => <a onClick={() => {
                        let select_record = this.state.result.find(item => item.trackingNo == tracking_number)
                        // let select_record = this.props.tracking_result.find(item => item.trackingNo == tracking_number)
                        select_record.status == "ERROR" || select_record.status == "FAILURE" ? this.error(select_record) : this.info(select_record)
                    }}>{tracking_number}</a>
                },
                {
                    title: '查询状态',
                    dataIndex: 'status',
                    key: 'server_status',
                    render: (text, row) => {
                        if (text == 'SUCCESS') {
                            return row.data == undefined ?
                                <span>
                                    <ExclamationCircleTwoTone style={{ marginRight: '5px' }} twoToneColor="#FFA500" />未知错误
                                </span>
                                :
                                <span>
                                    <CheckCircleTwoTone style={{ marginRight: '5px' }} twoToneColor="#52c41a" />成功查询
                                </span>;
                        } else {
                            return (
                                <span>
                                    <CloseCircleTwoTone style={{ marginRight: '5px' }} twoToneColor="#FF0000" /> 查询失败
                                </span>
                            );
                        }
                    }
                },
                {
                    title: '当前物流状态',
                    dataIndex: ['data' , 'Events'],
                    key: 'status',
                    render: (events) => events[0].EventDescription == undefined ? '无法获取信息物流状态，请点击跟踪号获取详情' : events[0].EventDescription  
                },
                {
                    title: '最近更新时间',
                    dataIndex: 'data.Events[0].Timestamp',
                    key: 'time',
                    render: (Timestamp) => moment(Timestamp).utc().format('LLLL')
                },
            ]

            if (this.state.result == undefined) {
                return (<Spin size="large" indicator={antIcon} spinning={this.props.isFetching}> <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<span>此处出现结果</span>} />  </Spin>)
            }
            // if (this.props.tracking_result == undefined) {
            //     return (<Spin tip="获取数据中" size="large" indicator={antIcon} spinning={this.props.isFetching}> <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<span>此处出现结果</span>} />  </Spin>)
            // }
            else {
                return (
                    <div>
                        <Spin
                            // size="large"
                            // indicator={antIcon}
                            spinning={this.state.is_fetching}>
                            {this.state.result.length == 0 ? <Empty /> :
                                <Table
                                    bordered
                                    rowKey={record => record.trackingNo + uid.randomUUID(6)}
                                    columns={columns_success}
                                    dataSource={this.state.result} />
                            }

                        </Spin>
                    </div>
                )
            }
        }

        componentDidMount() {
            window.scrollTo(0, 0)
        }

        render() {
            const {
                visible, onCancel, onCreate, form,
            } = this.props;

            const { getFieldValue, getFieldDecorator } = form;

            const Option = Select.Option;

            function handleChange(value) {
                console.log(`selected ${value}`);
            }

            function cancel(e) {
                console.log(e);
                message.error('Click on No');
            }
            function callback(key) {
                console.log(key);
            }

            return (
                <div >
                    <Form style={{ background: '#fff', padding: 32, marginBottom: 24 }}>
                        <Row gutter={24}>
                            <Col span={12} >
                                <Alert
                                    style={{ marginBottom: 6 }}
                                    message={<span><span>{`当前已输入 ${get_clear_data(this).length} 条. `}</span><a disabled = {this.state.is_fetching} onClick={this.handel_reset}> 清除</a></span>}
                                    type="info" showIcon />
                            </Col>
                        </Row>

                        <Row gutter={24}>
                            <Col span={12} >
                                <FormItem  >
                                    {getFieldDecorator('tracking_number', {
                                        rules: [{ required: true, message: '请输入跟踪号' }],
                                    })(
                                        <TextArea
                                            disabled={this.state.is_fetching}
                                            // value={value}
                                            placeholder="此处输入跟踪号，空行或者用逗号隔开，最大支持30条数据"
                                            autoSize={{ minRows: 10, maxRows: 15 }}
                                        />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>


                        <Row gutter={24}>
                            <Col span={2} >
                                <Button
                                    htmlType="submit"
                                    loading={this.state.is_fetching}
                                    onClick={() => {
                                        this.handle_submit()
                                        //    this.props.get_tracking()
                                    }}
                                    type='primary'>查询</Button>
                            </Col>

                            {/* <Col span={2} >
                                <Button
                                    htmlType="submit"
                                    disabled = {this.state.is_fetching}
                                    onClick={() => {
                                        this.handel_reset()
                                    }}
                                >
                                    清空
                                </Button>
                            </Col> */}
                        </Row>
                    </Form>

                    <Tabs style={{ background: '#fff', padding: 32 }} onChange={callback} type="card">
                        <TabPane tab="结果页" key="1">
                            {this.display_result()}
                        </TabPane>
                        <TabPane tab="近期查询" key="2">
                            Content of Tab Pane 2
                        </TabPane>
                        <TabPane tab="跟踪列表" key="3">
                            Content of Tab Pane 3
                        </TabPane>
                    </Tabs>
                </div>
            );
        }
    }
);


function mapStateToProps(state) {
    return {
        tracking_result: state.shipping_platform_tool.tracking_result,
        //    order:state.user.order,
        isFetching: state.globalState.isFetching
    }
}

function mapDispatchToProps(dispatch) {
    return {
        get_tracking: bindActionCreators(shipping_tool_actions.get_tracking, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Tracking_page)
