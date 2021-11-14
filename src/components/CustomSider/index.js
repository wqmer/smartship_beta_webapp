import React, { Component, PropTypes } from "react";
import { Icon as LegacyIcon } from "@ant-design/compatible";
import { Link } from "react-router-dom";
import { Typography, Layout, Menu } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const { Sider } = Layout;
const { SubMenu } = Menu;
const siderWidth = 215;
const submenus = [
  {
    name: "查询类",
    iconType: "history",
    key: "log",
    url: "/log",
    children: [
      {
        url: "/refundAndAdjustment",
        iconType: "edit",
        name: "退单与附加费",
      },
      // { url: "/batch", iconType: "form", name: "传批量" },
    ],
  },


  {
    name: "工具类",
    iconType: "tool",
    key: "tool",
    url: "/tool",
    children: [
      { url: "/addressValidate", iconType: "edit", name: "地址验证" },
    ],
  },
  // {
  //   name: "订单管理",
  //   iconType: "database",
  //   key: "order_log",
  //   url: "/order_log",
  //   children: [
  //     { url: "/ready_to_ship", iconType: "pushpin", name: "待处理" },
  //     { url: "/completed", iconType: "carry-out", name: "已完成" },
  //     { iconType: "exclamation-circle", url: "/problem", name: "问题单" },
  //   ],
  // },
  // { name: '便捷工具', iconType: 'tool', key: 'tool', url: '/tool', children: [{ url: '/rate_estimate', iconType: 'calculator', name: '运费试算' }, { url: '/tracking', iconType: 'file-search', name: '轨迹查询' }] },
  // { name: '店铺管理', iconType: 'shopping-cart', key: 'store', url: '/store', children: [{ url: '/amazon', iconType: 'amazon', name: '亚马逊' }] },
];

class CustomSider extends Component {
  constructor(props) {
    super(props);
    // this.eventSource = new EventSource("events");
    // this.test = this.test.bind(this);
    // this.eventSource = new EventSource("http://localhost:8081/api/forwarder/event");
  }

  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  display_submenu = (parent, child) => {
    return (
      <Menu.Item
        key={child.url}
        // onClick={() => this.props.history.push(`/user${parent.url}${child.url}`)}
      >
        {/* <span>{child.name}</span> */}
        <Link to={`/beta${parent.url}${child.url}`}>
          <span>{child.name}</span>
        </Link>
      </Menu.Item>
    );
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const customTrigger = React.createElement(
      this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
      {
        style: { textAlign: "left" },
        // className: 'trigger',
        onClick: this.toggle,
      }
    );

    return (
      <div>
        <Sider
          style={{
            overflow: 'auto',
            height: "100%",

            position: 'fixed',
            // borderColor: '#ddd',
            // boxShadow: "rgb(204, 204, 204) 0px 0px 10px",
            zIndex: 9,
            boxShadow: "1px 1px 5px rgba(0,21,41,.1)",
            // left: 0,
          }}
          // onBreakpoint={broken => {
          //     console.log(broken);
          // }}
          // breakpoint="lg"
          // collapsedWidth= {0}
          theme="dark"
          // trigger={customTrigger}
          // onCollapse={this.onCollapse}
          // collapsedWidth = {100}
          trigger={null}
          // collapsible
          collapsed={this.state.collapsed}
          width={siderWidth}
        >
          <div
            style={{
              padding: "16px 16px 16px 16px",
              width: siderWidth,
              height: "64px",
              float: "left",
              textAlign: "center",
            }}
          >
              <Title style = {{color:'#e6f7ff'}} level={5}>Smartship 实验室</Title>
          </div>

          <Menu
            theme="dark"
            mode="inline"
            forceSubMenuRender={true}
            selectedKeys={[this.props.selectedKeys]}
            defaultOpenKeys={submenus.map((item) => item.key)}
            // style={{ boxShadow: "rgb(204, 204, 204) 0px 0px 10px" }}
            // defaultOpenKeys={[this.props.defaultOpenKeys]}
            // style={{ paddingTop: 64  }}
            // inlineCollapsed={this.state.collapsed}
          >
            {submenus.map((parent, index) => (
              <SubMenu
                key={parent.key}
                icon={<LegacyIcon type={parent.iconType} />}
                title={parent.name}
              >
                {parent.children.map((child, index) =>
                  this.display_submenu(parent, child)
                )}
              </SubMenu>
            ))}
          </Menu>
          {/* <div style={{  position: 'fixed',bottom: 0 , padding: "16px 16px 16px 16px", width: siderWidth, height: "64px", float: "left", }} /> */}
          {/* <span style={{ background: '#ffffff' }}>123 </span> */}
          {/* <div style = {{background: '#ffffff', height: 48, bottom: 0, zIndex : 1  } }></div> */}
          {/* {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        style: {  position: 'fixed', color: '#ffffff', height: 48, bottom: 0 , left : 24 ,fontSize :18 , },
                        
                        // className: 'trigger',
                        onClick: this.toggle,
                    })} */}
        </Sider>
      </div>
    );
  }
}

export default CustomSider;
