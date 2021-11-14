import { FileAddOutlined } from "@ant-design/icons";
import { Form } from "@ant-design/compatible";
import "@ant-design/compatible/assets/index.css";
import {
  Space,
  Popover,
  Radio,
  Typography,
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
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import Parcel_component from "./parcel_form";
import {
  FolderOpenOutlined,
  UnorderedListOutlined,
  SettingOutlined,
  FolderFilled,
  FolderOutlined,
  FolderOpenTwoTone,
} from "@ant-design/icons";
import IconButton from "@material-ui/core/IconButton";
import { actions as single_order_form } from "../../../../../reducers/shipping_platform/single_order_form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const uid = new ShortUniqueId();
const { Text } = Typography;
const { Panel } = Collapse;

const content = (parcel_form) => {
  return {
    form: [
      // { "label": '相同多件', "key": "same_pack", "is_required": false, "message": undefined, "placehold": '默认一件', "span_value": 4, type: 'input', },
      // { "label": '单位', "key": "unit", "is_required": false, "message": undefined, "placehold": undefined, "span_value": 5, type: 'unit', },
      {
        label: "相同多件",
        key: "same_pack",
        is_required: false,
        message: undefined,
        placehold: "默认一件",
        span_value: 4,
        type: "numberInput",
      },
      {
        label: `重量 (${parcel_form.unit_weight})`,
        max: undefined,
        key: "weight",
        is_required: true,
        message: undefined,
        placehold: "重量",
        span_value: 5,
        type: "numberInput",
      },
      {
        label: `长 (${parcel_form.unit_length})`,
        max: undefined,
        key: "length",
        is_required: true,
        message: undefined,
        placehold: "长度",
        span_value: 5,
        type: "numberInput",
      },
      {
        label: `宽 (${parcel_form.unit_length})`,
        max: undefined,
        key: "width",
        is_required: true,
        message: undefined,
        placehold: "宽度",
        span_value: 5,
        type: "numberInput",
      },
      {
        label: `高 (${parcel_form.unit_length})`,
        max: undefined,
        key: "height",
        is_required: true,
        message: undefined,
        placehold: "高度",
        span_value: 5,
        type: "numberInput",
      },

      {
        label: "订单号",
        key: "order_id",
        is_required: false,
        message: undefined,
        placehold: "自定义单号，选填，如不填写，系统自动完成",
        span_value: 14,
        type: "input",
      },
      {
        label: "备注信息",
        key: "reference",
        is_required: false,
        message: undefined,
        placehold: "运单上自定义信息，选填",
        span_value: 10,
        type: "input",
      },
      // { "label": 'sku', "key": "sku", "is_required": false, "message": undefined, "placehold": '产品的sku', "span_value": 9, type: 'input', },
    ],
    action: [
      // { "key": "save_link", "placehold": '保存', "span_value": 2, type: 'save_link', },
      // { "key": "reset_link", "placehold": '重置', "span_value": 2, type: 'reset_link', },
    ],
  };
};

const popover_content = (parcel_form, changeUnit) => {
  return (
    <div>
      <div>
        <Space size="large">
          <Text>长度单位</Text>
          <Radio.Group
            value={parcel_form.unit_length}
            onChange={(e) => changeUnit(e.target.value, "length")}
          >
            <Radio value="in">inch</Radio>
            <Radio value="cm">cm</Radio>
          </Radio.Group>
        </Space>
      </div>
      <div style={{ marginTop: 12 }}>
        <Space size="large">
          <Text>重量单位</Text>
          <Radio.Group
            onChange={(e) => changeUnit(e.target.value, "weight")}
            value={parcel_form.unit_weight}
          >
            <Radio value={"oz"}>oz</Radio>
            <Radio value={"lb"}>lb</Radio>
            <Radio value={"kg"}>kg</Radio>
          </Radio.Group>
        </Space>
      </div>
    </div>
  );
};

const merge_parcel_info = (data, unit_length, unit_weight) => {
  // console.log(data);
  // let { unit_length, unit_weight } = data;
  let title = undefined;
  let font_type = undefined;
  let total_weight = 0;
  let number_is_editing = 0;
  let nubmer_is_finished = 0;

  //判断一条记录里是否是多个包裹。

  //判断总状态
  let array_finished = data.filter(
    (item) => item.panel_title != "编辑中" && item.panel_title != "未录入"
  );
  let array_unfinished = data.filter(
    (item) => item.panel_title == "编辑中" || item.panel_title == "未录入"
  );
  console.log(array_unfinished);
  let is_ready = array_finished.length == data.length;

  nubmer_is_finished = array_finished.reduce((accumulator, currentValue) => {
    // console.log(Number(currentValue.pack_info.weight))
    return accumulator + Number(currentValue.pack_info.same_pack);
  }, 0);

  number_is_editing = array_unfinished.reduce((accumulator, currentValue) => {
    // console.log(Number(currentValue.pack_info.weight))
    return accumulator + Number(currentValue.pack_info.same_pack);
  }, 0);
  //计算总重量 放在 title
  if (array_finished.length > 0) {
    total_weight = array_finished.reduce((accumulator, currentValue) => {
      // console.log(Number(currentValue.pack_info.weight))
      return (
        accumulator +
        Number(currentValue.pack_info.weight * currentValue.pack_info.same_pack)
      );
    }, 0);
  }

  //如果只有一个包裹时，或者一条记录
  if (array_unfinished.length + array_finished.length == 1) {
    //判断是否完成，设置title
    title =
      array_finished.length == 1
        ? `已输入 ${
            1 * array_finished[0].pack_info.same_pack
          } 个包裹，重量 ${total_weight}  ${unit_weight} , 每个尺寸 ${
            data[0].pack_info.length
          } x ${data[0].pack_info.width} x ${
            data[0].pack_info.height
          } ${unit_length} `
        : `${1 * array_unfinished[0].pack_info.same_pack} 个包裹正在编辑`;
  } else {
    //如果是多个包裹，判断是否都完成，设置title
    title =
      array_unfinished.length == 0
        ? `已输入 ${nubmer_is_finished} 个包裹，总重量 ${total_weight} ${unit_weight}`
        : `已输入 ${nubmer_is_finished}个包裹，总重量 ${total_weight} ${unit_weight} ，${number_is_editing}个正在编辑`;
  }

  font_type = array_unfinished.length > 0 ? "warning" : "strong";
  return {
    title,
    font_type,
    is_ready,
  };
};

const getFactor = (CURRENT_UNIT, TARGET_UNIT) => {
  let factor;
  switch (true) {
    case CURRENT_UNIT == "cm" && TARGET_UNIT == "in":
      factor = 0.3937;
      break;
    case CURRENT_UNIT == "in" && TARGET_UNIT == "cm":
      factor = 2.54;
      break;

    case CURRENT_UNIT == "oz" && TARGET_UNIT == "lb":
      factor = 0.0625;
      break;
    case CURRENT_UNIT == "lb" && TARGET_UNIT == "oz":
      factor = 16;
      break;

    case CURRENT_UNIT == "oz" && TARGET_UNIT == "kg":
      factor = 0.02834;
      break;
    case CURRENT_UNIT == "kg" && TARGET_UNIT == "oz":
      factor = 35.274;
      break;

    case CURRENT_UNIT == "lb" && TARGET_UNIT == "kg":
      factor = 0.45359;
      break;
    case CURRENT_UNIT == "kg" && TARGET_UNIT == "lb":
      factor = 2.205;
      break;
  }
  return factor;
};
class Parcel extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    isThisPanelOpend: true,
    isActive: false,
    unit_length: this.props.parcel_information.unit_length,
    unit_weight: this.props.parcel_information.unit_weight,
  };

  change_unit = (target_unit, type) => {
    this.rest_sev_pay_form();
    const CURRENT_UNIT_LENGTH = this.props.parcel_information.unit_length;
    const CURRENT_UNIT_WEIGHT = this.props.parcel_information.unit_weight;
    let new_unit_weight = type == "length" ? CURRENT_UNIT_WEIGHT : target_unit;
    let new_unit_length = type == "length" ? target_unit : CURRENT_UNIT_LENGTH;
    let factor =
      type == "length"
        ? getFactor(CURRENT_UNIT_LENGTH, target_unit)
        : getFactor(CURRENT_UNIT_WEIGHT, target_unit);
    let update_data;
    //更新所有包裹的尺寸
    if (type == "length") {
      update_data = this.props.parcel_information.parcel_list.map((item) => {
        item.pack_info.length =
          item.pack_info.length == undefined
            ? undefined
            : Number(parseFloat(item.pack_info.length * factor).toFixed(2));

        item.pack_info.width =
          item.pack_info.width == undefined
            ? undefined
            : Number(parseFloat(item.pack_info.width * factor).toFixed(2));

        item.pack_info.height =
          item.pack_info.height == undefined
            ? undefined
            : Number(parseFloat(item.pack_info.height * factor).toFixed(2));

        item.panel_title =
          item.panel_title == "编辑中" || item.panel_title == "未录入"
            ? item.panel_title
            : `重量 ：${item.pack_info.weight} ${CURRENT_UNIT_WEIGHT}，  尺寸 ： ${item.pack_info.length}  x  ${item.pack_info.width}  x  ${item.pack_info.height} ${new_unit_length}`;
        return item;
      });
    } else {
      update_data = this.props.parcel_information.parcel_list.map((item) => {
        item.pack_info.weight =
          item.pack_info.weight == undefined
            ? undefined
            : Number(parseFloat(item.pack_info.weight * factor).toFixed(2));
        item.panel_title =
          item.panel_title == "编辑中" || item.panel_title == "未录入"
            ? item.panel_title
            : `重量 ：${item.pack_info.weight} ${new_unit_weight}，  尺寸 ： ${item.pack_info.length}  x  ${item.pack_info.width}  x  ${item.pack_info.height} ${CURRENT_UNIT_LENGTH}`;

        return item;
      });
    }

    let { is_ready, title, font_type } = merge_parcel_info(
      update_data,
      new_unit_length,
      new_unit_weight
    );

    let obj = {
      parcel_information: {
        unit_length: new_unit_length,
        unit_weight: new_unit_weight,
        is_ready,
        panel_title: title,
        font_type,
        parcel_list: update_data,
      },
    };

    // console.log(obj);
    obj["service_information"] = {};
    //递交到redux
    obj["service_information"]["is_required_fetch"] = true;

    this.setState({
      unit_length: new_unit_length,
      unit_weight: new_unit_weight,
    });

    this.props.set_form_info(obj);

    message.success("单位已经切换，已填数据将自动完成转换");
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

  onBlurToRedux = (data) => {
    // let parcel_data = {
    //   key: this.props.id_no,
    //   panel_title: undefined,
    //   font_type: undefined,
    //   pack_info: {
    //     ...this.formRef.current.getFieldsValue(),
    //     ...data,
    //   },
    // };
    // parcel_data.panel_title = is_ready_form(
    //   this.props.content,
    //   this.formRef.current
    // )
    //   ? `重量 ：${parcel_data.pack_info.weight} ${this.props.unit_weight}，  尺寸 ： ${parcel_data.pack_info.length}  x  ${parcel_data.pack_info.width}  x  ${parcel_data.pack_info.height} ${this.props.unit_length}`
    //   : "编辑中";
    // parcel_data.font_type = is_ready_form(
    //   this.props.content,
    //   this.formRef.current
    // )
    //   ? "strong"
    //   : "warning";
    // this.setState({ title: parcel_data.panel_title });
    // this.props.submit_info(parcel_data);
  };

  submit_info = (data) => {
    this.rest_sev_pay_form();
    let update_data;
    let { unit_length, unit_weight } = this.props.parcel_information;
    //找到对应包裹去更新
    update_data = this.props.parcel_information.parcel_list.map((item) => {
      if (item.key == data.key) {
        item = data;
      }
      return item;
    });

    let { is_ready, title, font_type } = merge_parcel_info(
      update_data,
      unit_length,
      unit_weight
    );

    let obj = {
      parcel_information: {
        is_ready,
        panel_title: title,
        font_type,
        parcel_list: update_data,
      },
    };
    obj["service_information"] = {};
    //递交到redux
    obj["service_information"]["is_required_fetch"] = true;
    this.props.set_form_info(obj);
    //输入完毕需要去考虑改动标题
  };

  add_one_package() {
    let { unit_length, unit_weight } = this.props.parcel_information;
    this.rest_sev_pay_form();
    let data = {
      key: uid.randomUUID(6),
      panel_title: "未录入",
      font_type: "warning",
      pack_info: {
        same_pack: 1,
      },
      is_panel_opened: true,
    };

    let obj = {
      setting: {},
      service_information: {},
      parcel_information: {
        parcel_list: [],
      },
    };

    //增加一个包裹是需要考虑验证
    obj["service_information"] = {};
    obj["service_information"] = {
      is_select: false,
      service_name: undefined,
      panel_title: "请先完成输入信息",
      font_type: "secondary",
      is_required_fetch: true,
    };
    // obj['setting']['open_panel'] = this.props.setting.open_panel.filter(item => item != 'service_information')
    let update_data = (obj["parcel_information"][
      "parcel_list"
    ] = this.props.parcel_information.parcel_list.concat(data));

    // let update_data = this.props.parcel_information.parcel_list.concat(data)

    let { is_ready, title, font_type } = merge_parcel_info(
      update_data,
      unit_length,
      unit_weight
    );
    obj = {
      parcel_information: {
        unit_length,
        unit_weight,
        is_ready,
        panel_title: title,
        font_type,
        parcel_list: update_data,
      },
    };
    this.props.set_form_info(obj);
  }

  remove_one_pack = (id_no) => {
    this.rest_sev_pay_form();
    let { unit_length, unit_weight } = this.props.parcel_information;
    let update_data = this.props.parcel_information.parcel_list.filter(
      (item) => item.key != id_no
    );
    // 删除一个包裹时 要去修改总标题

    let { is_ready, title, font_type } = merge_parcel_info(
      update_data,
      unit_length,
      unit_weight
    );
    let obj = {
      parcel_information: {
        //保证单位不变
        unit_length: this.props.parcel_information.unit_length,
        unit_weight: this.props.parcel_information.unit_weight,
        is_ready,
        panel_title: title,
        font_type,
        parcel_list: update_data,
      },
    };
    obj["service_information"] = {};
    obj["service_information"]["is_required_fetch"] = true;
    this.props.update_form_info(obj);
  };

  handle_panel = (e, key) => {
    let update_data = this.props.parcel_information.parcel_list.map((item) => {
      if (item.key == key) {
        item.is_panel_opened = e.length > 0 ? true : false;
      }
      return item;
    });

    let obj = {
      parcel_information: {
        parcel_list: update_data,
      },
    };
    this.setState({ isThisPanelOpend: !this.state.isThisPanelOpend });
    this.props.set_form_info(obj);
  };

  getPackindex = (index) => {
    let n = this.props.parcel_information.parcel_list
      .slice(0)
      .reduce((accumulator, currentValue, currentIndex, array) => {
        if (currentIndex == index) array.splice(1);
        return accumulator + Number(currentValue.pack_info.same_pack);
      }, 0);

    return n;
  };

  closeAllpacelPanel = () => {
    let update_parcelist = this.props.parcel_information.parcel_list.map(
      (item) => (item.is_panel_opened = false)
    );
    let new_parcel_information = {
      ...this.props.parcel_information,
      ...update_parcelist,
    };
    //isThisPanelOpend 暂时用来控制关闭和开启面板的渲染时机，没有实际意义
    this.setState({ isThisPanelOpend: !this.state.isThisPanelOpend });
    this.props.update_form_info({
      parcel_information: new_parcel_information,
    });
  };

  getIconType = () => {
    let is_all_closed = this.props.parcel_information.parcel_list.every(
      (item) => item.is_panel_opened == false
    );
    return is_all_closed ? (
      <FolderOutlined style={{ fontSize: 18 }} />
    ) : (
      <FolderOpenOutlined style={{ fontSize: 18 }} />
    );
  };

  reset = () => {
    this.child.reset();
    // console.log(this.props.parcel_information.parcel_list);
  };

  shouldComponentUpdate(nextProps, nextState) {
    const current_form = this.props.parcel_information;
    const next_form = nextProps.parcel_information;
    if (
      _.isEqual(current_form, next_form) &&
      _.isEqual(this.state, nextState)
      // this.state.isThisPanelOpend == nextState.isThisPanelOpend
    )
      return false;
    return true;
  }

  onRef = (ref) => {
    this.child = ref;
  };

  componentDidMount = () => {
    this.props.onRef(this);
  };

  render() {
    console.log("parcel_form form did render");
    // console.log(this.props.parcel_information.parcel_list)
    return (
      <div>
        {/* <Radio.Group style={{ marginBottom : 8 }} defaultValue='lb/in'  >
                    <Radio value='lb/in'>lb/in</Radio>
                    <Radio value='oz/in'>oz/in</Radio>
                    <Radio value='kg/cm'>kg/cm</Radio>
                </Radio.Group> */}
        <div style={{ textAlign: "left" }}>
          <Space size={1} style={{ marginBottom: 8 }}>
            <Button
              type="text"
              onClick={(event) => {
                // event.stopPropagation();
                this.closeAllpacelPanel();
              }}
              icon={this.getIconType()}
            />

            <Divider
              style={{ marginLeft: 0, marginRight: 0 }}
              type="vertical"
            />

            <Popover
              trigger={["click"]}
              content={popover_content(
                this.props.parcel_information,
                this.change_unit
                // this.props.set_form_info
              )}
              placement="rightTop"
              onVisibleChange={(visible) => {
                this.setState({ isActive: visible });
              }}
            >
              <Button
                type="text"
                // disabled
                onClick={(event) => {
                  event.stopPropagation();
                }}
                icon={
                  <SettingOutlined
                    style={{ fontSize: 18 }}
                    // spin={this.state.isActive}
                    rotate={this.state.isActive ? 90 : 180}
                  />
                }
              />
            </Popover>
          </Space>
        </div>

        {this.props.parcel_information.parcel_list.map((item, index) => (
          <Parcel_component
            is_mutiple_pack={
              item.pack_info
                ? item.pack_info.same_pack > 1
                  ? true
                  : false
                : false
            }
            rest_sev_pay_form={() => this.rest_sev_pay_form()}
            unit_length={this.state.unit_length}
            unit_weight={this.state.unit_weight}
            onRef={this.onRef}
            handle_panel={(e, key) => this.handle_panel(e, key)}
            parcel={item}
            data={item.pack_info}
            content={content(this.props.parcel_information)}
            onBlurToRedux={(data) => this.onBlurToRedux(data)}
            submit_info={(data) => this.submit_info(data)}
            //为什么不能传key作为标识
            //`key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop
            title={item.panel_title}
            font_type={item.font_type}
            key={item.key}
            id_no={item.key}
            position={index}
            tag_end={this.getPackindex(index)}
            tag_start={this.getPackindex(index) - item.pack_info.same_pack + 1}
            remove={(id_no) => this.remove_one_pack(id_no)}
          />
        ))}
        <span>
          <a style={{ paddingLeft: 48 }} onClick={() => this.add_one_package()}>
            <FileAddOutlined /> 添加一个包裹
          </a>
        </span>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    billing_information:
      state.shipping_platform_single_order.form.billing_information,
    parcel_information:
      state.shipping_platform_single_order.form.parcel_information,
    service_information:
      state.shipping_platform_single_order.form.service_information,
    setting: state.shipping_platform_single_order.form.setting,
    payment_information:
      state.shipping_platform_single_order.form.payment_information,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    set_form_info: bindActionCreators(
      single_order_form.get_form_info,
      dispatch
    ),
    update_form_info: bindActionCreators(
      single_order_form.update_form_info,
      dispatch
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Parcel);
