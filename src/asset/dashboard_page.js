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
} from 'antd';
import React, { Component, PropTypes } from 'react'


const width_colum = {
    longest: 250,
    long: 200,
    medium: 150,
    short: 120
}

const dashboard_page = [
    //url name 对应路由，和分类
    {
        'router': 'project_summary',
        'component': [
            { 'type': "date_picker_radios", },
            { 'type': "pie_chart", },
            { 'type': "donut_chart", },
        ]
    },
    {
        'router': 'order_summary',
        'component': [
            { 'type': "date_picker_radios", },
            { 'type': "pie_chart", },
            { 'type': "donut_chart", },
        ]
    },

    {
        'router': 'finance_analyze',
        'component': [
            { 'type': "date_picker_radios", },
            { 'type': "pie_chart", },
            { 'type': "donut_chart", },
        ]
    },

]


export default dashboard_page