import React from 'react';
import { Column } from '@ant-design/charts';
const DemoColumn = () => {
    const data = [
        {
            type: '咨询客户',
            amount: 98,
        },
        {
            type: '注册客户',
            amount: 50,
        },
        {
            type: '成交客户',
            amount: 30,
        },
        {
            type: '活跃客户',
            amount: 5,
        },
    ];
    const config = {
        title: {
            visible: true,
            text: '客户转化率',
        },
        description: {
            visible: false,
            text: '基础柱状图的图形之间添加转化率标签图形\uFF0C用户希望关注从左到右的数据变化比例',
        },
        forceFit: true,
        data,
        padding: 'auto',
        xField: 'type',
        yField: 'amount',
        meta: {
            type: {
                alias: '类别',
            },
            amount: {
                alias: '客户数量',
            },
        },
        conversionTag: {
            visible: true,
        },
    };
    return <Column {...config} />;
};
export default DemoColumn;