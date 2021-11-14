import React from 'react';
import { Pie } from '@ant-design/charts';
const DemoPie = () => {
  const data = [
    {
      type: '虚拟仓',
      value: 27,
    },
    {
      type: '本土代发',
      value: 25,
    },
    {
      type: '自助出单',
      value: 18,
    },
    {
      type: 'FBA入仓',
      value: 15,
    }
  ];
  const config = {
    forceFit: true,
    title: {
      visible: true,
      text: '服务类型统计',
    },
    description: {
      visible: false,
      text:
        '当把饼图label的类型设置为spider时\uFF0C标签分为两组\uFF0C在图表两侧拉线对齐显示\u3002一般来说\uFF0C蜘蛛布局的label更不容易相互遮挡\u3002',
    },
    radius: 0.8,
    data,
    angleField: 'value',
    colorField: 'type',
    label: {
      visible: true,
      type: 'spider',
    },
  };
  return <Pie {...config} />;
};
export default DemoPie;