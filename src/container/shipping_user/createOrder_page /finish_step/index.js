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
import LabelGallery from "../../../../components/Labelgallery";
import OrderDetial from "../../../../components/OrderDetail";

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
const arrayLabel = [];
for (let i = 0; i <= 2; i++) {
  let label = (
    // <View style={styles.view}>
    <Image
      // fixed={true}
      style={styles.image}
      // debug={true}
      key={i}
      src="https://ship-service.s3-us-west-2.amazonaws.com/labels/2021-01-30/9205500000000000091566.png"
      // src="https://ship-service.s3-us-west-2.amazonaws.com/labels/2021-01-31/1Z6132W20397246182.png"
      // src="https://ship-service.s3-us-west-2.amazonaws.com/labels/2021-01-30/1Z6132W20392674611.jpg"
      // src="https://ship-service.s3-us-west-2.amazonaws.com/labels/2021-01-31/1Z1931WE0324074588.jpg"

      // source = "https://ship-service.s3-us-west-2.amazonaws.com/labels/2021-01-30/1Z1931WE0318596893TESTTYPE.gif"
      // src="https://ship-service.s3-us-west-2.amazonaws.com/labels/2021-01-30/test-corp.png"
    />
    // </View>
  );
  arrayLabel.push(label);
}
// const MyDocument = () => (
//   <Document title="测试label" style={{ padding: 0 }}>
//     <Page style={styles.body}>
//       <Image
//         key="23"
//         // src="https://ship-service.s3-us-west-2.amazonaws.com/labels/2021-01-30/9205500000000000091566.png"
//         // src="https://ship-service.s3-us-west-2.amazonaws.com/labels/2021-01-30/9205500000000000091566.png"
//         src="/test.png"
//       />
//       {/* <Text
//         style={styles.pageNumbers}
//         render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
//         fixed
//       /> */}
//     </Page>
//   </Document>
// );
// class ComponentToPrint extends React.Component {
//   render() {
//     return (
//       <PDFViewer width={500} height={750}>
//         <MyDocument />
//       </PDFViewer>
//     );
//   }
// }
// ReactPDF.render(<MyDocument />,document.getElementById('root'))
// ReactDOM.render(<Trunk/>, document.getElementById('root'));

// class ComponentToPrint extends React.Component {
//   render() {
//     return (
//       <div>
//         <PDFViewer >
//           <Document
//             // onRender={() => this.setState({ loading: false })}
//             title="test"
//             // style={{ padding: 0 }}
//           >
//             <Page
//               // orientation = 'landscape'
//               // wrap={false}
//               // debug={true}
//               // style={styles.page}
//               // size={[400, 600]}
//               // size="B6"
//             >
//               {arrayLabel.map((item) => item)}
//             </Page>
//           </Document>
//         </PDFViewer>
//       </div>
//     );
//   }
// }
class ComponentToPrint extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.labels.map((item) => (
          <img key={item.key} src={item.url} />
        ))}

        {/* <img src="https://ship-service.s3-us-west-2.amazonaws.com/labels/2021-01-30/1Z6132W20392674611.jpg" />
        <img src='/test.png' /> */}
      </div>
    );
  }
}

class Finish_step extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    resetType: "default",
    loading: false,
    currentTrackingNumbers: this.props.master_trcking_nubmer,
  };

  componentWillUnmount() {
    // this.props.reset();
    // console.log(this.state.resetType);
    if (this.state.resetType === "default") this.props.reset();
    // this.props.resetWithRepeat();
  }

  // componentDidMount(){
  //     this.setState({currentTrackingNumbers : this.props.parcel_information.})
  // }

  render() {
    // const { url } = this.props.match;
    // console.log(this.props)
    return (
      <div style={{ background: "#f0f5ff", marginTop: 32 }}>
        <span
          style={{
            width: "50%",
            display: "inline-block",
            textAlign: "left",
            verticalAlign: "top",
          }}
        >
          <div hidden={true}>
            <ComponentToPrint
              labels={this.props.labels}
              ref={(el) => (this.componentRef = el)}
            />
          </div>
          <Space size={12}>
            <ReactToPrint
              key="console"
              onBeforeGetContent={() => this.setState({ loading: true })}
              onAfterPrint={() => this.setState({ loading: false })}
              trigger={() => (
                <Button
                  // onClick={() => this.setState({ loading: true })}
                  style={{
                    borderRadius: "3px",
                    boxShadow: "rgb(204, 204, 204) 0px 0px 10px",
                  }}
                  loading={this.state.loading}
                  icon={<PrinterOutlined />}
                  type="primary"
                  key="console"
                >
                  打印运单
                </Button>
              )}
              content={() => this.componentRef}
            />
            <Button
              style={{
                borderRadius: "3px",
                boxShadow: "rgb(204, 204, 204) 0px 0px 10px",
              }}
              type="primary"
              // icon={<RollbackOutlined />}
              onClick={() => {
                this.setState({ resetType: "repeat" }, () => {
                  this.props.resetWithRepeat();
                });

                // this.props.reset();
              }}
              key="buy"
            >
              出相同单
            </Button>
            {/* <Button
              style={{
                borderRadius: "3px",
                boxShadow: "rgb(204, 204, 204) 0px 0px 10px",
              }}
              type="primary"
              // icon={<RollbackOutlined />}
              onClick={() => {
                this.props.reset();
              }}
              key="buy"
            >
              打印运单
            </Button> */}
            <Button
              style={{
                borderRadius: "3px",
                // boxShadow: "rgb(204, 204, 204) 0px 0px 10px",
              }}
              disabled
              type="primary"
              danger
              // onClick={() => {
              //   this.props.reset();
              // }}
              key="buy"
            >
              退单作废
            </Button>
          </Space>

          <div style={{ marginTop: 16 }}>
            <OrderDetial
              data={this.props.parcel_information}
              title="包裹信息"
            />
          </div>
          <div style={{ marginTop: 24 }}>
            <OrderDetial
              data={this.props.service_information}
              title="订单信息"
            />
          </div>
          <div style={{ marginTop: 24 }}>
            <OrderDetial
              currentTrackingNumbers={this.state.currentTrackingNumbers}
              data={this.props.tracking_information}
              title="物流信息"
            />
          </div>
        </span>
        {/* <div style ={{display: 'inline-block' , height:400 ,width :600 }}></div> */}

        {/* <ComponentToPrint  ref={el => (this.componentRef = el)}/>
                <Result
                    icon={<SmileTwoTone />}
                    title="订单完成"
                    subTitle={<span>系统订单号为xxxxxxxx，总运费为10.23 usd 。 由FedDex提供运输服务。点击按钮直接打印pdf 或在<a>已完成</a>中查看 </span>}
                    extra={[
   
                    ]}
                /> */}
        {/* <div > <ComponentToPrint_alt ref={el => (this.componentRef = el)} /> </div> */}

        {/* <PDFViewer ref={el => (this.componentRef = el)} width={400} height={600}>
                    <MyDocument />
                </PDFViewer> */}
        <span style={{ width: "50%", display: "inline-block" }}>
          <LabelGallery
            setCurrentTrackingNumbers={(item) =>
              this.setState({ currentTrackingNumbers: item })
            }
            labels={this.props.labels}
          />
        </span>
      </div>
    );
  }
}
export default Finish_step;
