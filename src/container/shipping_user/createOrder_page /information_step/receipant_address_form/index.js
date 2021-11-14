import { Form } from "@ant-design/compatible";
import "@ant-design/compatible/assets/index.css";
import {
  Typography,
  Spin,
  Button,
  Col,
  Row,
  Input,
  Select,
  Collapse,
  Steps,
  Divider,
  message,
} from "antd";
import React, { Component } from "react";
import { actions as single_order_form } from "../../../../../reducers/shipping_platform/single_order_form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash";
import Address_form from "./address_form";
import { readExcel } from "../../../../../util/sheet";
import { get, post } from "../../../../../util/fetch";
import {
  PlusOutlined,
  HomeFilled,
  EditFilled,
  PrinterFilled,
  DeleteFilled,
} from "@ant-design/icons";
const { Text } = Typography;

const receipant_content = {
  asset: [
    {
      label: "姓名",
      key: "receipant_name",
      is_required: true,
      message: undefined,
      placehold: "发件人姓名，暂时不支持中文",
      span_value: 8,
      type: "input",
    },
    {
      label: "电话",
      key: "receipant_phone_number",
      is_required: true,
      message: undefined,
      placehold: "美国电话,必填",
      span_value: 8,
      type: "input",
    },
    {
      label: "公司名字",
      key: "receipant_company",
      is_required: false,
      message: undefined,
      placehold: "公司名字，选填",
      span_value: 8,
      type: "input",
    },

    // { "label": '邮件地址', "key": "receipant_email", "is_required": false, "message": undefined, "placehold": 'Email地址,选填', "span_value": 12, type: 'input', },
    {
      label: "地址",
      key: "receipant_add1",
      is_required: true,
      message: undefined,
      placehold: "街道号码，路名，必填项",
      span_value: 24,
      type: "input",
    },
    {
      label: "门牌号",
      key: "receipant_add2",
      is_required: false,
      message: undefined,
      placehold: "门牌号，选填",
      span_value: 8,
      type: "input",
    },
    {
      label: "邮编",
      key: "receipant_zip_code",
      is_required: true,
      message: undefined,
      placehold: "必填项",
      span_value: 6,
      type: "input",
    },
    {
      label: "城市",
      key: "receipant_city",
      is_required: true,
      message: undefined,
      placehold: "必填项",
      span_value: 6,
      type: "input",
    },
    {
      label: "州",
      key: "receipant_state",
      is_required: true,
      message: undefined,
      placehold: "选择州",
      span_value: 4,
      type: "select",
    },
  ],

  sender_extra: [],
  receipant_extra: [],
  action: [
    // { "key": "save_link", "placehold": '保存', "span_value": 2, type: 'save_link', },
    // { "key": "reset_link", "placehold": '重置', "span_value": 2, type: 'reset_link', },
  ],
};

const is_ready_form = (content, props, form) => {
  const { getFieldsError, getFieldsValue } = form;
  const is_rendered = _.isEmpty(getFieldsError()) ? false : true;
  const has_error = !_.isEmpty(
    _.pickBy(
      getFieldsError().filter((item) => !_.isEmpty(item.errors)),
      _.identity
    )
  );
  const is_filled =
    _.difference(
      content.asset
        .filter((item) => item.is_required == true)
        .map((item) => item.key),
      _.keys(_.pickBy(getFieldsValue(), _.identity))
    ).length === 0;
  return is_rendered && !has_error && is_filled;
};

//from form
const getFullAddressForm = (data) => {
  let radd_2 = data.receipant_add2 ? ", " + data.receipant_add2 + ", " : ", ";
  let result =
    data.receipant_name +
    ", " +
    data.receipant_add1 +
    radd_2 +
    data.receipant_city +
    ", " +
    data.receipant_state +
    " " +
    data.receipant_zip_code;
  return result;
};

const getFullAddress = (address_info) => {
  let add_second = address_info.address_two
    ? ", " + address_info.address_two + ", "
    : ", ";
  let result =
    address_info.first_name +
    " " +
    address_info.last_name +
    ", " +
    address_info.address_one +
    add_second +
    address_info.city +
    ", " +
    address_info.state +
    " " +
    address_info.zip_code;
  return result;
};

class Receipant_Address_Form extends React.Component {
  constructor(props) {
    super(props);
    this.autocomplete = null;
  }

