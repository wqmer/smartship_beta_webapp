import { Tag } from 'antd'
import React, { Component, PropTypes } from 'react'

const { CheckableTag } = Tag;

class MyTag extends React.Component {
  constructor(props) {
    super(props);
  }

  // state = { checked: false };

  // handleChange = ( )=> {
  //  this.props.onChange()
  // };

  render() {
    return (
      <CheckableTag {...this.props} onChange={()=>this.props.onChange()} />
    );
  }
}

export default MyTag