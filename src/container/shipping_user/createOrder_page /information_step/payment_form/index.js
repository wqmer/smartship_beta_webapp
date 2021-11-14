
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import {
    Radio,
    Drawer,
    Col,
    Row,
    message,
    Checkbox,
    Alert,
    Button,
    Typography,
    Select,
    Collapse,
    Steps,
    Divider,
} from 'antd';
import React, { Component } from 'react';
import _ from "lodash";
import { actions as single_order_form } from '../../../../../reducers/shipping_platform/single_order_form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// import Radio from '@material-ui/core/Radio';


const { Panel } = Collapse;
const { Title, Text } = Typography;
const { Step } = Steps;

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
};

const payment_method = [
    { title: '余额支付', key: 'balance', Icon: undefined, content: '当前余额xxxx' },
    { title: 'Paypal', key: "paypal", Icon: undefined, content: "paypal information form" },
    { title: '信用卡', key: "credit", Icon: undefined, content: undefined },
]

class Payment_form extends React.Component {
    constructor(props) {
        super(props)
    }
    state = {
        active_key: [],
        checked: this.props.payment_information.payment_method,
        disabled_method: []
    }

    set_info = (data, step) => {
    }

    reset_info = (step) => {
    }

    get_payment_method = (method) => {


    }

    render() {
        return (
            <div >
                <Collapse
                    activeKey={[this.props.payment_information.payment_method]}
                    accordion
                    // expandIcon={({ isActive }) => <span><Icon type="caret-left" rotate={isActive ? -90 : 0} /></span>}
                    style={{ boxShadow: 'rgb(204, 204, 204) 0px 0px 9px' }}
                    // style={{   background: '#f7f7f7', }}
                    bordered={false}
                    // expandIconPosition="right"
                    // defaultActiveKey={['sender_information']}
                    // ghost
                    onChange={(e) => {
                        if (this.props.payment_information.payment_method == e ||  e == undefined ) return 
           


                        let obj = {
                            payment_information: {
                                // is_required_fetch:true,
                                is_finished: true,
                                payment_method: e,
                                panel_title: '选择' + e + '付款',
                            }
                        }
                        this.props.update_form_info(obj)
                    }}
                >

                    {payment_method.map(item =>
                        <Panel
                            key={item.key}
                            disabled={this.state.disabled_method.includes(item.key)}
                            style={{
                                // background: '#f7f7f7',
                                // background: '#fff',
                                // marginBottom: 12,
                                // marginBottom: 12,
                                // border: 0,
                                // overflow: 'hidden',
                            }}
                            header={
                                <div>
                                    <Radio
                                        disabled={this.state.disabled_method.includes(item.key)}
                                        style={{ display: 'inline', }}
                                        // onChange={(e) => {
                                        //     let update_value = e.target.value
                                        //     this.setState({
                                        //         // active_key: [update_value == 'balance'?undefined :update_value],

                                        //     })
                                        // }}
                                        checked={this.props.payment_information.payment_method == item.key}
                                        value={item.key}
                                    >
                                    </Radio>
                                    <Title
                                        style={{ display: 'inline', marginLeft: '8px', fontSize: '14px' }}
                                        level={4}
                                        type={this.state.disabled_method.includes(item.key) ? "secondary" : "strong"}
                                    >
                                        {item.title}
                                    </Title>
                                </div>}
                            showArrow={false}
                        // key={item.key}
                        >
                            <div style={{ background: '#f5f5f5', padding: " 16px 32px 16px 32px" }}>{item.content}</div>
                        </Panel>
                    )}
                </Collapse>
            </div>
        )
    }
}



// export default Payment_form

function mapStateToProps(state) {
    return {
        order_form: state.shipping_platform_single_order.form,
        receipant_information: state.shipping_platform_single_order.form.receipant_information,
        parcel_information: state.shipping_platform_single_order.form.parcel_information,
        sender_information: state.shipping_platform_single_order.form.sender_information,
        service_information: state.shipping_platform_single_order.form.service_information,
        payment_information: state.shipping_platform_single_order.form.payment_information,
        setting: state.shipping_platform_single_order.form.setting,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        get_form_info: bindActionCreators(single_order_form.get_form_info, dispatch),
        update_form_info: bindActionCreators(single_order_form.update_form_info, dispatch),
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Payment_form)