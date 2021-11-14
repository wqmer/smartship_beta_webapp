import React, { Component, PropTypes } from 'react'
import {
    Input,
} from 'antd';
// import styles from './test.less'

// import "antd/dist/antd.css";
// import "./index.css";
import styled from "styled-components";
import { SearchOutlined } from '@ant-design/icons';

const CustomInput = styled(Input)`
  .ant-input {
    outline:none ;
    width : 500px ;
  }
`;
class InputNoBorder extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        is_focus: false,
        style: { width: '150px', },
    };

    // handleChange = ( )=> {
    //  this.props.onChange()
    // };



    render() {
        return (
            <div>
    
            <Input         
                onBlur={() => this.setState({ is_focus: false })}
                onFocus={() => this.setState({ is_focus: true })}
                // className='customInput'
                // style={this.state.style}
                   
                style={!this.state.is_focus ? this.state.style : {  width: '500px', }}
              
                // placeholder="输入搜索内容"
                onChange={(e) => {
                  let value = e.target.value.trim();
                  this.props.handle_search(value)
                }}
                // allowClear
                value={this.props.searching_value}
                // prefix={<SearchOutlined style={{ opacity: 0.4 }} />}
            >
                
            </Input>

            <span>        <SearchOutlined style={{ dispaly: "inline-block" ,opacity: 0.4 }} /></span>
            </div>
        );
    }
}

export default InputNoBorder