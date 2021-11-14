// import { Form } from '@ant-design/compatible';
import "@ant-design/compatible/assets/index.css";
import {
  Radio,
  InputNumber,
  Form,
  Typography,
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
import _ from "lodash";
import ShortUniqueId from "short-unique-id";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import CropSquareOutlinedIcon from "@material-ui/icons/CropSquareOutlined";
import {
  CaretRightOutlined,
  DoubleRightOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { actions as single_order_form } from "../../../../../reducers/shipping_platform/single_order_form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
const uid = new ShortUniqueId();

const { Panel } = Collapse;
const { Text } = Typography;
const { Title } = Typography;
const plainOptions = ["lb/in", "oz/in", "kg/cm"];

const selectAfterWeight = (
  <Select defaultValue="lb" style={{ width: 60 }}>
    <Option value="oz">oz</Option>
    <Option value="lb">lb</Option>
    <Option value="kg">kg</Option>
    <Option value="g">kg</Option>
  </Select>
);

const selectAfterLength = (
  <Select defaultValue="inch" style={{ width: 80 }}>
    <Option value="inch">inch</Option>
    <Option value="feet">feet</Option>
    <Option value="m">m</Option>
    <Option value="cm">cm</Option>
  </Select>
);
// 创建form
const select_compoment = (props, item, parcel) => {
  // let test_data = props.data? props.data[item.key]: undefined
  // console.log(test_data)
  let form_item_content = undefined;
  switch (item.type) {
    case "unit":
      form_item_content = (
        <Radio.Group defaultValue="lb/in" buttonStyle="solid">
          <Radio.Button value="lb/in">lb/in</Radio.Button>
          <Radio.Button value="oz/in">oz/in</Radio.Button>
          <Radio.Button value="kg/cm">kg/cm</Radio.Button>
        </Radio.Group>
      );
      break;
    case "input":
      form_item_content = <Input placeholder={item.placehold} />;
      break;
    case "numberInput":
      form_item_content = (
        <InputNumber placeholder={item.placehold} style={{ width: "100%" }} />
      );
      break;
    case "select":
      form_item_content = (
        <Select placeholder={item.placehold}>
          <Select.Option value="default_state1">1</Select.Option>
          <Select.Option value="default_state2">2</Select.Option>
          <Select.Option value="default_state3">3</Select.Option>
          <Select.Option value="default_state3">4</Select.Option>
          <Select.Option value="default_state3">5</Select.Option>
        </Select>
      );
      break;
    // case "save_link":
    //     form_item_content = (<a onClick={() => { compoment.submit_info(getFieldsValue(), compoment.props.profile, compoment.props.id_no) }} disabled={!is_ready(compoment)} style={{ fontSize: '16px' }}> {item.placehold}</a>)
    //     break;
    // case "reset_link":
    //     form_item_content = (<a onClick={() => { compoment.reset_info(compoment.props.profile) }} style={{ fontSize: '16px' }}> {item.placehold}</a>)
    //     break;
  }

  let content = (
    <Form.Item
      name={item.key}
      key={uid}
      onBlur={(e) => {
        // console.log(e.target.value);
        let obj = {};
        obj[`${item.key}`] = e.target.value;
        props.onBlurToRedux(obj);
      }}
      // hasFeedback={true}
      // validateStatus="warning"
      // trigger ="onBlur"
      label={item.label}
      rules={[
        { required: item.is_required },
        //todo 添加数据验证
        // { type: "number", max: 20 }
      ]}
      initialValue={parcel ? parcel[item.key] : undefined}
      validateTrigger={["onBlur"]}
    >
      {form_item_content}
    </Form.Item>
  );

  return content;
};

const display_form = (props) => {
  let parcel = props.parcel;
  let content_form = props.asset.form;
  // let content_action = content_form.action
  let result = [];
  let row_content = [];
  let curent_row_length = 0;

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
                {select_compoment(props, item, parcel)}{" "}
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
  // let action_element = <Row key={i} gutter={24}> {content_action.map((item, index) => { return (<Col key={item.key} span={item.span_value} >{select_compoment(this, item)} </Col>) })} </Row>
  // result.push(action_element)
  return result;
};

const is_ready_form = (content, form) => {
  const { getFieldDecorator, getFieldsError, getFieldsValue } = form;
  const is_rendered = _.isEmpty(getFieldsError()) ? false : true;
  const has_error = !_.isEmpty(
    _.pickBy(
      getFieldsError().filter((item) => !_.isEmpty(item.errors)),
      _.identity
    )
  );
  const is_filled =
    _.difference(
      content.form
        .filter((item) => item.is_required == true)
        .map((item) => item.key),
      _.keys(_.pickBy(getFieldsValue(), _.identity))
    ).length === 0;
  return is_rendered && !has_error && is_filled;
};

// 创建component
class Parcel_component extends React.Component {
  constructor(props) {
    super(props);
  }
  formRef = React.createRef();
  state = {
    title: this.props.title,
  };

  //每一个包裹完输入完毕后，递交到外层
  onchange_data = (form, data, unit_length, unit_weight) => {
    //直接触发重置 付款 和渠道 panel
    //子panel tile 直接改为编辑中
    this.props.rest_sev_pay_form();
    let parcel_data = {
      key: this.props.id_no,
      panel_title: undefined,
      font_type: undefined,
      pack_info: data,
    };
    parcel_data.panel_title = "编辑中";
    parcel_data.font_type = "warning";

    if (
      this.state.title != "编辑中" &&
      !is_ready_form(this.props.content, form)
    ) {
      this.setState({ title: "编辑中" });
      this.props.submit_info(parcel_data);
    }
  };

  onBlurToRedux = (data) => {
    let parcel_data = {
      key: this.props.id_no,
      panel_title: undefined,
      font_type: undefined,
      pack_info: {
        ...this.formRef.current.getFieldsValue(),
        ...data,
      },
    };

    parcel_data.panel_title = is_ready_form(
      this.props.content,
      this.formRef.current
    )
      ? `重量 ：${parcel_data.pack_info.weight} ${this.props.unit_weight}，  尺寸 ： ${parcel_data.pack_info.length}  x  ${parcel_data.pack_info.width}  x  ${parcel_data.pack_info.height} ${this.props.unit_length}`
      : "编辑中";
    parcel_data.font_type = is_ready_form(
      this.props.content,
      this.formRef.current
    )
      ? "strong"
      : "warning";
    console.log(parcel_data);
    this.setState({ title: parcel_data.panel_title });
    this.props.submit_info(parcel_data);
  };
  //   parcel_data.panel_title = is_ready_form(this.props.content, form)
  //     ? `重量 ：${data.weight} ${unit_weight}，  尺寸 ： ${data.length}  x  ${data.width}  x  ${data.height} ${unit_length}`
  //     : "编辑中";
  //   parcel_data.font_type = is_ready_form(this.props.content, form)
  //     ? "strong"
  //     : "warning";
  // };

  onChangeUnit = () => {
    console.log("unit changed");
  };

  componentWillReceiveProps = (nextProps) => {
    if (
      nextProps.unit_length == this.props.unit_length &&
      nextProps.unit_weight == this.props.unit_weight
    ) {
      console.log("unit is not changed");
    } else {
      console.log(this.props.data);
      this.formRef.current.setFieldsValue(this.props.data);
      let {
        weight,
        length,
        width,
        height,
      } = this.formRef.current.getFieldsValue();

      let panel_title = is_ready_form(this.props.content, this.formRef.current)
        ? `重量 ：${weight} ${nextProps.unit_weight}，  尺寸 ： ${length}  x  ${width}  x  ${height} ${nextProps.unit_length}`
        : "编辑中";
      this.setState({ title: panel_title });
    }
  };

  reset = () => {
    console.log("weizhishi " + this.props.position);

    console.log(this.props.id_no);
    console.log("wo bei chu fale ");
    this.formRef.current.setFieldsValue({
      same_pack: 1,
      weight: undefined,
      length: undefined,
      width: undefined,
      height: undefined,
      order_id: undefined,
      reference: undefined,
    });
    this.setState({ title: "未录入" });
  };

  componentDidMount = () => {
    if (this.props.id_no == "first_pak") this.props.onRef(this);
    console.log("i rendered");
  };

  render() {
    const obj = {
      parcel: this.props.data,
      asset: this.props.content,
      onBlurToRedux: (data) => this.onBlurToRedux(data),
    };
    return (
      <div style={{ paddingLeft: 48, paddingRight: 48 }}>
        <Collapse
          key={this.props.id_no}
          style={{
            marginBottom: 12,
            background: "#ffffff",
            boxShadow: "rgb(204, 204, 204) 0px 0px 6px",
          }}
          bordered={false}
          expandIcon={({ isActive }) => {
            if (!this.props.is_mutiple_pack) {
              return <RightOutlined rotate={isActive ? 90 : 0} />;
            } else {
              return <DoubleRightOutlined rotate={isActive ? 90 : 0} />;
            }
          }}
          activeKey={
            this.props.parcel.is_panel_opened ? [this.props.id_no] : []
          }
          onChange={(e) => this.props.handle_panel(e, this.props.id_no)}
        >
          <Panel
            forceRender
            style={{ background: "#f7f7f7", bordered: "0px" }}
            key={this.props.id_no}
            header={
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>
                  <Text style={{ fontWeight: 500, marginTop: 2 }}>
                    包裹{" "}
                    {this.props.tag_start == this.props.tag_end
                      ? this.props.tag_start
                      : `${this.props.tag_start} - ${this.props.tag_end} `}{" "}
                    -{" "}
                  </Text>{" "}
                  <Text
                    style={{ fontSize: 11 }}
                    type={this.props.font_type}
                    strong
                  >
                    {" "}
                    {/* {this.props.title} */}
                    {this.state.title}
                  </Text>
                </span>
                <IconButton
                  hidden={this.props.id_no == "first_pak" ? true : false}
                  size="small"
                  aria-label="delete"
                  onClick={(event) => {
                    event.stopPropagation();
                    this.props.remove(this.props.id_no);
                  }}
                >
                  <DeleteOutlineOutlinedIcon fontSize="small" />
                </IconButton>
              </div>
            }
          >
            <div
              style={{ background: "#F8F8F8", padding: " 16px 32px 0px 32px" }}
            >
              {/* <Select key={this.props.id_no} defaultValue="选择一个产品，或者添加新产品" style={{ marginBottom: 16, width: 300 }} >
                                <Select.Option value="default">默认产品</Select.Option>
                                <Select.Option value="product1">默认产品1</Select.Option>
                                <Select.Option value="product2">默认产品2</Select.Option>
                            </Select> */}
              {/* <Parcel_form
                parcel={this.props.data}
                asset={this.props.content}
                onChange={(form, data) => this.onchange_data(form, data)}
              /> */}

              <Form
                ref={this.formRef}
                layout="vertical"
                // form={form}
                onFieldsChange={(changedFields, allFields) => {
                  // this.props.onChangeValue(changedFields)
                  this.onchange_data(
                    this.formRef.current,
                    this.formRef.current.getFieldsValue(),
                    this.props.unit_length,
                    this.props.unit_weight
                  );
                }}
              >
                {display_form(obj)}
              </Form>
            </div>
          </Panel>
        </Collapse>
      </div>
    );
  }
}

export default Parcel_component;
