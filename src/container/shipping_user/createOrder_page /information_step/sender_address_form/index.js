import { Form } from "@ant-design/compatible";
import "@ant-design/compatible/assets/index.css";
import {
  Typography,
  notification,
  Button,
  Col,
  Row,
  Input,
  Select,
  Collapse,
  Steps,
  Divider,
  Spin,
  message,
} from "antd";
import React, { Component } from "react";
import { actions as single_order_form } from "../../../../../reducers/shipping_platform/single_order_form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash";
import { get, post } from "../../../../../util/fetch";
import Address_form from "./address_form";
import PlacesAutocomplete from "react-places-autocomplete";
import {
  PlusOutlined,
  HomeFilled,
  EditFilled,
  PrinterFilled,
  DeleteFilled,
} from "@ant-design/icons";
const { Text } = Typography;

const sender_content = {
  asset: [
    {
      label: "姓名",
      key: "sender_name",
      is_required: true,
      message: undefined,
      placehold: "发件人姓名，暂时不支持中文",
      span_value: 8,
      type: "input",
    },
    {
      label: "电话",
      key: "sender_phone_number",
      is_required: true,
      message: undefined,
      placehold: "美国电话,必填",
      span_value: 8,
      type: "input",
    },
    {
      label: "公司名字",
      key: "sender_company",
      is_required: false,
      message: undefined,
      placehold: "公司名字，选填",
      span_value: 8,
      type: "input",
    },

    // { "label": '邮件地址', "key": "sender_email", "is_required": false, "message": undefined, "placehold": 'Email地址, 选填', "span_value": 12, type: 'input', },
    {
      label: "地址",
      key: "sender_add1",
      is_required: true,
      message: undefined,
      placehold: "街道号码，路名，必填项",
      span_value: 24,
      type: "input",
    },
    {
      label: "门牌号码",
      key: "sender_add2",
      is_required: false,
      message: undefined,
      placehold: "门牌号，选填",
      span_value: 8,
      type: "input",
    },
    {
      label: "邮编",
      key: "sender_zip_code",
      is_required: true,
      message: undefined,
      placehold: "必填项",
      span_value: 6,
      type: "input",
    },
    {
      label: "城市",
      key: "sender_city",
      is_required: true,
      message: undefined,
      placehold: "必填项",
      span_value: 6,
      type: "input",
    },
    {
      label: "州",
      key: "sender_state",
      is_required: true,
      message: undefined,
      placehold: "选择州",
      span_value: 4,
      type: "select",
    },
  ],

  sender_extra: [],
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
  // console.log("is_rendered 是 " +  is_rendered )
  // console.log("has_error 是 " +  has_error )
  // console.log("is_filled 是 " +  is_filled )
  return is_rendered && !has_error && is_filled;
};

