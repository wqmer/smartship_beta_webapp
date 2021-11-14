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
import { render } from "less";
import React, { Component } from "react";

const content = {
  asset: [
    { "label": '公司名字', "key": "company", "is_required": false, "message": undefined, "placehold": '公司名字，选填', "span_value": 16, type: 'input', },
    { "label": '备注名', "key": "nickname", "is_required": false, "message": undefined, "placehold": '备注名', "span_value": 8, type: 'input', },
    { "label": '姓', "key": "first_name", "is_required": true, "message": undefined, "placehold": '发件人姓，暂时不支持中文', "span_value": 8, type: 'input', },
    { "label": '名', "key": "last_name", "is_required": true, "message": undefined, "placehold": '发件人名，暂时不支持中文', "span_value": 8, type: 'input', },
    { "label": '电话', "key": "phone_number", "is_required": true, "message": undefined, "placehold": '美国电话,必填', "span_value": 8, type: 'input', },
    { "label": '邮件地址', "key": "sender_email", "is_required": false, "message": undefined, "placehold": 'Email地址, 选填', "span_value": 12, type: 'input', },
    {
      label: "地址",
      key: "address_one",
      is_required: true,
      message: undefined,
      placehold: "街道号码，路名，必填项",
      span_value: 16,
      type: "input",
    },
    {
      label: "门牌号码",
      key: "address_two",
      is_required: false,
      message: undefined,
      placehold: "门牌号，选填",
      span_value: 8,
      type: "input",
    },
    {
      label: "邮编",
      key: "zip_code",
      is_required: true,
      message: undefined,
      placehold: "必填项",
      span_value: 6,
      type: "input",
    },
    {
      label: "城市",
      key: "city",
      is_required: true,
      message: undefined,
      placehold: "必填项",
      span_value: 6,
      type: "input",
    },
    {
      label: "州",
      key: "state",
      is_required: true,
      message: undefined,
      placehold: "选择州",
      span_value: 4,
      type: "input",
    },
  ],

  sender_extra: [],
  receipant_extra: [],
  action: [
    // { "key": "save_link", "placehold": '保存', "span_value": 2, type: 'save_link', },
    // { "key": "reset_link", "placehold": '重置', "span_value": 2, type: 'reset_link', },
  ],
};

const show_form_item = (keyMapContent = undefined) => {
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
                {nameMapCompoment(keyMapContent, item)}{" "}
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

const nameMapCompoment = (keyMapContent, item) => {
  let value = "";
  let form_item_content = undefined;

  switch (item.type) {
    case "input":
      form_item_content = (
        <Input
          size="middle"
          placeholder={item.placehold}
          allowClear={item.key != "address_one"}
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
      name={item.key}
      label={item.label}
      rules={[{ required: item.is_required }, { max: 35 }]}
      initialValue={keyMapContent ? keyMapContent[item.key] : undefined}
      validateTrigger={item.key == "state" ? undefined : ["onBlur"]}
    >
      {form_item_content}
    </Form.Item>
  );
};

class AddressForm extends React.Component {
  constructor(props) {
    super(props);
    this.autocomplete = null;
    this.formRef = React.createRef();
  }
  onFinish = (values) => {
    console.log("Success:", values);
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // handlePlaceSelect() {
  //     const current_form = this.child.formRef.current;
  //     let data = current_form.getFieldsValue();
  //     var address = this.autocomplete.getPlace().address_components;
  //     var address_name = this.autocomplete.getPlace().name;
  //     // var address_name = this.autocomplete.getPlace().name
  //     const getAddressComponent = (addressArray, type) => {
  //       return addressArray.find((item) => _.isEqual(item.types, type))
  //         ? addressArray.find((item) => _.isEqual(item.types, type)).short_name
  //         : "";
  //     };
  //     const getState =
  //       getAddressComponent(address, ["country", "political"]) == "US"
  //         ? getAddressComponent(address, [
  //             "administrative_area_level_1",
  //             "political",
  //           ])
  //         : getAddressComponent(address, ["country", "political"]);

  //     let udpateData = {
  //       // sender_add1: getAddressComponent(address, ['street_number']) + ' ' + getAddressComponent(address, ['route']),
  //       sender_add1: address_name,
  //       sender_city: getAddressComponent(address, ["locality", "political"])
  //         ? getAddressComponent(address, ["locality", "political"])
  //         : getAddressComponent(address, [
  //             "sublocality_level_1",
  //             "sublocality",
  //             "political",
  //           ]),
  //       sender_state: getState,
  //       sender_zip_code: getAddressComponent(address, ["postal_code"]),
  //     };
  //     // console.log({...data, ...udpateData })
  //     current_form.setFieldsValue({ ...data, ...udpateData });
  //     this.save_data(
  //       current_form,
  //       { ...data, ...udpateData },
  //       this.props.profile,
  //       "google"
  //     );
  //   }

  handlePlaceSelect() {
    var address = this.autocomplete.getPlace().address_components;
    var address_name = this.autocomplete.getPlace().name;
    let current_form = this.props.form 

    const getAddressComponent = (addressArray, type) => {
      return addressArray.find((item) => _.isEqual(item.types, type))
        ? addressArray.find((item) => _.isEqual(item.types, type)).short_name
        : "";
    };
    const getState =
      getAddressComponent(address, ["country", "political"]) == "US"
        ? getAddressComponent(address, [
            "administrative_area_level_1",
            "political",
          ])
        : getAddressComponent(address, ["country", "political"]);

    let udpateData = {
      address_one: address_name,
      city: getAddressComponent(address, ["locality", "political"])
        ? getAddressComponent(address, ["locality", "political"])
        : getAddressComponent(address, [
            "sublocality_level_1",
            "sublocality",
            "political",
          ]),
      state: getState,
      zip_code: getAddressComponent(address, ["postal_code"]),
    };
    current_form.setFieldsValue({ ...udpateData });
  }

  // componentDidMount() { this.props.onRef(this) }
  componentDidMount() {
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("address_one"),
      {}
    );
    this.autocomplete.setFields(["address_components", "name"]);
    this.autocomplete.addListener("place_changed", () =>
      this.handlePlaceSelect()
    );
  }

  render() {
    let current_form = this.formRef.current;
    return (
      <div
        style={{
          background: "#f5f5f5",
          boxShadow: "rgb(217, 217, 217) 1px 1px 7px 0px",
          // height: 600,
          // width:'80%',
          padding: "36px 24px 56px 24px",
        }}
      >
        <Form
          form={current_form}
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >
          {show_form_item(this.props.content)}
        </Form>
      </div>
    );
  }
}

export default AddressForm;
