import React from 'react';
import { GroupedColumn } from '@ant-design/charts';

const DemoGroupedColumn = () => {
  const data = [
    {
      name: '交易额',
      月份: 'Jan.',
      数额: 18.9,
    },
    {
      name: '交易额',
      月份: 'Feb.',
      数额: 28.8,
    },
    {
      name: '交易额',
      月份: 'Mar.',
      数额: 39.3,
    },
    {
      name: '交易额',
      月份: 'Apr.',
      数额: 81.4,
    },
    {
      name: '交易额',
      月份: 'May',
      数额: 47,
    },
    {
      name: '交易额',
      月份: 'Jun.',
      数额: 20.3,
    },
    {
      name: '交易额',
      月份: 'Jul.',
      数额: 24,
    },
    {
      name: '交易额',
      月份: 'Aug.',
      数额: 35.6,
    },
    {
      name: '净利润',
      月份: 'Jan.',
      数额: 12.4,
    },
    {
      name: '净利润',
      月份: 'Feb.',
      数额: 23.2,
    },
    {
      name: '净利润',
      月份: 'Mar.',
      数额: 34.5,
    },
    {
      name: '净利润',
      月份: 'Apr.',
      数额: 99.7,
    },
    {
      name: '净利润',
      月份: 'May',
      数额: 52.6,
    },
    {
      name: '净利润',
      月份: 'Jun.',
      数额: 35.5,
    },
    {
      name: '净利润',
      月份: 'Jul.',
      数额: 37.4,
    },
    {
      name: '净利润',
      月份: 'Aug.',
      数额: 42.4,
    },
  ];
  const config = {
    title: {
      visible: false,
      text: '财务报表',
    },
    forceFit: true,
    data,
    xField: '月份',
    yField: '数额',
    yAxis: {
      min: 0,
    },
    label: {
      visible: true,
    },
    groupField: 'name',
    color: ['#1ca9e6', '#f88c24'],
  };
  return <GroupedColumn {...config} />;
};

export default DemoGroupedColumn;
