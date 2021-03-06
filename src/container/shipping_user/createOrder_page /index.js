import Icon, { MoneyCollectTwoTone, UpOutlined } from "@ant-design/icons";
import {
  Space,
  message,
  Drawer,
  Checkbox,
  Alert,
  Button,
  Typography,
  Select,
  Collapse,
  Steps,
  Divider,
  Col,
  Row,
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
// import Address_form from './address_form'
// import Parcel_form from './parcel_form'
// import Carrier_form from './carrier_form'
// import Finish_form from './finish_form'
import Information from "./information_step";
import Finish from "./finish_step";
import LocalAtmOutlinedIcon from "@material-ui/icons/LocalAtmOutlined";
import { get, post } from "../../../util/fetch";
import { actions as single_order_form } from "../../../reducers/shipping_platform/single_order_form";
import { actions as user_account_actions } from "../../../reducers/shipping_platform/user";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const { Panel } = Collapse;
const { Text } = Typography;
const { Step } = Steps;

const Sender = () => (
  <svg
    t="1578568585168"
    className="icon"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="2803"
    width="24"
    height="24"
  >
    <path
      d="M 699 213.55 L 513.55 90.07 a 9.39 9.39 0 0 0 -10.39 0 L 317.73 213.55 a 9.35 9.35 0 0 0 5.2 17.13 h 68.35 V 459 a 28.28 28.28 0 0 0 28.1 28.44 h 178 A 28.28 28.28 0 0 0 625.43 459 V 230.68 h 68.35 a 9.35 9.35 0 0 0 5.22 -17.13 Z m -148.5 17.13 V 413.6 h -84.29 V 204.08 a 9.36 9.36 0 0 1 3.89 -7.59 l 33.71 -24.25 a 7.53 7.53 0 0 1 8.74 0 l 34 24.27 a 9.36 9.36 0 0 1 3.92 7.61 Z"
      fill="#1296db"
      p-id="2804"
    ></path>
    <path
      d="M 893.09 593.4 L 834.5 310.23 a 37.15 37.15 0 0 0 -7.27 -17.11 c -0.14 -0.19 -0.28 -0.37 -0.43 -0.55 l -0.59 -0.73 c -0.28 -0.34 -0.58 -0.68 -0.88 -1 l -0.19 -0.23 a 37.07 37.07 0 0 0 -27.53 -12.21 h -105 a 37.46 37.46 0 0 0 -37.46 37.46 a 37.46 37.46 0 0 0 37.46 37.46 h 74.85 l 44.87 216.88 H 692.52 a 38.81 38.81 0 0 0 -30.87 15.65 l -56.75 80.49 H 419.32 l -56.81 -80.5 a 39.11 39.11 0 0 0 -31 -15.62 H 212.39 l 44.16 -217 h 73.9 a 37.47 37.47 0 0 0 37.47 -37.46 a 37.47 37.47 0 0 0 -37.47 -37.46 H 229.66 a 37.66 37.66 0 0 0 -40.75 29.53 l -58.22 286.1 a 37.09 37.09 0 0 0 -1.69 22.26 l 70.1 290.21 a 37.82 37.82 0 0 0 42.63 28.6 l 542 0.22 a 37.82 37.82 0 0 0 41.21 -28.83 L 895 616.21 a 37 37 0 0 0 -1.91 -22.81 Z m -135.2 267.11 l -491.82 -0.2 l -52 -215.14 h 98.8303 l 53.94 76.43 a 37.43 37.43 0 0 0 33 19.69 h 224.7 A 37.45 37.45 0 0 0 658 720.71 l 53.27 -75.54 h 98.6297 Z"
      fill="#108ee9"
      p-id="2805"
    ></path>
  </svg>
);

const Recepiant = () => (
  <svg
    t="1578569888016"
    className="icon"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="936"
    width="24"
    height="24"
  >
    <path
      d="M879.098 877.875H146.807c-81.365 0-81.366-81.365-81.366-81.365V511.73l203.414-366.146H757.05L960.464 511.73v284.78c0 81.366-81.366 81.365-81.366 81.365zM716.367 226.95H309.538l-142.39 284.78h183.073s81.366 0 81.366 81.366v40.683h162.731v-40.683s0-81.366 81.366-81.366h183.073l-142.39-284.78z m162.731 366.145H685.493c-5.696 10.679-9.809 23.543-9.809 40.683 0 81.366-81.366 81.366-81.366 81.366H431.587s-81.366 0-81.366-81.366c0-17.14-4.113-30.004-9.809-40.683H146.807V796.51h732.291V593.095zM329.88 389.681h366.146l20.341 40.683H309.538l20.342-40.683z m40.683-81.366h284.78l20.341 40.683H350.221l20.342-40.683z"
      p-id="937"
      fill="#8a8a8a"
    ></path>
  </svg>
);

const MyFirstIcon = (props) => <Icon component={Sender} {...props} />;

const RecepiantIcon = (props) => <Icon component={Recepiant} {...props} />;

const layout = ["?????????", "?????????", "????????????"];

const current_step = ["information", "finished"];

class Create_order_page extends React.Component {
  onChange = (current) => {
    console.log("onChange:", current);
    this.setState({ current });
  };

  state = {
    isRequriedFetchAddress: false,
    step_status: undefined,
    current: 0,
    childrenDrawer: false,
    is_loading: false,
    is_expand: false,
    visible: false,
    bill_total: 0,
    drawer_padding_Left: 256,
    status: ["process", "wait", "wait"],
    disabled: [false, true, true, true],
    current_form: undefined,
    labels: [],
    master_trcking_nubmer: undefined,
    parcel_information: [
      {
        label: "??????",
        key: "weight",
        content: undefined,
      },
      {
        label: "??????",
        key: "size",
        content: undefined,
      },
      {
        label: "??????",
        key: "quantity",
        content: this.props.form.parcel_information.parcel_list.length + " ???",
      },
      {
        label: "?????????",
        key: "sender",
        content: this.props.form.sender_information.panel_title,
        span: 3,
      },
      {
        label: "?????????",
        key: "receipant",
        content: this.props.form.receipant_information.panel_title,
        span: 3,
      },
    ],
    service_information: [
      {
        label: "??????",
        content: "??????",
      },

      {
        label: "??????",
        content: undefined,
        span: 2,
      },

      {
        label: "?????????",
        content: undefined,
        span: 3,
      },

      {
        label: "?????????",
        content: undefined,
        span: 3,
      },
    ],
    tracking_information: [
      {
        label: "?????????",
        content: undefined,
      },
      {
        label: "scan_form",
        content: undefined,
        span: 2,
      },
      {
        label: "?????????",
        content: undefined,
        span: 3,
      },
      {
        label: "??????",
        content: undefined,
        span: 3,
      },
    ],
  };

  onRef = (ref) => {
    this.child = ref;
  };

  onChildrenDrawerClose = () => {
    this.setState({
      childrenDrawer: false,
    });
  };

  showChildrenDrawer = () => {
    this.setState({
      childrenDrawer: true,
    });
  };

  showDrawer = () => {
    let currentStatus = this.state.visible;
    this.setState({
      visible: !currentStatus,
    });
  };

  // postBill = (rate) => {
  //     let obj = {
  //         'billing_information': {
  //             'on_display' :false
  //         }
  //     }
  //     obj.billing_information.on_display = true
  //     obj.billing_information.total = rate
  //     this.props.set_form_info(obj)
  // }

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  changeHeight = () => {
    this.setState({
      is_expand: !this.state.is_expand,
    });
  };

  set_current_form = (form) => {
    this.setState({ current_form: form });
  };

  handle_redirect = (current) => {
    const current_url =
      step_array[current] == "single_order" ? "" : step_array[current];
    this.props.history.push(`/user/create/single_order/${current_url}`);
  };

  onChange = (current) => {
    let current_step = step_object[this.getKeyOfSubMenus().LastChildOfUrl];
    if (current_step < current) {
      this.state.current_form.validateFields((err, values) => {
        if (!err) this.handle_redirect(current);
      });
    } else this.handle_redirect(current);
  };

  // reset = () => {
  //     let re_status = [
  //         'process',
  //         'wait',
  //         'wait',
  //         'wait',
  //     ]
  //     let re_disabled = [
  //         false,
  //         true,
  //         true,
  //         true
  //     ]
  //     this.setState({ status: re_status, disabled: re_disabled })
  // }

  set_all_disabled = () => {
    let all_disabled = [true, true, true, true];
    let list_status = this.state.status.map((item, index) => {
      if (index == 3) {
        item = "process";
      }
      if (index == 2) {
        item = "finish";
      }
      return item;
    });
    this.setState({ status: list_status, disabled: all_disabled });
  };

  set_finished = (current_step, next_step) => {
    let current_index = step_object[current_step];
    let next_index = step_object[next_step];
    let list_status = this.state.status.map((item, index) => {
      if (index == current_index) {
        item = "finish";
      }
      if (index == next_index && item != "finish") {
        item = "process";
      }
      return item;
    });

    let list_disabled = this.state.disabled.map((item, index) => {
      if (index == next_index) {
        item = false;
      }
      return item;
    });
    this.setState({ status: list_status, disabled: list_disabled });
  };

  getKeyOfSubMenus = () => {
    var str =
      this.props.history.location.pathname.substring("/user/".length) || "/"; //  /seller/order/new   --->  order/new
    var result = {
      parent: undefined,
      childern: [],
    };
    let initial = 0;
    for (var i = 0; i < str.length; i++) {
      if (str[i] == "/") {
        !result.parent
          ? (result.parent = str.substring(initial, i))
          : result.childern.push(str.substring(initial, i));
        initial = i + 1;
      }
      if (str.lastIndexOf("/") == i && str.substring(initial, str.length)) {
        result.childern.push(str.substring(initial, str.length));
      }
    }
    return {
      Parent: result.parent, //order/new   --> order
      Children: result.childern, //order/new   --> new
      //   LastChildOfUrl: '/' + result.childern[0]
      // ?????????0 ?????????????????????1???????????????????????????????????? ?????????????????????????????????????????????????????????????????????key????????????????????????????????????
      LastChildOfUrl: result.childern[result.childern.length - 1],
    };
  };

  display_content = (current) => {
    switch (current) {
      case "information":
        return (
          <Information
            isRequriedFetchAddress={this.state.isRequriedFetchAddress}
            postBill={(rate) => this.postBill(rate)}
            onRef={this.onRef}
          />
        );
        break;
      case "finished":
        return (
          <Finish
            labels={this.state.labels}
            master_trcking_nubmer={this.state.master_trcking_nubmer}
            parcel_information={this.state.parcel_information}
            service_information={this.state.service_information}
            tracking_information={this.state.tracking_information}
            reset={() => this.reset()}
            resetWithRepeat={() => this.resetWithRepeat()}
          />
        );
        break;
    }
  };

  next = () => {
    const current = this.state.current + 1;
    this.setState({ current, step_status: "process" });
    window.scrollTo(0, 0);
  };

  pervious = () => {
    const current = this.state.current - 1;
    this.setState({ current, step_status: "process" });
    window.scrollTo(0, 0);
  };

  populatePack(parcel_list) {
    let myarr = [];
    for (let n = 0; n < parcel_list.length; n++) {
      let new_fill = new Array(Number(parcel_list[n].pack_info.same_pack)).fill(
        parcel_list[n]
      );
      myarr = myarr.concat(new_fill);
    }

    let update_array = myarr.map((item, index) => {
      let newkey = item.key + "_" + index;
      return {
        ...item,
        key: newkey,
      };
    });
    return update_array;
  }

  pay = async () => {
    // console.log(this.props.form.parcel_information.parcel_list)
    let { unit_length, unit_weight } = this.props.form.parcel_information;
    let new_parcel_list = this.populatePack(
      this.props.form.parcel_information.parcel_list
    );
    // console.log(new_parcel_list)
    let update_form_information = {
      ...this.props.order_form,
      parcel_information: {
        unit_length,
        unit_weight,
        parcel_list: new_parcel_list,
      },
    };
    let select_service = this.props.form.service_information.service_content.filter(
      (item) => item.check == true
    );

    let update_form = {
      ...this.props.form,
      ...update_form_information,
      service_information: { service_content: select_service },
    };

    // console.log(this.props.form.service_information)
    // console.log(update_form)

    const current = this.state.current + 1;
    this.setState({ is_loading: true });

    try {
      message.loading({
        content: "??????????????????",
        key: "pay",
        duration: 0,
        style: { marginLeft: 200 },
      });
      let response = await post("/user/create_shipment", update_form);
      let labels = response.data.parcel.parcelList.map((item) => {
        return {
          agent: response.data.service.agent,
          key: item["_id"],
          url: item.label[0],
          tracking_numbers: item.tracking_numbers[0],
        };
      });
      let {
        service_information,
        parcel_information,
        tracking_information,
      } = this.state;
      service_information = [
        {
          label: "??????",
          content: "??????",
        },

        {
          label: "??????",
          content: response.data.service.asset.name,
          span: 2,
        },

        {
          label: "?????????",
          content: response.data.customer_order_id,
          span: 3,
        },

        {
          label: "?????????",
          content: "$ " + response.data.postage.billing_amount.total,
          span: 3,
        },
      ];
      parcel_information = [
        {
          label: "??????",
          key: "weight",
          content: response.data.parcel.weight,
        },
        {
          label: "??????",
          key: "size",
          content: undefined,
        },
        {
          label: "??????",
          key: "quantity",
          content:
            this.props.form.parcel_information.parcel_list.length + " ???",
        },
        {
          label: "?????????",
          key: "sender",
          content: this.props.form.sender_information.panel_title,
          span: 3,
        },
        {
          label: "?????????",
          key: "receipant",
          content: this.props.form.receipant_information.panel_title,
          span: 3,
        },
      ];
      tracking_information = [
        {
          label: "?????????",
          content: undefined,
        },
        {
          label: "scan_form",
          content: undefined,
          span: 2,
        },
        {
          label: "?????????",
          content: response.data.parcel.parcelList[0].tracking_numbers[0],
          span: 3,
        },
        {
          label: "??????",
          content: "???????????????",
          span: 3,
        },
      ];
      let master_trcking_nubmer =
        response.data.parcel.parcelList[0].tracking_numbers[0];
      this.props.refreshBalance();
      this.setState({
        current,
        is_loading: false,
        step_status: "finish",
        master_trcking_nubmer,
        labels,
        parcel_information,
        service_information,
        tracking_information,
      });
      message.success({
        content: "??????????????????!",
        key: "pay",
        style: { marginLeft: 200 },
      });
      let obj = {
        payment_information: {
          // is_required_fetch:true,
          is_finished: false,
          payment_method: undefined,
          panel_title: "????????????????????????",
          font_type: "secondary",
          payment_content: [],
        },
        setting: {
          open_panel: [],
        },
        billing_information: { on_display: false },
      };
      this.props.update_form_info(obj);
    } catch (error) {

      message.error({
        content: error.response && error.response.data? error.response.data.message || "???????????????????????????????????????"  : "????????????????????????" ,
        key: "pay",
        duration: 10,
      });
      console.log(error);
      this.setState({ is_loading: false });
    }
  };

  reset = (isWithButton = false) => {
    this.setState({
      current: 0,
      step_status: "process",
    });

    if (isWithButton) {
      this.props.reset_all_info_with_buttom();
      this.child.resetAllForm();
    } else {
      this.props.reset_all_info();
    }
  };

  //   let obj = {
  //     service_information: {
  //       is_required_fetch: true,
  //       is_select: false,
  //       service_name: undefined,
  //       panel_title: "????????????????????????",
  //       font_type: "secondary",
  //       service_content: [],
  //     },
  //   };
  //   this.props.set_form_info(obj);
  // }

  resetWithRepeat = () => {
    let obj = {
      service_information: {
        is_required_fetch: true,
        is_select: false,
        service_name: undefined,
        panel_title: "????????????????????????",
        font_type: "secondary",
        service_content: [],
      },
    };
    this.props.set_form_info(obj);
    this.setState({ current: 0, step_status: "process" });
    message.success({
      content: "?????????????????????",
      duration: 2,
    });
  };

  show_action = (current) => {
    let Button_props = [
      {
        aciton_one: this.pay,
        label_one: "??????",
        aciton_two: () => this.reset(true),
        label_two: "????????????",
      },
      {
        aciton_one: this.pay,
        label_one: "??????",
        aciton_two: this.pervious,
        label_two: "?????????",
      },
      {
        aciton_one: undefined,
        label_one: "??????",
        aciton_two: undefined,
        label_two: "????????????",
      },
    ];

    return (
      <div>
        <Text style={{ fontSize: "16px", fontWeight: 700 }}>????????????</Text>
        <Divider style={{ marginTop: 6, marginBottom: 6 }}></Divider>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <Checkbox>
              ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
            </Checkbox>
          </div>
          <div>
            <Space>
              {/* <Button
                loading={this.state.is_loading}
                onClick={() => Button_props[current].aciton_one()}
                type="primary"
                style={{ width: 120 }}
              >
                {Button_props[current]["label_one"]}
              </Button> */}

              <Button
                disabled={this.state.is_loading}
                onClick={() => Button_props[current].aciton_two()}
                style={{ marginRight: 2 }}
              >
                {Button_props[current]["label_two"]}
              </Button>
            </Space>
          </div>
        </div>
      </div>
    );
  };

  display_billing_detail = () => {
    let { unit_weight } = this.props.billing_information;
    let billingDetail = this.props.billing_information.detail.map(
      (item, index) => {
        return (
          <Col span={8} key={index}>
            {" "}
            <Text style={{ color: "#1890ff", fontSize: 16 }}>
              ?????? {index + 1}
            </Text>{" "}
            <Text style={{ color: "#1890ff", fontSize: 12 }}>
              {" "}
              : ???????????? - {item.weight} {unit_weight}, ???????????? - zone{" "}
              {item.zone} , ?????? -{" "}
            </Text>{" "}
            <Text underline style={{ color: "#1890ff", fontSize: 14 }}>
              $ {item.price}
            </Text>
          </Col>
        );
      }
    );
    return billingDetail;
  };

  shouldComponentUpdate(nextProps, nextState) {
    // console.log('nextprops is ' + nextProps.header_hidden)
    // console.log('this props is ' + this.props.header_hidden)
    if (this.props.header_hidden != nextProps.header_hidden) return false;
    if (this.props.collapsed != nextProps.collapsed) return false;
    return true;
  }

  componentDidMount() {
    // this.props.user_auth()

    window.scrollTo(0, 0);
  }

  render() {
    // console.log(this.props.form)
    const { current } = this.state;
    return (
      <div id="create_order">
        {/* <div style={{ background: '#fff', boxShadow: 'rgb(217, 217, 217) 1px 1px 7px 0px', padding: 18,  }}>
                    <Steps
                        current={current}
                        status={this.state.step_status}
                        style={{ width: '100%' }} >
                        <Step key="????????????" title="??????" description="????????????,????????????" disabled={this.state.disabled[0]} />
                        <Step key="??????????????????" title="??????" description="??????????????????" disabled={this.state.disabled[2]} />
                        <Step key="???????????????????????????" title="??????" description="????????????" disabled={this.state.disabled[3]} />
                    </Steps>
                </div> */}

        <div style={{ background: "#F8F8F8", marginTop: 16 }}>
          {this.display_content(current_step[current])}
        </div>

        <div style={{ marginTop: 32 }}>
          {current == 1 ? null : this.show_action(current)}
        </div>

        {/* <Button type="primary" onClick={this.showDrawer}>
                    Open
                </Button> */}
        <Drawer
          // style ={{overflow: 'hidden',}}
          title={
            <div>
              <Row>
                <Col span={8} style={{ fontSize: 18 }}>
                  {" "}
                  <MoneyCollectTwoTone
                    style={{ display: "inline-block", fontSize: "18px" }}
                  />{" "}
                  <a>????????? ??? $ {this.props.billing_information.total} </a>
                </Col>
                <Col style={{ textAlign: "center" }} span={8}>
                  {" "}
                  <UpOutlined
                    style={{ textAlign: "center", fontSize: 18 }}
                    rotate={this.state.is_expand ? 180 : 0}
                    onClick={this.changeHeight}
                  />{" "}
                </Col>
                <Col style={{ textAlign: "right" }} span={8}>
                  {" "}
                  <Button
                    loading={this.state.is_loading}
                    size="small"
                    style={{ width: 120 }}
                    type="primary"
                    disabled={!this.props.payment_information.is_finished}
                    onClick={() => this.pay()}
                  >
                    ??????
                  </Button>{" "}
                </Col>
              </Row>
            </div>
          }
          headerStyle={{ background: "#fafafa" }}
          bodyStyle={{
            background: "#f5f5f5",
            paddingLeft: 48,
            paddingRight: 48,
          }}
          drawerStyle={{ overflow: "hidden", background: "#fafafa" }}
          getContainer="#content"
          style={{ position: "absolute" }}
          // style={{ paddingLeft: this.props.collapsed ? 80 : 256 }}
          placement="bottom"
          zIndex={200}
          mask={false}
          closable={false}
          visible={this.props.billing_information.on_display}
          // visible={true}
          height={this.state.is_expand ? 200 : 48}
        >
          {/* <Space style={{ paddingleft: 16, paddingRightL: 16 }} size={60}>{this.props.billing_information.detail ? this.display_billing_detail() : undefined}</Space> */}
          <div>
            <Row gutter={24} size={60}>
              {this.props.billing_information.detail
                ? this.display_billing_detail()
                : undefined}
            </Row>
          </div>
        </Drawer>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // console.log(state.shipping_platform_single_order.form)
  return {
    billing_information:
      state.shipping_platform_single_order.form.billing_information,
    payment_information:
      state.shipping_platform_single_order.form.payment_information,
    form: state.shipping_platform_single_order.form,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    reset_all_info: bindActionCreators(
      single_order_form.reset_all_info,
      dispatch
    ),
    reset_all_info_with_buttom: bindActionCreators(
      single_order_form.reset_all_info_with_buttom,
      dispatch
    ),
    set_form_info: bindActionCreators(
      single_order_form.get_form_info,
      dispatch
    ),
    user_auth: bindActionCreators(user_account_actions.user_auth, dispatch),
    update_form_info: bindActionCreators(
      single_order_form.update_form_info,
      dispatch
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Create_order_page);