  state = {
    open: false,
    isFetching: false,
    value: undefined,
    label: undefined,
    FBAlocation: [],
    data: [],
  };

  rest_sev_pay_form = () => {
    if (
      this.props.billing_information.on_display == false &&
      this.props.service_information.panel_title == "请先完成输入信息" &&
      this.props.payment_information.panel_title == "请先完成输入信息"
    ) {
      return;
    } else {
      //   console.log(123);
      let update_obj = {
        setting: {},
        billing_information: {
          on_display: false,
        },
        service_information: {
          is_select: false,
          service_name: undefined,
          panel_title: "请先完成输入信息",
          font_type: "secondary",
          is_required_fetch: true,
        },
        payment_information: {
          is_finished: false,
          payment_method: undefined,
          panel_title: "请先完成输入信息",
          font_type: "secondary",
          payment_content: [],
        },
      };
      // reset service and payment panel
      update_obj["setting"][
        "open_panel"
      ] = this.props.setting.open_panel.filter(
        (item) => item != "service_information"
      );
      update_obj["setting"]["open_panel"] = update_obj["setting"][
        "open_panel"
      ].filter((item) => item != "payment_information");
      this.props.update_form_info(update_obj);
    }
  };

  //on_change
  save_data = (form, data, step, type) => {
    //只要编辑, 更改选择器状态 ,重置服务，重置付款步骤
    this.rest_sev_pay_form();
    // console.log('I am typing')
    // //修改选择器状态,

    let obj = {};
    obj[`${step}`] = data;
    obj[`${step}`]["nickname"] = "手动输入";
    obj[`${step}`]["_id"] = "new_address";

    //信息处于未完成状态时 如果面板打开或者已经选择服务，就强制收起和修改
    // 考虑 google place 插件 使用
    obj[`${step}`]["panel_title"] =
      type == "google"
        ? !is_ready_form(receipant_content, this.props, form)
          ? "编辑中"
          : getFullAddressForm(data)
        : "编辑中";

    obj[`${step}`]["font_type"] =
      type == "google"
        ? !is_ready_form(receipant_content, this.props, form)
          ? "warning"
          : "strong"
        : "warning";

    obj[`${step}`]["is_ready"] = is_ready_form(
      receipant_content,
      this.props,
      form
    );

    if (
      this.state.label != "手动输入" ||
      this.props.receipant_information["is_ready"] !=
        obj[`${step}`]["is_ready"] ||
      type == "google"
    ) {
      if (this.state.label != "手动输入")
        this.setState({ value: "new_address", label: "手动输入" });
      this.props.get_form_info(obj);
    }
  };

  //防止不改变状态的输入无法保存
  onBlurToRedux = (data, step) => {
    let obj = {};
    const current_form = this.child.formRef.current;
    obj[`${step}`] = { ...this.props.receipant_information, ...data };
    obj[`${step}`]["panel_title"] = !is_ready_form(
      receipant_content,
      this.props,
      current_form
    )
      ? "编辑中"
      : getFullAddressForm(obj[`${step}`]);

    obj[`${step}`]["font_type"] = !is_ready_form(
      receipant_content,
      this.props,
      current_form
    )
      ? "warning"
      : "strong";
    this.props.get_form_info(obj);
  };

  // shouldComponentUpdate(nextProps, nextState) {
  //     const current_form = this.props.receipant_information
  //     const next_form = nextProps.receipant_information
  //     if(_.isEqual(current_form ,next_form)) return false
  //     return true
  // }

  onRef = (ref) => {
    this.child = ref;
  };

  handlePlaceSelect() {
    const current_form = this.child.formRef.current;
    let data = current_form.getFieldsValue();
    var address = this.autocomplete.getPlace().address_components;
    var address_name = this.autocomplete.getPlace().name;

    const getAddressComponent = (addressArray, type) => {
      return addressArray.find((item) => _.isEqual(item.types, type))
        ? addressArray.find((item) => _.isEqual(item.types, type)).short_name
        : "";
    };
    console.log(address);
    const getState =
      getAddressComponent(address, ["country", "political"]) == "US"
        ? getAddressComponent(address, [
            "administrative_area_level_1",
            "political",
          ])
        : getAddressComponent(address, ["country", "political"]);
    let udpateData = {
      receipant_add1: address_name,
      receipant_city: getAddressComponent(address, ["locality", "political"])
        ? getAddressComponent(address, ["locality", "political"])
        : getAddressComponent(address, [
            "sublocality_level_1",
            "sublocality",
            "political",
          ]),
      receipant_state: getState,
      receipant_zip_code: getAddressComponent(address, ["postal_code"]),
    };
    current_form.setFieldsValue({ ...data, ...udpateData });
    this.save_data(
      current_form,
      { ...data, ...udpateData },
      this.props.profile,
      "google"
    );
  }

