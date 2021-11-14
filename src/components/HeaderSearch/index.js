import HeaderSearch from 'ant-design-pro/lib/HeaderSearch';
import React, { Component, PropTypes } from 'react'
import 'ant-design-pro/dist/ant-design-pro.css'

const Demo_search_bar_top = () => (
  <div
    style={{
      textAlign: 'right',
      height: '64px',
      lineHeight: '64px',
      display: 'inline-block',
      position: 'fixed',
      top: '0px' ,
      right:'200px',
      width: '15%',     
    }}
  >
    <HeaderSearch
      placeholder="站内搜索"
    //   dataSource={['搜索提示一', '搜索提示二', '搜索提示三']}
    //   onSearch={value => {
    //     console.log('input', value); // eslint-disable-line
    //   }}
    //   onPressEnter={value => {
    //     console.log('enter', value); // eslint-disable-line
    //   }}
    />
  </div>
)


export default Demo_search_bar_top
