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
  DatePicker,
  Tag,
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

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _, { times } from "lodash";
// import { get, post } from "../../../../../util/fetch";
import moment from "moment";
import { ItemMeta } from "semantic-ui-react";

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

const { RangePicker } = DatePicker;

const nameMapCompoment = (item, form) => {
  let value = "";
  let form_item_content = undefined;

  // let selectIV = undefined;

  let selectIV = item.type == "select_tag" ? ["test"] : undefined;
  // console.log(selectIV)
  switch (item.type) {
    case "range_pick":
      form_item_content = (
        <RangePicker
        size="large"
          placeholder={["开始时间", "结束时间"]}
          style={{ width: "100%" }}
          ranges={{
            今天: [moment(), moment()],
            本月: [moment().startOf("month"), moment().endOf("month")],
          }}
          // showTime
          // format="YYYY/MM/DD"
        />
      );
      break;
    case "input":
      form_item_content = (
        <Input
        size="large"
          placeholder={item.placehold}
          allowClear={item.key != "sender_add1"}
        />
      );
      break;
    case "select":
      form_item_content = (
        <Select placeholder={item.placehold}>
          <Select.Option value="1">1</Select.Option>
          <Select.Option value="2">2</Select.Option>
          <Select.Option value="3">3</Select.Option>
        </Select>
      );
      break;

    // case "buttom":
    //   form_item_content = (
    //     <Button
    //       htmlType={item.isFormSubmit ? "submit" : "button"}
    //       type="primary"
    //       icon={item.icon}
    //       disabled={
    //         form
    //         ?  !form.getFieldsError().length == 0

    //         : true
    //       }
    //     >
    //       {item.placehold}
    //     </Button>
    //   );
    //   break;

    case "select_tag":
      form_item_content = (
        <Select
        size="large"
          // bordered={false}
          placeholder={item.placehold}
          // showArrow
          mode="multiple"
          style={{ width: "100%" }}
          options={item.option.map((e) => {
            let default_value = Array.isArray(item.default_value)
              ? item.default_value
              : [item.default_value];
            let obj = {
              value: undefined,
              disabled: false,
            };
            obj.value = e;
            obj.disabled = default_value.includes(e);
            return obj;
          })}
          // defaultValue={["test", "c12"]}
          // tagRender={(props) => {
          //   const { label, value, closable, onClose } = props;
          //   item.default_value = Array.isArray(item.default_value)
          //     ? item.default_value
          //     : [item.default_value];
          //   if (item.default_value.includes(value))
          //     return (
          //       <Tag color="default"  closable={false}>
          //         {value}
          //       </Tag>
          //     );
          //   return (
          //     <Tag
          //       style={{ background: "#f5f5f5" }}
          //       onClose={onClose}
          //       closable={true}
          //     >
          //       {value}
          //     </Tag>
          //   );
          // }}
          // value={["a10", "c12"]}

          // value = {['a10', 'c12'] }
          // onChange={component.handleChange}
        />
      );
      break;
  }

  return (
    <Form.Item
      // hasFeedback={true}
      // validateStatus="warning"
      name={item.key}
      label={item.label}
      // onBlur={(e) => {
      //     let obj = {};
      //     obj[`${item.key}`] = e.target.value;
      //     props.onBlurToRedux(obj, "sender_information");
      //   }}
      rules={
        item.rules
          ? [{ required: item.is_required }].concat(item.rules)
          : [{ required: item.is_required }]
      }
      initialValue={item.default_value}
      // validateTrigger={item.key == "sender_state" ? undefined : ["onBlur"]}
    >
      {form_item_content}
    </Form.Item>
  );
};

export default nameMapCompoment;
