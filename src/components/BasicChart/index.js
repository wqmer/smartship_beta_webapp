import React from 'react';
import { Column } from '@ant-design/charts';
const DemoColumn = () => {
  const data = [
    {
      type: '1月',
      sales: 38,
    },
    {
      type: '2月',
      sales: 52,
    },
    {
      type: '3月',
      sales: 61,
    },
    {
      type: '4月',
      sales: 145,
    },
    {
      type: '5月',
      sales: 48,
    },
    {
      type: '6月',
      sales: 38,
    },
    {
      type: '7月',
      sales: 38,
    },
    {
      type: '8月',
      sales: 38,
    },
  ];
  const config = {
    title: {
      visible: true,
      text: '订单统计',
    },
    forceFit: true,
    data,
    padding: 'auto',
    xField: 'type',
    yField: 'sales',
    meta: {
      type: {
        alias: '月份',
      },
      sales: {
        alias: '订单量',
      },
    },
  };
  return <Column {...config} />;
};
export default DemoColumn;