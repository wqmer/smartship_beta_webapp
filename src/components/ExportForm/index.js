import React, { useState, useEffect, useRef } from "react";
import _ from "lodash";

import ReactDOM from "react-dom";
import QueueAnim from "rc-queue-anim";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Form,
  Space,
  Tabs,
  Skeleton,
  Input,
  DatePicker,
  Typography,
  Layout,
  message,
  notification,
  Pagination,
  BackTop,
  Spin,
  Badge,
  Menu,
  Col,
  Row,
  Dropdown,
  Button,
  Table,
  Divider,
  Select,
} from "antd";
import { Popconfirm } from "antd";
import FileSaver from "file-saver";
import XLSX from "xlsx";

import { get, post } from "../../util/fetch";
import { actions as actions_user_order } from "../../reducers/shipping_platform/user/order";
import { handle_error } from "../../util/error";
import format from "../../util/format";
import { SearchOutlined, FileExcelOutlined } from "@ant-design/icons";
import ModalAddressForm from "../ModalAddAddress";
// import ModalAddressForm from '../ModalAddAddress';
import Pusher from "pusher-js";
import form_item from "./form_item";

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;
const { Option } = Select;
const { Text } = Typography;
const InputGroup = Input.Group;
const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

function callback(key) {
  console.log(key);
}

const form_item_content = [
  {
    label: "日期",
    key: "date",
    is_required: true,
    message: undefined,
    span_value: 5,
    type: "range_pick",
  },
  {
    label: "渠道",
    key: "service",
    is_required: true,
    message: undefined,
    placehold: "請選擇渠道",
    span_value: 7,
    type: "select_tag",
    option: ["IB_USPS"],
  },
  {
    label: "代理平台",
    key: "agent",
    is_required: true,
    message: undefined,
    placehold: "選擇代理平台",
    span_value: 6,
    type: "select_tag",
    option: ["aplus", "HuodaiOS"],
  },

  // { "label": '邮件地址', "key": "sender_email", "is_required": false, "message": undefined, "placehold": 'Email地址, 选填', "span_value": 12, type: 'input', },
  {
    label: "退款类型",
    key: "refund_type",
    is_required: false,
    message: undefined,
    // placehold: "门牌号，选填",
    span_value: 6,
    type: "select_tag",
    default_value: ["manual"],
    option: ["manual", "automatic"],
  },
  {
    label: "文件名",
    key: "file_name",
    is_required: false,
    message: undefined,
    placehold: "如果不填，默认为导出时间戳",
    span_value: 12,
    rules: [{ max: 35 }],
    type: "input",
  },

  {
    label: "导出表头",
    key: "header",
    is_required: false,
    message: undefined,
    placehold: "必填项",
    span_value: 12,
    type: "select_tag",
    default_value: [
      "tracking_number",
      "inform_at",
      "amount",
      "comment",
      "type",
    ],
    option: [
      "tracking_number",
      "inform_at",
      "amount",
      "comment",
      "type",
      "label_create_at",
      "request_id",
    ],
  },

  // {

  //   key: "export",
  //   message: undefined,
  //   placehold: "导出",
  //   span_value: 10,
  //   type: "buttom",
  //   isFormSubmit: true,
  //   icon: <FileExcelOutlined />,
  // },
];

const handle_request = (_id) => {
  return {
    delete: {
      url: "/user/delete_drafts",
      body: { order_id: Array.isArray(_id) ? _id : [_id] },
    },
    submit: {
      url: "/user/update_drafts",
      body: {
        order_id: Array.isArray(_id) ? _id : [_id],
        status: "ready_to_ship",
      },
    },
    cancel: {
      url: "/user/update_drafts",
      body: { order_id: Array.isArray(_id) ? _id : [_id], status: "draft" },
    },
  };
};

