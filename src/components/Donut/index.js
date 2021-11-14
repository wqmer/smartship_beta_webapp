import React from 'react';
import { Donut } from '@ant-design/charts';
const DemoDonut = () => {
  const data = [
    {
      type: '业务员一',
      value: 27,
    },
    {
      type: '业务员二',
      value: 25,
    },
    {
      type: '业务员三',
      value: 18,
    },
    {
      type: '网络搜索',
      value: 15,
    },
    {
      type: '朋友推荐',
      value: 10,
    },
    {
      type: '其它',
      value: 5,
    },
  ];
  const config = {
    forceFit: true,
    title: {
      visible: true,
      text: '客户来源',
    },
    description: {
      visible: false,
      text: '环图指标卡能够代替tooltip\uFF0C在环图中心挖空部分显示各分类的详细信息\u3002',
    },
    radius: 0.8,
    padding: 'auto',
    data,
    angleField: 'value',
    colorField: 'type',
    statistic: {
      visible: true,
    },
  };
  return <Donut {...config} />;
};
export default DemoDonut;