const getFullAddressForm = (data) => {
  let sadd_2 = data.sender_add2 ? ", " + data.sender_add2 + ", " : ", ";
  let result =
    data.sender_name +
    ", " +
    data.sender_add1 +
    sadd_2 +
    data.sender_city +
    ", " +
    data.sender_state +
    " " +
    data.sender_zip_code;
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

class Sender_Address_Form extends React.Component {
  constructor(props) {
    super(props);
    this.autocomplete = null;
  }

  state = {
    open: false,
    isFetching: false,
    value: undefined,
    label: undefined,
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
        ? !is_ready_form(sender_content, this.props, form)
          ? "编辑中"
          : getFullAddressForm(data)
        : "编辑中";

    obj[`${step}`]["font_type"] =
      type == "google"
        ? !is_ready_form(sender_content, this.props, form)
          ? "warning"
          : "strong"
        : "warning";

    obj[`${step}`]["is_ready"] = is_ready_form(
      sender_content,
      this.props,
      form
    );

    if (
      this.state.label != "手动输入" ||
      this.props.sender_information["is_ready"] != obj[`${step}`]["is_ready"] ||
      type == "google"
    ) {
      if (this.state.label != "手动输入")
        this.setState({ value: "new_address", label: "手动输入" });
      this.props.get_form_info(obj);
    }
  };

  onBlurToRedux = (data, step) => {
    let obj = {};
    const current_form = this.child.formRef.current;
    obj[`${step}`] = { ...this.props.sender_information, ...data };
    obj[`${step}`]["panel_title"] = !is_ready_form(
      sender_content,
      this.props,
      current_form
    )
      ? "编辑中"
      : getFullAddressForm(obj[`${step}`]);

    obj[`${step}`]["font_type"] = !is_ready_form(
      sender_content,
      this.props,
      current_form
    )
      ? "warning"
      : "strong";
    this.props.get_form_info(obj);
  };

  onRef = (ref) => {
    this.child = ref;
  };

  formSetFieldVaule(data) {
    const current_form = this.child.formRef.current;
    current_form.setFieldsValue(data);
  }

  handlePlaceSelect() {
    const current_form = this.child.formRef.current;
    let data = current_form.getFieldsValue();
    var address = this.autocomplete.getPlace().address_components;
    var address_name = this.autocomplete.getPlace().name;
    // var address_name = this.autocomplete.getPlace().name
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
      // sender_add1: getAddressComponent(address, ['street_number']) + ' ' + getAddressComponent(address, ['route']),
      sender_add1: address_name,
      sender_city: getAddressComponent(address, ["locality", "political"])
        ? getAddressComponent(address, ["locality", "political"])
        : getAddressComponent(address, [
            "sublocality_level_1",
            "sublocality",
            "political",
          ]),
      sender_state: getState,
      sender_zip_code: getAddressComponent(address, ["postal_code"]),
    };
    // console.log({...data, ...udpateData })
    current_form.setFieldsValue({ ...data, ...udpateData });
    this.save_data(
      current_form,
      { ...data, ...udpateData },
      this.props.profile,
      "google"
    );
  }

  fetchAddress = async () => {
    try {
      this.setState({ isFetching: true });
      let result = await post("/user/get_address");
      return result;
    } catch (error) {
      throw error;
    }
  };

  handleChange = (value) => {
    const current_form = this.child.formRef.current;
    let obj = { sender_information: undefined };
    let _id,
      label,
      nickname,
      add_second,
      panel_title,
      sender_name,
      sender_phone_number,
      sender_company,
      sender_add1,
      sender_add2,
      sender_zip_code,
      sender_city,
      sender_state,
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
      sender_name = first_name + " " + last_name;
      sender_phone_number = phone_number;
      sender_company = company;
      sender_add1 = address_one;
      sender_add2 = address_two;
      sender_city = city;
      sender_state = state;
      sender_zip_code = zip_code;
      label =
        address_info.nickname == undefined
          ? "未命名地址"
          : address_info.nickname;
      selectValue = value.value;
      nickname = label;
      //如果是亚马逊地址
    }
    obj["sender_information"] = {
      _id: selectValue,
      is_ready: true,
      is_require_fetch: false,
      nickname,
      panel_title,
      font_type: "strong",
      sender_name,
      sender_phone_number,
      sender_company,
      sender_add1,
      sender_add2,
      sender_zip_code,
      sender_city,
      sender_state,
    };
    this.rest_sev_pay_form();
    this.setState({ value: selectValue, label });
    current_form.setFieldsValue({ ...obj.sender_information });
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
    let obj = { sender_information: undefined };
    obj["sender_information"] = {
      nickname: "输入新地址",
      _id: "new_address",
      is_ready: false,
      panel_title: "编辑中",
      font_type: "warning",
      sender_name: undefined,
      sender_phone_number: undefined,
      sender_company: undefined,
      sender_add1: undefined,
      sender_add2: undefined,
      sender_zip_code: undefined,
      sender_city: undefined,
      sender_state: undefined,
    };
    this.setState({ open: false, value, label });
    current_form.setFieldsValue({ ...obj.sender_information });
    if (ismessageOn) message.warning("发件信息已重置");
    if (reduxOn) this.props.update_form_info(obj);
  };

  //解决导致有label 的value值，在undefined情况下， 无法出现placeholder
  getSelectValue = () => {
 
    let value = this.state.value
      ? this.state.value
      : this.props.sender_information._id
      ? this.props.sender_information._id
      : undefined;
    let label = this.state.label
      ? this.state.label
      : this.props.sender_information.nickname
      ? this.props.sender_information.nickname
      : undefined;
      if (value != undefined && label === undefined) return {
        value,
        label :'未命名地址',
      };
      if (value === undefined && label === undefined) return undefined;


    return {
      value,
      label,
    };
  };
  // shouldComponentUpdate(nextProps, nextState) {
  //     const current_form = this.props.sender_information
  //     const next_form = nextProps.sender_information
  //     if (_.isEqual(current_form, next_form)) return false
  //     return true
  // }

  componentDidMount = async () => {
    this.props.onRef(this);
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("sender_add1"),
      {}
    );
    this.autocomplete.setFields([
      "address_components",
      "name",
      "formatted_address",
    ]);
    this.autocomplete.addListener("place_changed", () =>
      this.handlePlaceSelect()
    );
  };

  render() {
    // console.log(this.state.data)
    // console.log(this.state.googlePlace)
    // console.log(this.props.address_info)
    // console.log('sender_address form did render')
    // console.log(this.props.children)
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
              showSearch
              labelInValue={true}
              value={this.getSelectValue()}
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
                  if (
                    this.props.sender_information.is_require_fetch ||
                    (current == false && this.state.data.length == 0)
                  ) {
                    console.log("i am fetching address");
                    let result = await this.fetchAddress();
                    if (result.code == 0) {
                      this.setState({
                        open: !current,
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
            </Select>
          </Col>
        </Row>

        {/* <Input
                    id='test'
                    // onFocus ={(e) => e.stopPropagation()}
                    // value={this.state.sender_add1.value}
                    // onBlur = {(e) => this.setState({ sender_add1: e.target.value })}
                    // onChange={(e) => this.setState({ sender_add1:{ value: e.target.value }})}
                />  */}

        <Address_form
          onRef={this.onRef}
          onBlurToRedux={(data, step) => this.onBlurToRedux(data, step)}
          content={sender_content}
          sender_information={this.props.sender_information}
          onChange={(form, data) =>
            this.save_data(form, data, this.props.profile)
          }
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    sender_information:
      state.shipping_platform_single_order.form.sender_information,
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
)(Sender_Address_Form);