const show_form_item = (content, form) => {
  let content_form = content;
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
                {form_item(item, form)}{" "}
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

// }

class ExportForm extends React.Component {
  constructor(props) {
    super(props);

    this.formRef = React.createRef();
  }

  // formRef = React.createRef();
  state = {
    status: this.props.page_name,
    filter: {},
    filter_tags: ["is_all"],
    visible: false,
    data: [],
    is_fetching: false,
    message: "",
    disabled: true,
    data_picker: {
      start: undefined,
      end: undefined,
    },
    is_first_render: true,
  };

  onRef = (ref) => {
    this.child = ref;
  };

  //请求服务器导出服务
  begin_export() {}

  //重置所有filter
  reset_all_filter() {}

  handle_fitler_change = (value, dateString) => {
    this.child.onChange(value, dateString);
  };

  //处理表格上方alert操作提示

  componentDidMount = () => {
    window.scrollTo(0, 0);
    // if (this.props.onRef) this.props.onRef(this);
    // this.fetch_data(this.props.api_url["get_data_pignate"]);
  };

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.props.page_name !== prevProps.page_name) {
  //     //切换页面，重置
  //     let reset = {
  //       search_string: "",
  //       page_size: 25,
  //       current_page: 1,
  //       filter: {},
  //       is_first_render: true,
  //     };
  //     // this.fetch_data(this.props.api_url["get_data_pignate"], {
  //     //   ...this.state,
  //     //   ...reset,
  //     // });
  //   }
  // }

  componentDidCatch(error, info) {
    // Display fallback UI
    console.log(error);
  }

  test = () => {
    console.log("test toggle");
    // this.setState({ collapsed: true})
  };

  onFinish = async (values) => {
    try {
      let query = {
        request_id: values.agent,
        refund_type: values.refund_type,
        inform_at: {
          // $gte: values.date[0].startOf('day'),
          // $lte: values.date[1].endOf('day')
          $gte: values.date[0].startOf("day").format("YYYY-MM-DD HH:mm"),
          $lte: values.date[1].endOf("day").format("YYYY-MM-DD HH:mm"),
        },
      };
      console.log(query.inform_at);
      let select = values.header.concat("-_id");

      message.loading({ content: "fetching...", key: "fetch" });
      this.setState({ is_fetching: true });
      let result = await post(
        "beta/exportRefundAndAdjustment",
        JSON.stringify({
          query,
          select,
        })
      );
      // console.log(values.date[0].toString(), values.date[1].toString());
      message.success({
        content: "Fetch data successfully and start to download",
        key: "fetch",
      });

      const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      const fileExtension = ".xlsx";
      const ra_ws = XLSX.utils.json_to_sheet(
        result.data.filter((item) => item.type == "refund_approved")
      );
      const rj_ws = XLSX.utils.json_to_sheet(
        result.data.filter((item) => item.type == "refund_rejected")
      );

      ra_ws["!cols"] = [];
      rj_ws["!cols"] = [];
      for (let i = 0; i < values.header.length; i++) {
        rj_ws["!cols"].push({ width: 40 });
        ra_ws["!cols"].push({ width: 40 });
      }

      const wb = {
        Sheets: { refund_approved: ra_ws, refund_rejected: rj_ws },
        SheetNames: ["refund_approved", "refund_rejected"],
      };
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], { type: fileType });
      let filename = values.file_name
        ? values.file_name
        : values.agent +
          "_" +
          values.date[0].format().toString() +
          "_To_" +
          values.date[1].format().toString();
      FileSaver.saveAs(data, filename + fileExtension);

      this.setState({ is_fetching: false });
    } catch (error) {
      console.log(error);
      this.setState({ is_fetching: false });
      message.error({ content: "fail to fetch", key: "fetch" });
    } finally {
      // this.setState( {is_fetching : false})
    }
  };

  render() {
    // console.log('i did rendered')
    // console.log(this.state.filter_tags)
    const form = this.formRef.current;
    // console.log(this.formRef.current != null ? !this.formRef.current.getFieldsError().filter(({ errors }) => errors.length).length != 1 : true)
    // console.log(form ? form.getFieldsError().length : null);

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
        <Form layout="vertical" ref={this.formRef} onFinish={this.onFinish}>
          {show_form_item(form_item_content, this.formRef.current)}
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
                      form_item_content
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

              // let isDisabled = this.formRef.current
              //   ? !this.formRef.current
              //       .getFieldsError()
              //       .filter(({ errors }) => errors.length).length == 0
              //   : true;
              // console.log(isDisabled());

              return (
                <Button
                  type="primary"
                  style={{ marginTop: 12 }}
                  htmlType="submit"
                  disabled={isDisabled()}
                  loading={this.state.is_fetching}
                  icon={<FileExcelOutlined />}
                >
                  导出
                </Button>
              );
            }}
          </Form.Item>
        </Form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // console.log(state)
  return {
    isFetching: state.globalState.isFetching,
    // draft_order: state.shipping_platform_user.order.result,
    // order_count: state.shipping_platform_user.order.count
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // get_order_count: bindActionCreators(actions_user_order.get_order_count, dispatch),
    // get_all_order: bindActionCreators(actions_user_order.get_all_order, dispatch),
    // submit_drafts: bindActionCreators(actions_user_order.update_order, dispatch),
    // delete_drafts: bindActionCreators(actions_user_order.delete_orders, dispatch),
    // reset_order_result: bindActionCreators(actions_user_order.reset_order_result, dispatch),
    // set_order_count: bindActionCreators(actions_user_order.set_order_count, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExportForm);
