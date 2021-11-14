// import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Form, Button, Col, Row, Input, Select, Collapse, Steps, Divider } from 'antd';
import React, { Component } from 'react';
import { Redirect, Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import { actions as single_order_form } from '../../../../../reducers/shipping_platform/single_order_form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from "lodash";
import { get, post } from '../../../../../util/fetch';

const nameMapCompoment = (props, state, item) => {
    let value = ''
    let form_item_content = undefined
    let selectIV = props.sender_information.panel_title != '未填写'? props.sender_information[item.key] : undefined
    // let selectIV = state.sender_information[item.key]
    // console.log(selectIV)
    switch (item.type) {
        case "input":
            form_item_content = (<Input placeholder={item.placehold} allowClear={item.key != 'sender_add1'} />)
            break;
        case "select":
            form_item_content =
                (<Select placeholder={item.placehold}  >
                    <Select.Option value="default_state1">州一</Select.Option>
                    <Select.Option value="default_state2">州二</Select.Option>
                    <Select.Option value="default_state3">州三</Select.Option>
                </Select>)
            break;
    }
    return (
        <Form.Item
            // hasFeedback={true}
            // validateStatus="warning"
            name={item.key}
            label={item.label}
            onBlur={(e) => {
                let obj = {};
                obj[`${item.key}`] = e.target.value;
                props.onBlurToRedux(obj, "sender_information");
              }}
            rules={[
                { required: item.is_required },
                { whitespace: true },
                { max: 35 }
            ]}
            initialValue={selectIV}
            validateTrigger={item.key == 'sender_state' ? undefined : ["onBlur",]}
        >
            {form_item_content}
        </Form.Item>)
}

const show_form_item = (props, state) => {
    let content = props.content
    let content_form = content.asset
    let content_action = content.action
    let result = []
    let row_content = []
    let curent_row_length = 0
    // setFieldsValue({ sender_add1: { value: props.googlePlace.sender_add1 } })

    for (var i = 0; i < content_form.length; i++) {
        row_content.push(content_form[i])
        curent_row_length = curent_row_length + content_form[i].span_value
        if (curent_row_length == 24 || (curent_row_length < 24 && i == content_form.length - 1)) {
            let element = <Row key={i} gutter={24}> {row_content.map((item, index) => { return (<Col key={item.key} span={item.span_value} >{nameMapCompoment(props, state, item)} </Col>) })} </Row>
            row_content = []
            curent_row_length = 0
            result.push(element)
        }
    }
    // let action_element = <Row key={i} gutter={24}> {content_action.map((item, index) => { return (<Col key={item.key} span={item.span_value} >{select_compoment(props, item)} </Col>) })} </Row>
    // result.push(action_element)
    return result
}


class SenderAddressForm extends React.Component {
    constructor(props) {
        super(props)
        this.formRef = React.createRef();
    }

    state = {
        is_first_render: true,
        sender_information: {

        }
    }

    formRef = React.createRef();

    // componentDidMount() {
    //     this.props.onRef(this)
    // }

    componentDidMount = async () => {
        // console.log(this.props.sender_information)
        this.props.onRef(this)
        // try {
        //     if (this.props.sender_information.panel_title == '未填写') {
        //         let result = await post('/user/get_address', { type: 'default' })
        //         if (result.data.docs.length != 0) {
        //             let obj = { 'sender_information': undefined }
        //             let { type, nickname, first_name, last_name, phone_number, company, address_one, address_two, city, zip_code, state, } = result.data.docs[0]

        //             let add_second = address_two ? " , " + address_two + ' , ' : " , "
        //             let panel_title = first_name + ' ' + last_name + ' , ' + address_one + add_second + city + ' , ' + state + ' ' + zip_code
        //             obj['sender_information'] = {
        //                 is_ready: true,
        //                 panel_title,
        //                 font_type: 'strong',
        //                 sender_name: first_name + ' ' + last_name,
        //                 sender_phone_number: phone_number,
        //                 sender_company: company,
        //                 sender_add1: address_one,
        //                 sender_add2: address_two,
        //                 sender_zip_code: zip_code,
        //                 sender_city: city,
        //                 sender_state: state,
        //             }
        //             this.formRef.current.setFieldsValue( {...obj.sender_information} )
        //             this.props.get_form_info(obj)
        //         }
        //     }
        // } catch (error) {
        //     console.log(error)
        // }
    }

    // componentDidUpdate = () => {
    //     console.log(this.props.sender_information)

    // }

    shouldComponentUpdate(nextProps, nextState) {
        const current_form = this.props.sender_information
        const next_form = nextProps.sender_information
        if (_.isEqual(current_form, next_form) && !this.state.is_first_render) return false
        if (this.state.is_first_render) this.setState({ is_first_render: false })
        return true
    }


    render() {
        // console.log('I did render from sender-address-form')
        // console.log(this.state)
        // console.log(this.props.sender_information)
        const current_form = this.formRef.current
        return (
            <Form
                ref={this.formRef}
                layout='vertical'
                onFieldsChange={(changedFields, allFields) => {
                    this.props.onChange(current_form, current_form.getFieldsValue())
                }}
            // onValuesChange={(changedFields, allFields) => {           
            //     this.props.onChange(current_form, current_form.getFieldsValue())
            // }}
            >
                { show_form_item(this.props, this.state)}
            </Form>
        )
    }
}

// export default SenderAddressForm

function mapStateToProps(state) {
    return {
        sender_information: state.shipping_platform_single_order.form.sender_information,
        service_information: state.shipping_platform_single_order.form.service_information,
        setting: state.shipping_platform_single_order.form.setting
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
)(SenderAddressForm)