  fetchFBAAddress = async () => {
    try {
      this.setState({ isFetching: true });
      let result = await post("/user/get_address", { type: "receipant" });
      return result;
    } catch (error) {
      throw error;
    }
  };

  handleChange = (value) => {
    const current_form = this.child.formRef.current;
    let obj = { receipant_information: undefined };
    let _id,
      label,
      nickname,
      add_second,
      panel_title,
      receipant_name,
      receipant_phone_number,
      receipant_company,
      receipant_add1,
      receipant_add2,
      receipant_zip_code,
      receipant_city,
      receipant_state,
      selectValue;

    let address_info = this.state.data.find(
      (item) => item.nickname + getFullAddress(item) == value.value
    );

    //如果是预存地址
    if (address_info) {
      let {
        type,
        first_name,
        last_name,
        phone_number,
        company,
        address_one,
        address_two,
        city,
        zip_code,
        state,
      } = address_info;
      panel_title = getFullAddress(address_info);
      receipant_name = first_name + " " + last_name;
      receipant_phone_number = phone_number;
      receipant_company = company;
      receipant_add1 = address_one;
      receipant_add2 = address_two;
      receipant_city = city;
      receipant_state = state;
      receipant_zip_code = zip_code;
      label =
        address_info.nickname == undefined
          ? "未命名地址"
          : address_info.nickname;
      selectValue = value.value;
      nickname = label;
      //如果是亚马逊地址
    } else {
      address_info = this.state.FBAlocation.find(
        (item) => item.label + item.full_address == value.value
      );
      let { label, full_address, city, zipcode, state } = address_info;
      nickname = label;
      panel_title = "Amazon" + " " + label + ", " + full_address;
      receipant_name = "Amazon" + " " + label;
      receipant_phone_number = "0000000000";
      receipant_company = "Amazon LLC";
      receipant_add1 = address_info.address;
      receipant_add2 = "";
      receipant_zip_code = zipcode;
      receipant_city = city;
      receipant_state = state;
      label = address_info.label;
      selectValue = value.value;
    }
    obj["receipant_information"] = {
      _id: selectValue,
      is_ready: true,
      nickname,
      panel_title,
      font_type: "strong",
      receipant_name,
      receipant_phone_number,
      receipant_company,
      receipant_add1,
      receipant_add2,
      receipant_zip_code,
      receipant_city,
      receipant_state,
    };
    this.rest_sev_pay_form();
    this.setState({ value: selectValue, label });
    current_form.setFieldsValue({ ...obj.receipant_information });
    message.success("收件信息已自动填充");
    this.props.update_form_info(obj);
  };

  reset_address_form = (
    nickname = undefined,
    value = undefined,
    label = undefined,
    ismessageOn = true,
    reduxOn = true
  ) => {
    const current_form = this.child.formRef.current;
    let obj = { receipant_information: undefined };
    obj["receipant_information"] = {
      nickname: "输入新地址",
      _id: "new_address",
      is_ready: false,
      panel_title: "编辑中",
      font_type: "warning",
      receipant_name: undefined,
      receipant_phone_number: undefined,
      receipant_company: undefined,
      receipant_add1: undefined,
      receipant_add2: undefined,
      receipant_zip_code: undefined,
      receipant_city: undefined,
      receipant_state: undefined,
    };
    this.setState({ open: false, value, label });
    current_form.setFieldsValue({ ...obj.receipant_information });
    if (ismessageOn) message.warning("收件信息已重置");
    if (reduxOn) this.props.update_form_info(obj);
  };
  //解决导致有label 的value值，在undefined情况下， 无法出现placeholder
  getSelectValue = () => {
    let value = this.state.value
      ? this.state.value
      : this.props.receipant_information._id
      ? this.props.receipant_information._id
      : undefined;
    let label = this.state.label
      ? this.state.label
      : this.props.receipant_information.nickname
      ? this.props.receipant_information.nickname
      : undefined;

    if (value == undefined && label == undefined) return undefined;
    return {
      value,
      label,
    };
  };

