import {
  Tabs,
  Divider,
  Input,
  BackTop,
  List,
  Avatar,
  Pagination,
  Spin,
  Button,
  Badge,
  DatePicker,
  Select,
  Skeleton,
  Tooltip,
} from "antd";
import { Space } from "antd";
import React, { Component, PropTypes } from "react";
import { Ref } from "semantic-ui-react";
import {
  MinusCircleTwoTone,
  EyeTwoTone,
  PrinterTwoTone,
  EyeOutlined,
  MinusCircleOutlined,
  PrinterOutlined,
  EyeFilled,
  PrinterFilled,
  MinusCircleFilled,
} from "@ant-design/icons";


const alignProp = "center";

const mapRouterToComponent = (Ref) => [
  {
    router: "refundAndAdjustment",
    component: { type: "ExportForm" },
  },
];

export default mapRouterToComponent;
