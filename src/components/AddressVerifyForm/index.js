import {
  Space,
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  Collapse,
  Steps,
  Divider,
  Descriptions,
  Badge,
  Table,
  Tag,
  message,
  Typography,
  Alert,
  Icon,
  Spin,
} from "antd";
import ShortUniqueId from "short-unique-id";
import { render } from "less";
import React, { Component } from "react";
import { get, post } from "../../util/fetch";
import {
  CloseCircleTwoTone,
  QuestionCircleTwoTone,
  InfoCircleTwoTone,
  CheckCircleTwoTone,
  SearchOutlined,
  RedoOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import parseAddress from "parse-address";
import { ItemMeta } from "semantic-ui-react";

const { Title } = Typography;

const { Text, Link, Paragraph } = Typography;

const { TextArea } = Input;

const uid = new ShortUniqueId();

const reslutToTag = (data_result) => {
  let record_type = {
    F: "企业",
    G: "邮局寄存",
    H: "高楼",
    P: "邮局POBOX",
    S: "街道",
    R: "投递服务站",
  };
  let rdi_type = {
    B: "商业地址",
    R: "住宅地址",
  };
  let type_two, type_one;

  type_one = record_type[data_result[0]];
  type_two = rdi_type[data_result[1]];

  let tag_one = (
    <Tag hidden={type_one == undefined ? true : false} key="one" color="blue">
      {type_one}
    </Tag>
  );

  let tag_two = (
    <Tag hidden={type_two == undefined ? true : false} key="two" color="cyan">
      {type_two}
    </Tag>
  );

  if (!type_one && !type_two) {
    return [
      <Tag key="all" color="red">
        未识别类型
      </Tag>,
    ];
  } else {
    return [tag_one, tag_two];
  }
};

const getResultInfo = (code) => {
  let result = {
    10: "错误地址, USP无法派送",
    11: "错误邮编, USP无法派送",
    12: "错误州, USP无法派送",
    13: "错误城市, USPS无法派送",
    21: "无法找到地址, USPS无法派送",
    22: "多个地址匹配, USPS无法派送",
    31: "准确地址, USPS正常派送",
    32: "默认地址, USPS正常派送",
  };

  let typeOfAlert;

  if (code <= 21) typeOfAlert = <CloseCircleTwoTone twoToneColor="#ff4d4f" />;
  if (code == 22)
    typeOfAlert = <QuestionCircleTwoTone twoToneColor="#fadb14" />;
  if (code == 31) typeOfAlert = <CheckCircleTwoTone twoToneColor="#52c41a" />;
  if (code == 32) typeOfAlert = <InfoCircleTwoTone twoToneColor="#1890ff" />;

  return (
    <span style={{ fontSize: 14 }}>
      {typeOfAlert}{" "}
      <Text style={{ marginLeft: 8 }} strong>
        {result[code]}
      </Text>
    </span>
  );
  // <span>
  //   {/* <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" /> */}

  //   {result[code]}
  // </span>;
};

const dpvToDescription = (dpv_code) => {
  if (dpv_code == "" || dpv_code == undefined) {
    return "未识别的地址";
  }

  let dpv_head = {
    AA: "街道，城市，州，邮编全部正确",
    A1: "地址格式不合法",
    BB: "地址完全正确",
    CC: "地址二，门牌号/房间号/公寓号等无法识别",
    F1: "军事或者外交地址",
    G1: "邮局代收服务地址",
    M1: "门牌号缺失",
    M3: "不合法的门牌号",
    N1: "地址二，门牌号/房间号/公寓号缺失",
    PB: "POBOX地址",
    P1: "PO, RR, or HC 码缺失",
    P3: "PO, RR, or HC box 号码不正确",
    PR: "地址确认且有mailbox (PMB)信息",
    R1: "地址确认但缺少mailbox (PMB)信息",
    R7: "地址确认但是USPS不提供该区域的街道投递服务",
    U1: "该地址有独有的邮政编码",
  };
  let result_header =
    dpv_head[dpv_code[0] + dpv_code[1]] +
    "; " +
    dpv_head[dpv_code[2] + dpv_code[3]];
  let result_foot = dpv_head[dpv_code[4] + dpv_code[5]];
  result_foot = result_foot ? "; " + result_foot + "." : ".";
  return result_header + result_foot;
};

const address_result = (data_result) => [
  {
    label: "类别",
    span: 3,
    content: reslutToTag([data_result.record_type, data_result.rdi]),
  },
  {
    label: "描述",
    span: 3,

    content: (
      <Text copyable={{ tooltips: false }}>
        {dpvToDescription(data_result.dpv)}
      </Text>
    ),
  },

  {
    label: "输入地址",
    span: 3,
    content: data_result.addressFullName,
  },

  {
    label: "纠正地址",
    span: 3,
    content: data_result.correctFullAddress,
  },
  {
    label: "验证结果",
    span: 3,
    content: getResultInfo(data_result.raw_ams_return_code),
  },
];

const columns = [
  {
    title: "地址",
    align: "center",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "城市",
    align: "center",
    dataIndex: "city",
    key: "city",
    width: 150,
  },
  {
    title: "州",
    align: "center",
    dataIndex: "state",
    width: 100,
  },
  {
    title: "邮编",
    dataIndex: "zip_code",
    align: "center",
    key: "zip_code",
    width: 100,
  },
];

const content = {
  asset: [
    // { "label": '公司名字', "key": "company", "is_required": false, "message": undefined, "placehold": '公司名字，选填', "span_value": 16, type: 'input', },
    // { "label": '备注名', "key": "nickname", "is_required": false, "message": undefined, "placehold": '备注名', "span_value": 8, type: 'input', },
    // { "label": '姓', "key": "first_name", "is_required": true, "message": undefined, "placehold": '发件人姓，暂时不支持中文', "span_value": 8, type: 'input', },
    // { "label": '名', "key": "last_name", "is_required": true, "message": undefined, "placehold": '发件人名，暂时不支持中文', "span_value": 8, type: 'input', },
    // { "label": '电话', "key": "phone_number", "is_required": true, "message": undefined, "placehold": '美国电话,必填', "span_value": 8, type: 'input', },
    // { "label": '邮件地址', "key": "sender_email", "is_required": false, "message": undefined, "placehold": 'Email地址, 选填', "span_value": 12, type: 'input', },
    {
      label: "地址一，街道，路名",
      key: "address_one",
      is_required: true,
      message: undefined,
      placehold: "GoogleMap Autocomplete选择后自动验证，或者手动输入后点击按钮",
      // style: { width : '50%'},
      span_value: 12,
      type: "input",
    },
    {
      label: "地址二，门牌号码",
      key: "address_two",
      is_required: false,
      message: undefined,
      placehold: "门牌号",
      style: { width: "75%" },
      span_value: 12,
      type: "input",
    },

    {
      label: "城市",
      key: "city",
      is_required: true,
      message: undefined,
      placehold: "必填项",
      span_value: 4,
      type: "input",
    },

    {
      label: "州",
      key: "state",
      is_required: true,
      message: undefined,
      placehold: "必填项",
      span_value: 4,
      type: "input",
    },
    {
      label: "邮编",
      key: "zip_code",
      is_required: true,
      message: undefined,
      placehold: "必填项",
      span_value: 4,
      type: "input",
    },
  ],

  assetAlt: [
    {
      label: "完整地址",
      key: "address_one_alt",
      is_required: true,
      message: undefined,
      placehold: "输入或者复制全地址，可以检测多行格式",
      // style: { width : '50%'},
      span_value: 12,
      type: "textArea",
    },
  ],
};

const show_form_item = (form_asset, keyMapContent = undefined) => {
  let content_form = form_asset;
  // let content_action = content.action;
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
          style={item.style}
          size="large"
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

    case "textArea":
      form_item_content = (
        <TextArea
          size="large"
          placeholder={item.placehold}
          rows={4}
          autoSize={{ minRows: 6, maxRows: 10 }}
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
      rules={[{ required: item.is_required }, { max: 100 }]}
      initialValue={keyMapContent ? keyMapContent[item.key] : undefined}
      validateTrigger={item.key == "state" ? undefined : ["onChange"]}
    >
      {form_item_content}
    </Form.Item>
  );
};

const getFullAddress = (address_info) => {
  let add_second = address_info.address_two
    ? ", " + address_info.address_two + ", "
    : ", ";
  let result =
    address_info.address_one +
    add_second +
    address_info.city +
    " " +
    address_info.state +
    " " +
    address_info.zip_code;
  return result;
};

const getFullInputAddress = (correct_address, ipnut_address) => {
  let isAd2Diff;
  let isAd1Diff;
  let comparedOneAndTwo;
  if (!ipnut_address.address_two || !correct_address.line2) {
    isAd2Diff = false;
  } else {
    isAd2Diff = !(
      ipnut_address.address_two.toLowerCase() ==
      correct_address.line2.toLowerCase()
    );
  }
  isAd1Diff = !(
    ipnut_address.address_one.toLowerCase() ==
    correct_address.line1.toLowerCase()
  );
  if (
    (!ipnut_address.address_two && correct_address.line2) ||
    (ipnut_address.address_two && !correct_address.line2)
  ) {
    isAd1Diff = !correct_address.line1
      .toLowerCase()
      .includes(ipnut_address.address_one.toLowerCase());
    isAd2Diff = !correct_address.line1
      .toLowerCase()
      .includes(ipnut_address.address_two.toLowerCase());
  }

  let content = [
    {
      // isMark: !(
      //   ipnut_address.address_one.toLowerCase() ==
      //   correct_address.line1.toLowerCase()
      // )&& !( ipnut_address.address_two || correct_address.line2),

      isMark: isAd1Diff,

      text: ipnut_address.address_one,
      isStrong: false,
    },
    {
      isMark: isAd2Diff,
      text: ipnut_address.address_two
        ? ", " + ipnut_address.address_two + ", "
        : ", ",
      isStrong: false,
    },
    {
      isMark: !(
        ipnut_address.city.toLowerCase() == correct_address.city.toLowerCase()
      ),
      text: ipnut_address.city,
      isStrong: false,
    },

    {
      text: " ",
    },
    {
      isMark: !(
        ipnut_address.state.toLowerCase() ==
        correct_address.state_province.toLowerCase()
      ),
      text: ipnut_address.state,
      isStrong: false,
    },

    {
      text: " ",
    },
    {
      isMark: !(ipnut_address.zip_code == correct_address.zip5),
      text: ipnut_address.zip_code,
      isStrong: false,
    },
  ];

  return (
    <span>
      {content.map((item) => (
        <Text key={uid.randomUUID(6)} strong={item.isStrong} mark={item.isMark}>
          {item.text}
        </Text>
      ))}
    </span>
  );
};

const getFullCorrectAddress = (correct_address, ipnut_address, isCompared) => {
  let isAd2Diff;
  if (!ipnut_address.address_two || !correct_address.line2) {
    isAd2Diff = false;
  } else {
    isAd2Diff = !(
      ipnut_address.address_two.toLowerCase() ==
      correct_address.line2.toLowerCase()
    );
  }

  let content = [
    {
      isMark:
        isCompared &&
        !(
          ipnut_address.address_one.toLowerCase() ==
          correct_address.line1.toLowerCase()
        ),
      text: correct_address.line1,
      isStrong: true,
    },
    {
      isMark: isCompared && isAd2Diff,
      text: correct_address.line2 ? ", " + correct_address.line2 + ", " : ", ",
      isStrong: true,
    },
    {
      isMark:
        isCompared &&
        !(
          ipnut_address.city.toLowerCase() == correct_address.city.toLowerCase()
        ),
      text: correct_address.city,
      isStrong: true,
    },

    {
      text: " ",
    },
    {
      isMark:
        isCompared &&
        !(
          ipnut_address.state.toLowerCase() ==
          correct_address.state_province.toLowerCase()
        ),
      text: correct_address.state_province,
      isStrong: true,
    },

    {
      text: " ",
    },
    {
      isMark: isCompared && !(ipnut_address.zip_code == correct_address.zip5),
      text: correct_address.zip5,
      isStrong: true,
    },
  ];

  return (
    <span>
      {content.map((item) => (
        <Text key={uid.randomUUID(6)} strong={item.isStrong} mark={item.isMark}>
          {item.text}
        </Text>
      ))}
    </span>
  );
};

const convertAddressToTableCol = (addressList) => {
  if (addressList.length == 0) return [];

  const covertHighAndLow = (high, low) => {
    if (!high && !low) return "";
    let covert_low;
    let covert_high;

    covert_high = !parseInt(high, 10) ? high : parseInt(high, 10).toString();
    covert_low = !parseInt(low, 10) ? high : parseInt(low, 10).toString();
    if (covert_high == covert_low) return covert_high;

    return covert_low + "-" + covert_high;
  };

  let result = addressList.map((item) => {
    let divide = item.unit ? ", " : " ";
    let result_format = {
      address:
        covertHighAndLow(item.primary_high, item.primary_low) +
        " " +
        item.pre_direction +
        " " +
        item.street_name +
        " " +
        item.post_direction +
        " " +
        item.suffix +
        divide +
        item.unit +
        " " +
        covertHighAndLow(item.secondary_high, item.secondary_low),
      city: item.city,
      state: item.state_abbrev,
      zip_code: item.zip_code,
    };
    return result_format;
  });

  return result;
};

class AddressForm extends React.Component {
  constructor(props) {
    super(props);
    this.autocomplete = null;
    this.formRef = React.createRef();
  }

  state = {
    input_mode: "one_click",
    // input_mode: "acurate_click",
    showResult: false,
    showTabel: false,
    is_fetching: false,
    addressResult: {
      record_type: undefined,
      rdi: undefined,
      raw_ams_return_code: undefined,
      dpv: undefined,
    },
    addressMatch: [],
  };

  reset = (mode = "one_click") => {
    let current_form = this.props.form || this.formRef.current;

    this.setState({
      showResult: false,
      showTabel: false,
      is_fetching: false,
      addressResult: {
        record_type: undefined,
        rdi: undefined,
        raw_ams_return_code: undefined,
        dpv: undefined,
      },
    });
    // current_form.setFieldsValue({
    //   address_one: undefined,

    // });

    current_form.resetFields(["address_two", "state", "zip_code", "city"]);

    current_form.setFields([
      {
        name: mode == "one_click" ? "address_one_alt" : "address_one",
        value: undefined,
        touched: false,
      },
    ]);

    message.info({
      content: "Reset form successfully",
      duration: 0.5,
    });
  };

  onValidating = async (udpateData) => {
    try {
      // message.loading({ content: "fetching...", key: "fetch" });
      this.setState({
        is_fetching: true,
      });

      console.log({
        line1: udpateData.address_one,
        line2: udpateData.address_two,
        line3: "",
        city: udpateData.city,
        state_province: udpateData.state,
        postal_code: udpateData.zip_code,
        country_code: "US",
      });

      let result = await post(
        "beta/addressValidate",
        JSON.stringify({
          line1: udpateData.address_one,
          line2: udpateData.address_two,
          line3: "",
          city: udpateData.city,
          state_province: udpateData.state,
          postal_code: udpateData.zip_code,
          country_code: "US",
        })
      );

      if (result.code == 0) {
        message.success({
          content: "Address validate successfully",
          key: "fetch",
          duration: 0.75,
        });
        this.setState({
          is_fetching: false,
          showResult: true,
          addressResult: {
            addressFullName: getFullInputAddress(
              result.data.address_info,
              udpateData
            ),
            correctFullAddress: getFullCorrectAddress(
              result.data.address_info,
              udpateData
            ),
            ...result.data.address_info,
          },
          addressMatch: convertAddressToTableCol(result.data.address_match),
        });
      } else {
        message.error({
          content: result.message,
          key: "fetch",
          duration: 3,
        });
      }

      console.log(result);
    } catch (error) {
      this.setState({
        showResult: false,
        showTabel: false,
        is_fetching: false,
        addressResult: {
          record_type: undefined,
          rdi: undefined,
          raw_ams_return_code: undefined,
          dpv: undefined,
        },
      });
      console.log(error);
      let error_message;
      if (error.response) {
        error_message = error.response.data
          ? error.response.data.message
          : "internal error";
      } else {
        error_message = "internal error";
      }

      message.error({
        content: "Failed to validate. Error message : " + error_message,
        key: "fetch",
        duration: 3,
      });
    }
  };

  onFinish = async (values, mode = "one_click") => {
    let submitData;
    submitData = values;
    if (mode == "one_click") {
      let data = parseAddress.parseLocation(
        values.address_one_alt.replace(/[\n\t\r]/g, " ")
      );
      console.log(values.address_one_alt.replace(/[\n\t\r]/g, " "));
      console.log(data);
      let sec_unit_type = data.sec_unit_type ? data.sec_unit_type : "";
      let sec_unit_num = data.sec_unit_num ? data.sec_unit_num : "";
      let number = data.number ? data.number : "";
      let street = data.street ? " " + data.street : "";
      let prefix = data.prefix ? " " + data.prefix : "";
      let suffix = data.suffix ? " " + data.suffix : "";
      let type = data.type ? " " + data.type : "";
      let address2 =
        !sec_unit_type && !sec_unit_num
          ? ""
          : sec_unit_type + " " + sec_unit_num;

      submitData = {
        address_one: number + prefix + street + type + suffix,
        address_two: address2,
        city: data.city ? data.city : "",
        state: data.state ? data.state : "",
        zip_code: data.zip ? data.zip : "",
      };
    }

    await this.onValidating(submitData);
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  handlePlaceSelect = async () => {
    var address = this.autocomplete.getPlace().address_components;
    var address_name = this.autocomplete.getPlace().name;
    let current_form = this.props.form || this.formRef.current;

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

    // console.log(getFullAddress(udpateData));
    await this.onValidating(udpateData);
  };

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

  componentDidUpdate() {
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
    let form_asset =
      this.state.input_mode == "one_click" ? content.assetAlt : content.asset;

    let target_mode =
      this.state.input_mode == "one_click" ? "accurate_input" : "one_click";
    let Chinese_name_mode = {
      one_click: "快速输入",
      accurate_input: "精准输入",
    };
    return (
      <div
        style={{
          background: "#ffffff",
          boxShadow: "rgb(217, 217, 217) 1px 1px 7px 0px",
          // height: 600,
          // width:'80%',
          padding: "36px 24px 56px 24px",
        }}
      >
        <Form
          form={current_form}
          ref={this.formRef}
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={(value) => this.onFinish(value, this.state.input_mode)}
          onFinishFailed={this.onFinishFailed}
        >
          {show_form_item(form_asset)}
          <Space style={{ marginTop: 24 }} size="large">
            <Form.Item shouldUpdate>
              {() => {
                // console.log(isFieldsTouched())  添加 指定字段 touch 过的 判断
                let isDisabled = () => {
                  if (this.formRef.current) {
                    // console.log(this.formRef.current.getFieldValue());
                    let isNoError =
                      this.formRef.current
                        .getFieldsError()
                        .filter(({ errors }) => errors.length).length == 0;

                    let haveTrouchedRequiredfields =
                      this.formRef.current.isFieldsTouched(
                        form_asset
                          .filter((item) => item.is_required == true)
                          .map((item) => item.key),
                        true
                      );
                    return !isNoError || !haveTrouchedRequiredfields;
                  } else {
                    // this.setState({ is_first_render: false });
                    return true;
                  }
                };
                return (
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={isDisabled()}
                    loading={this.state.is_fetching}
                    icon={<SearchOutlined />}
                  >
                    验证
                  </Button>
                );
              }}
            </Form.Item>
            <Form.Item>
              <Button
                onClick={() => this.reset(this.state.input_mode)}
                disabled={this.state.is_fetching}
                icon={<RedoOutlined />}
              >
                重置
              </Button>
            </Form.Item>

            <Form.Item>
              <Button
                type="link"
                disabled={this.state.is_fetching}
                onClick={() => {
                  this.setState({
                    input_mode: target_mode,
                  });
                  this.reset(this.state.input_mode);
                }}
                icon={<SwapOutlined />}
              >
                切换{Chinese_name_mode[target_mode]}
              </Button>
            </Form.Item>
          </Space>
        </Form>

        <Divider hidden={!this.state.showResult} />
        <Row hidden={!this.state.showResult} gutter={24}>
          <Col xs={24} md={24} lg={24} xl={24} xxl={12}>
            <div>
              <Title level={5}>结果报告</Title>
              <Spin spinning={this.state.is_fetching}>
                <Descriptions
                  style={{
                    // height: "220px",
                    marginTop: "21px",
                    marginBottom: "21px",
                    // padding: "24px",
                    boxShadow: "rgb(217, 217, 217) 1px 1px 7px 0px",
                  }}
                  size="middle"
                  // size="large"
                  // title="结果报告"
                  // layout="horizontal"
                  bordered
                >
                  {address_result(this.state.addressResult).map((item) => (
                    <Descriptions.Item
                      style={{ background: "#ffffff", width: 128 }}
                      key={item.label}
                      span={item.span}
                      label={<Text type="secondary">{item.label}</Text>}
                    >
                      {item.content}
                    </Descriptions.Item>
                  ))}
                </Descriptions>
              </Spin>
            </div>
          </Col>
          <Col xs={24} md={24} lg={24} xl={24} xxl={12}>
            <div>
              <Title level={5}>匹配地址</Title>
              <Spin spinning={this.state.is_fetching}>
                <Table
                  style={{
                    background: "#ffffff",
                    marginTop: "21px",
                    minHeight: "237px",
                    boxShadow: "rgb(217, 217, 217) 1px 1px 7px 0px",
                  }}
                  rowKey={() => uid.randomUUID(6)}
                  // bordered
                  pagination={false}
                  size="middle"
                  columns={columns}
                  dataSource={this.state.addressMatch}
                  scroll={{ y: 150 }}
                />
              </Spin>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default AddressForm;