  componentDidMount() {
    this.props.onRef(this);
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("receipant_add1"),
      {}
    );
    this.autocomplete.setFields(["address_components", "name"]);
    this.autocomplete.addListener("place_changed", () =>
      this.handlePlaceSelect()
    );
  }

  render() {
    // console.log('receipant_address form did render')
    return (
      <div
        style={{
          padding: 24,
          background: "#f7f7f7",
          boxShadow: "rgb(217, 217, 217) 1px 1px 7px 0px",
          marginLeft: 48,
          marginRight: 48,
        }}
      >
        <Row gutter={24}>
          <Col span={8}>
            <Select
              // defaultValue={this.props.sender_information.nickname ? this.props.sender_information.nickname : undefined}
              showSearch
              labelInValue={true}
              value={this.getSelectValue()}
              // value={{
              //     value: this.state.value ? this.state.value : this.props.receipant_information._id ? this.props.receipant_information._id : undefined,
              //     label: this.state.label ? this.state.label : this.props.receipant_information.nickname ? this.props.receipant_information.nickname : undefined,
              // }}
              placeholder="选择或者搜索保存地址"
              open={this.state.open}
              notFoundContent={
                this.state.isFetching ? <Spin size="small" /> : null
              }
              onChange={this.handleChange}
              style={{ marginBottom: 18, width: "100%" }}
              onDropdownVisibleChange={async (open) => {
                let current = this.state.open;
                try {
                  if ((current == false) & (this.state.data.length == 0)) {
                    let result = await this.fetchFBAAddress();
                    if (result.code == 0) {
                      this.setState({
                        open: !current,
                        FBAlocation: result.data.FBAlocation,
                        data: result.data.docs,
                        isFetching: false,
                      });
                    }
                  } else {
                    this.setState({ open: !current });
                  }
                } catch (error) {
                  console.log(error);
                }

                // else { this.setState({ open: !current }) }
                // console.log(result)
              }}
              dropdownRender={(menu) => (
                <div>
                  {menu}
                  <Divider style={{ margin: "4px 0" }} />
                  <div
                    style={{ display: "flex", flexWrap: "nowrap", padding: 8 }}
                  >
                    <a
                      style={{
                        flex: "none",
                        padding: "4px",
                        display: "block",
                        cursor: "pointer",
                      }}
                      onClick={this.reset_address_form}
                    >
                      <PlusOutlined /> 输入一个新地址{" "}
                    </a>
                  </div>
                </div>
              )}
            >
              <Select.OptGroup label="预存地址">
                {this.state.data.map((item, index) => (
                  <Select.Option
                    key={item._id}
                    value={item.nickname + getFullAddress(item)}
                  >
                    {" "}
                    {item.nickname ? item.nickname : "未命名地址"}{" "}
                    <Text
                      style={{ marginLeft: 4, fontSize: 12 }}
                      type="secondary"
                    >
                      {getFullAddress(item)}
                    </Text>
                  </Select.Option>
                ))}
              </Select.OptGroup>
              <Select.OptGroup label="FBA地址">
                {this.state.FBAlocation.map((item, index) => (
                  <Select.Option
                    key={item.label}
                    value={item.label + item.full_address}
                  >
                    {" "}
                    {item.label}{" "}
                    <span style={{ fontSize: 12 }}>
                      {" "}
                      <Text type="secondary">{item.full_address}</Text>
                    </span>
                  </Select.Option>
                ))}
              </Select.OptGroup>
            </Select>
          </Col>
        </Row>
        <Address_form
          onBlurToRedux={(data, step) => this.onBlurToRedux(data, step)}
          onRef={this.onRef}
          content={receipant_content}
          receipant_information={this.props.receipant_information}
          onChange={(form, data) =>
            this.save_data(form, data, this.props.profile)
          }
          // onChangeValue={(data) => this.onChangeValue(data)}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    receipant_information:
      state.shipping_platform_single_order.form.receipant_information,
    service_information:
      state.shipping_platform_single_order.form.service_information,
    payment_information:
      state.shipping_platform_single_order.form.payment_information,
    billing_information:
      state.shipping_platform_single_order.form.billing_information,
    setting: state.shipping_platform_single_order.form.setting,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    get_form_info: bindActionCreators(
      single_order_form.get_form_info,
      dispatch
    ),
    update_form_info: bindActionCreators(
      single_order_form.update_form_info,
      dispatch
    ),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Receipant_Address_Form);
