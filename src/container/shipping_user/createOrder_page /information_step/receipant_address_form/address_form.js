// import { Form } from '@ant-design/compatible';
import "@ant-design/compatible/assets/index.css";
import {
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  Collapse,
  Steps,
  Divider,
} from "antd";
import React, { Component } from "react";
import {
  Redirect,
  Router,
  Route,
  Switch,
  Link,
  NavLink,
} from "react-router-dom";
import { actions as single_order_form } from "../../../../../reducers/shipping_platform/single_order_form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash";

// export default Address_form
const nameMapCompoment = (props, item) => {
  let value = "";
  let form_item_content = undefined;

  switch (item.type) {
    case "input":
      form_item_content = (
        <Input
          placeholder={item.placehold}
          allowClear={item.key != "receipant_add1"}
        />
      );
      break;
    case "select":
      form_item_content = (
        <Select placeholder={item.placehold}>
          <Select.Option value="default_state1">州一</Select.Option>
          <Select.Option value="default_state2">州二</Select.Option>
          <Select.Option value="default_state3">州三</Select.Option>
        </Select>
      );
      break;
  }
  return (
    <Form.Item
      // hasFeedback={true}
      // validateStatus="warning"
      onBlur={(e) => {
        let obj = {};
        obj[`${item.key}`] = e.target.value;
        props.onBlurToRedux(obj, "receipant_information");
      }}
      name={item.key}
      label={item.label}
      rules={[
        { required: item.is_required },
        { whitespace: true },
        { max: 35 },
      ]}
      initialValue={
        props.receipant_information
          ? props.receipant_information[item.key]
          : undefined
      }
      validateTrigger={item.key == "receipant_state" ? undefined : ["onBlur"]}
    >
      {form_item_content}
    </Form.Item>
  );
};

const show_form_item = (props) => {
  let content = props.content;
  let content_form = content.asset;
  let content_action = content.action;
  let result = [];
  let row_content = [];
  let curent_row_length = 0;
  // setFieldsValue({ sender_add1: { value: props.googlePlace.sender_add1 } })

  for (var i = 0; i < content_form.length; i++) {
    row_content.push(content_form[i]);
    curent_row_length = curent_row_length + content_form[i].span_value;
    if (
      curent_row_length == 24 ||
      (curent_row_length < 24 && i == content_form.length - 1)
    ) {
      let element = (
        <Row key={i} gutter={24}>
          {" "}
          {row_content.map((item, index) => {
            return (
              <Col key={item.key} span={item.span_value}>
                {nameMapCompoment(props, item)}{" "}
              </Col>
            );
          })}{" "}
        </Row>
      );
      row_content = [];
      curent_row_length = 0;
      result.push(element);
    }
  }
  // let action_element = <Row key={i} gutter={24}> {content_action.map((item, index) => { return (<Col key={item.key} span={item.span_value} >{select_compoment(props, item)} </Col>) })} </Row>
  // result.push(action_element)
  return result;
};

class ReceipantAddressForm extends React.Component {
  constructor(props) {
    super(props);
  }
  formRef = React.createRef();
  state = {
    is_first_render: true,
  };

  componentDidMount() {
    this.props.onRef(this);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //     const current_form = this.props.receipant_information
  //     const next_form = nextProps.receipant_information
  //     if (_.isEqual(current_form, next_form) && !this.state.is_first_render) return false
  //     if (this.state.is_first_render)this.setState({is_first_render:false})
  //     return true
  // }

  render() {
    console.log("I did render from receipant-address-form");
    const current_form = this.formRef.current;
    return (
      <Form
        ref={this.formRef}
        layout="vertical"
        onFieldsChange={(changedFields, allFields) => {
          this.props.onChange(
            this.formRef.current,
            this.formRef.current.getFieldsValue()
          );
        }}
        // onValuesChange={(changedFields, allFields) => {
        //     this.props.onChange(current_form, current_form.getFieldsValue())
        // }}
      >
        {show_form_item(this.props)}
      </Form>
    );
  }
}

export default ReceipantAddressForm;
