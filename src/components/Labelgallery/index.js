import { Skeleton, Pagination, Spin } from "antd";
import React, { Component } from "react";
import { LoadingOutlined } from "@ant-design/icons";
// import sample from './sample.png'
import {
  HomeOutlined,
  SettingFilled,
  SmileOutlined,
  SyncOutlined,
} from '@ant-design/icons';

const labelPattern = {
  InternationalBridge: {
    // marginTop: "22.5%",
    // filter: "blur(4.5px)",
    height: "auto",
    width: "60%",
    minWidth: 525,
    boxShadow: "0px 3px 6px 0px rgba(0, 0, 0, 0.12)",
  },

  UPS: {
    // clipPath: "inset(0% 14% 0% 0%)",
    // filter: "blur(6px)",
    height: "auto",
    width: "60%",
    minWidth: 525,
    boxShadow: "0px 3px 6px 0px rgba(0, 0, 0, 0.12)",
    // transform: "rotate(90deg)",
    // marginTop: "25%",
    // marginLeft: "-7.5%",
  },
};

const placeholder = {
  InternationalBridge: "/usps.png",
  UPS: "/ups.jpg",
};
const antIcon = <LoadingOutlined style={{ fontSize: 24 , }} spin />;
class Labelgallery extends React.Component {
  constructor(props) {
    super(props);
  }

  state = { loading: true, current: 1 };

  render() {
    // console.log(this.props.labels);
    return (
      <div style={{ marginLeft: "20%", textAlign: "center" }}>
        {this.props.labels.map((item, index) => {
          if (index == this.state.current - 1) {
            return (
              <div
                key={item.key}
                style={{
                  // height: "auto",
                  width: "50%",
                  minWidth: 525,
                  minHeight: 800,
                  // textAlign :'center'
                  // boxShadow: "0px 3px 6px 0px rgba(0, 0, 0, 0.12)",
                }}
              >
                <Spin
                  style={{ marginTop: "25%" }}
                  key={item.key}
                  indicator={antIcon}
                  // spinning={false}
                  spinning={this.state.loading}
                  size="large"
                >
                  <img
                    //  style={{ filter:'blur(5px)' , height: 'auto', width: '60%', minWidth: 425, boxShadow: '0px 3px 6px 0px rgba(0, 0, 0, 0.12)', }}
                    hidden={!this.state.loading}
                    style={{
                      // clipPath: "inset(0% 14% 0% 0%)",
                      filter: "blur(6px)",
                      height: "auto",
                      width: "60%",
                      minWidth: 525,
                      boxShadow: "0px 3px 6px 0px rgba(0, 0, 0, 0.12)",
                      // transform: "rotate(90deg)",
                      // marginTop: "25%",
                      // marginLeft: "-7.5%",
                    }}
                    key={item.key+ item.agent}
                    // src='/sample.png'
                    src={placeholder[`${item.agent}`]}
                    
                  />
                  <img
                    //  style={{ filter:'blur(5px)' , height: 'auto', width: '60%', minWidth: 425, boxShadow: '0px 3px 6px 0px rgba(0, 0, 0, 0.12)', }}
                    hidden={this.state.loading}
                    style={labelPattern[`${item.agent}`]}
                    key={item.key}
                    onLoad={() => this.setState({ loading: false })}
                    src={item.url}
                  />
                </Spin>
              </div>
            );
          }
        })}

        <div style={{ width: "50%", minWidth: 525, textAlign: "center" }}>
          <Pagination
            style={{ marginTop: 16 }}
            simple
            hideOnSinglePage={true}
            pageSize={1}
            defaultCurrent={1}
            total={this.props.labels.length}
            onChange={(page, pageSize) => {
              this.props.setCurrentTrackingNumbers(
                this.props.labels[page - 1].tracking_numbers
              );
              // console.log( this.props.labels[page - 1] )
              this.setState({ loading: true, current: page });
            }}
          />
        </div>
      </div>
    );
  }
}

export default Labelgallery;
