import {
  PrinterOutlined,
  RollbackOutlined,
  SmileTwoTone,
} from "@ant-design/icons";
import { Result, Button, Space } from "antd";
import React, { Component } from "react";
import {
  Redirect,
  Router,
  Route,
  Switch,
  Link,
  NavLink,
} from "react-router-dom";
import ReactToPrint from "react-to-print";
import ReactPDF, {
  Canvas,
  PDFViewer,
  Image,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

import { Spin } from "antd";

const styles = StyleSheet.create({
  page: {
    // clipPath: "inset(10% 0% 0% 0%)",
    // flexDirection: 'row',
  },
  body: {
    // padding: 0,
    // marginBottom : -50,
    // marginVertical :0,
    // clipPath: "inset(10% 0% 0% 0%)",
    // transform: "rotate(90deg)",
    // paddingTop: 10,
    // paddingBottom: 65,
    // paddingHorizontal: 35,
    // backgroundColor: '#E4E4E4'
  },
  view: {
    // padding: 5,
  },
  image: {
    height: 600,
    // clipPath: "inset(15 0% 0% 0%)"
    // transform: "rotate(90deg)",
    // clipPath: "inset(0% 0% 0% 0%)"
    // height: 600,
    // width:1000,
    // minWidth: 525,
    // boxShadow: "0px 3px 6px 0px rgba(0, 0, 0, 0.12)",
    // marginRight: "25%",
    // marginLeft: "-7.5%",
  },
  // box: { width: "100%", marginBottom: 0, borderRadius: 5 },
  // header: {
  //   fontSize: 12,
  //   marginBottom: 0,
  //   textAlign: "center",
  //   color: "grey",
  // },
  // pageNumbers: {
  //   position: "absolute",
  //   bottom: 0,
  //   left: 0,
  //   right: 0,
  //   textAlign: "center",
  // },
});

//添加1000张label图片从aws服务器
const arrayLabel = [];
for (let i = 0; i <= 27; i++) {
  let label = (
    // <View style={styles.view}>
      <Image
        // fixed={true}
        style={styles.image}
        // debug={true}
        key={i}
        // src="https://ship-service.s3-us-west-2.amazonaws.com/labels/2021-01-30/9205500000000000091566.png"
        // src="https://ship-service.s3-us-west-2.amazonaws.com/labels/2021-01-31/1Z6132W20397246182.png"
        src="https://ship-service.s3-us-west-2.amazonaws.com/labels/2021-01-30/1Z6132W20392674611.jpg"
        // src="https://ship-service.s3-us-west-2.amazonaws.com/labels/2021-01-31/1Z1931WE0324074588.jpg"

        // source = "https://ship-service.s3-us-west-2.amazonaws.com/labels/2021-01-30/1Z1931WE0318596893TESTTYPE.gif"
        // src="https://ship-service.s3-us-west-2.amazonaws.com/labels/2021-01-30/test-corp.png"
      />
    // </View>
  );
  arrayLabel.push(label);
}

//展示所以1000张并合成pdf文件
class Display extends React.Component {
  state = {
    loading: true,
  };
  render() {
    return (
      <Spin
        size="large"
        tip="下载label中，请稍后"
        spinning={this.state.loading}
      >
        <PDFViewer style={{ width: "100%", height: 1000 }}>
          <Document
            onRender={() => this.setState({ loading: false })}
            title="test"
            // style={{ padding: 0 }}
          >
            <Page
              // orientation = 'landscape'
              // wrap={false}
              // debug={true}
              style={styles.page}
              size={[400, 600]}
              // size="B6"
            >
              {arrayLabel.map((item) => item)}
            </Page>
          </Document>
        </PDFViewer>
      </Spin>
    );
  }
}

export default Display;
