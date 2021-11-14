
import React, { Component, PropTypes } from 'react'
import { HomeFilled, EditFilled, PrinterFilled, DeleteFilled } from '@ant-design/icons';
import { Space, Slider, Button } from 'antd';
import { message } from 'antd';
import { Tag, } from 'antd';
import { Typography, } from 'antd';
import { get, post, remove ,put} from '../util/fetch';
import ModalUpdateAddress from '../components/ModalUpdateAddress';
import ModalAddAddress from '../components/ModalAddAddress';
const width_colum = {
    longest: 300,
    long: 225,
    medium: 150,
    short: 125
}

const alignProp = 'left'
const mapTabToContent = (ref) => [
    {
        "key": "address",
        "title": "地址管理",
        'router': 'address',
        "component": {
            "type": 'table',
            'prop': {
                'api_url': {
                    "get_data_pignate": '/user/get_address'
                },
                'row_key': '_id',
                'checkBox': false,
                'table_content': [
                    {
                        title: '操作', key: 'action', width: width_colum.long, align: 'center',
                        fixed: 'left',
                        render: (text, record) => (
                            <Space size={4}>
                                {/* <a type="defa" onClick={() => console.log(123)}> </a> */}
                                <ModalUpdateAddress content={record} tirggleFetchingData={() => ref.child.fetch_data()} />
                                <Button
                                    type="link"
                                    icon={<DeleteFilled />}
                                    onClick={async () => {
                                        // console.log(text)
                                        try {
                                            let result = await post('/user/delete_address', { '_id': record._id })
                                            if (result.code == 0) message.success('删除成功')
                                            ref.child.fetch_data()
                                        } catch (error) {
                                            console.log(error)
                                        }

                                    }} />
                                <Button
                                    disabled={text.type == 'default' ? true : false}
                                    type="link"
                                    icon={<HomeFilled />}
                                    onClick={async() =>{
                                        try {
                                            let result = await put('/user/set_default_address', { '_id': record._id })
                                            if (result.code == 0) message.success('设置默认地址成功')
                                            ref.child.fetch_data()
                                        } catch (error) {
                                            console.log(error)
                                        }
                                    }}
                                />
                                {/* <a> <Text disabled><HomeFilled style={{ fontSize: '16px', }} /></Text> </a> */}
                                {/* <a><HomeFilled style={{ fontSize: '16px', }} /></a> */}
                            </Space>
                        )
                    },
                    {
                        title: '类型', width: width_colum.medium, dataIndex: 'type', align: 'left', key: 'type',
                        render: (text, record) => text == 'default' ? <span>sender   <Tag color="green">默认</Tag></span> : text

                    },
                    { title: '备注名', width: width_colum.long, dataIndex: 'nickname', align: 'left', key: 'nickname', },
                    { title: '地址一', width: width_colum.long, dataIndex: 'address_one', align: alignProp, key: 'address_one', },
                    { title: '地址二', width: width_colum.medium, dataIndex: 'address_two', align: alignProp, key: 'address_two' },
                    { title: '城市', width: width_colum.medium, dataIndex: 'city', align: alignProp, key: 'address_two' },
                    { title: '州', width: width_colum.short, dataIndex: 'state', align: alignProp, key: 'address_two' },
                    // { title: '创建时间', width: width_colum.medium, dataIndex: 'created_at', align: alignProp, key: 'created_at', },
                ],
                'style': { "size": "small", "button_position": 'left', },
                "page_name": "address",
                'buttons': [
                    { key: "add", component: <ModalAddAddress key="add" tirggleFetchingData={() => ref.child.fetch_data()} /> },
                    // { "key": "add", 'content': '添加地址', "type": "primary", "icon": undefined, "isBatchAction": false },
                ]
            }
        }
    },
    {
        "key": "ledger",
        "title": "账单管理",
        'router': 'ledger',
        'component': {
            "type": 'table',
            'prop': {
                'api_url': {
                    "get_data_pignate": '/user/get_ledgers'
                },
                'row_key': 'order_id',
                'checkBox': false,
                'table_content': [
                    { title: '类型', width: width_colum.long, dataIndex: 'type', align: 'center', key: 'type', },
                    { title: '交易金额', width: 80, dataIndex: 'amount', align: 'left', key: 'amount', render: amount => '$ ' + amount.toFixed(2) },
                    { title: '账户余额', width: width_colum.short, dataIndex: 'balance', align: alignProp, key: 'balance', render: amount => '$ ' + amount.toFixed(2) },
                    { title: '交易时间', width: width_colum.medium, dataIndex: 'created_at', align: alignProp, key: 'created_at', },
                    { title: '系统订单号', width: width_colum.medium, dataIndex: 'order_id', align: 'left', key: 'order_id', },
                ],
                'style': { "size": "small", "button_position": 'left', },
                "page_name": "ledgers",
                'filter_content': [
                    {
                        component: 'range_picker',
                        tag: '创建日期',
                        value: [undefined, undefined],
                        api_request_payload: function (start = undefined, end = undefined) { return ({ "created_at": { "$gte": start, "$lte": end } }) },
                        poperty: { placeholder: ['开始时间', '结束时间'] }
                    },
                    {
                        component: 'search_bar',
                        tag: '自定义搜索',
                        value: { test: undefined },
                        api_request_payload: function (start = undefined, end = undefined) { return ({ "created_at": { "$gte": start, "$lte": end } }) },
                        poperty: { placeholder: "搜索任意。。" }
                    },
                    // { component: 'select_tag', tag: '发货渠道', poperty: { placeholder: "选择渠道，可多选" } },
                    // { component: 'select_tag', tag: '渠道', poperty : { placeholder: '' } }
                ],
                'alert': false,
                // 'buttons': [

                //     // { "key": "export", 'content': '导出', "type": "primary", "icon": undefined },
                // ]
            }
        }
    },
    // {
    //     "key": "api",
    //     "title": "API账户",
    //     "component": undefined
    // },

]

export default mapTabToContent