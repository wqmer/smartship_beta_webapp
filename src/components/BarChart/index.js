import React from 'react';
import { Bar } from '@ant-design/charts';
const DemoBar = () => {
  const data = [
    {
      地区: '美东纽约仓',
      订单量: 400,
    },
    {
      地区: '自助出单',
      订单量: 200,
    },
    {
      地区: '美西圣何塞',
      订单量: 190,
    },
    {
      地区: '美中辛辛那提仓',
      订单量: 160,
    },
    {
      地区: '美西洛杉矶仓',
      订单量: 150,
    },
  ];
  const config = {
    title: {
      visible: true,
      text: '订单处理量',
    },
    forceFit: true,
    data,
    xField: '订单量',
    yField: '地区',
    color: ['#2499f8', '#2499f8','#2499f8','#2499f8','#2499f8',],
    label: {
      visible: true,
      formatter: v => `${v}条订单`,
    },
  };
  return <Bar {...config} />;
};

export default DemoBar;