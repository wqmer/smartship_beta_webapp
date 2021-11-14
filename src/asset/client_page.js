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
    short: 100
}

const alignProp = 'left'


const client_page = [
    //url name 代表了状态分类，在api 请求时自动添加过滤关键字。
    {
        'router': 'activated',
        'component': {
            "type": 'table',
            'prop': {
                'api_url': {
                    "get_data_pignate": '/forwarder/get_users'
                },
                'row_key': 'user_id',
                'table_content': [
                    { title: 'ID', width: width_colum.medium, dataIndex: 'user_id', key: 'user_id', align: alignProp },
                    { title: '类型', width: width_colum.medium, dataIndex: 'type', align: alignProp, key: 'type', },
                    // { title: '用户名', width: width_colum.medium, dataIndex: 'user_name', align: alignProp, key: 'user_name', },
                    // { title: '姓名', dataIndex: ['parcel', 'weight'], width: width_colum.medium, align: 'center', key: 'Weight', },
                    { title: '余额', width: width_colum.medium, dataIndex: 'balance', align: alignProp, key: 'balance', },

                    { title: '注册时间', width: width_colum.medium, dataIndex: 'date_registered', align:alignProp, key: 'date_registered', },
                    {
                        title: '可用服务', width: width_colum.medium, align: 'center', key: 'service',
                        render: (text, record) => (
                            <span>
                                <a type="defa" onClick={() => this.child.handle_action(record.user_id, 'submit')}>配置</a>
                            </span>
                        )
                    },

                    {
                        title: '操作', key: 'action', width: width_colum.medium, align: 'center',
                        fixed: 'right',
                        render: (text, record) => (
                            <span>
                                <a type="defa" onClick={() => this.child.handle_action(record.user_id, 'submit')}>充值</a>
                                <Divider type="vertical" />
                                <a type="defa" >扣费</a>
                                <Divider type="vertical" />
                                <a type="defa" onClick={() => this.child.handle_action(record.user_id, 'delete')} >冻结</a>
                            </span>
                        )
                    }
                ],
                "page_name": "activated",
                'filter_content': [
                    {
                        component: 'range_picker',
                        tag: '注册日期',
                        value: [undefined, undefined],
                        api_request_payload: function (start = undefined, end = undefined) { return ({ "date_registered": { "$gte": start, "$lte": end } }) },
                        poperty: { placeholder: ['开始时间', '结束时间'] }
                    },
                ],

            }
        },



        'button': {
            'action': ['submit', 'delete'],
            'batch': ['批量递交', '批量删除']
        }

    },
]


export default client_page

