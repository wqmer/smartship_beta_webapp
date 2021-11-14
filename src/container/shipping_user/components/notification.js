import NoticeIcon from 'ant-design-pro/lib/NoticeIcon';
import { Tag } from 'antd';
import React, { Component, PropTypes } from 'react'

const data = [
  {
    id: '000000001',
    // avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
    title: '预付款1000美金已入账',
    datetime: '2017-08-09',
    type: 'notification',
  },
  {
    id: '000000002',
    // avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
    title: '订单号xxx已经完成退款',
    datetime: '2017-08-08',
    type: 'notification',
  },
  {
    id: '000000003',
    // avatar: 'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png',
    title:'订单号xx退回件已经解决',
    datetime: '2017-08-07',
    read: true,
    type: 'notification',
  },
  {
    id: '000000004',
    // avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
    title: '恭喜你晋升为vip，享有最高折扣的邮费',
    datetime: '2017-08-07',
    type: 'notification',
  },
  {
    id: '000000005',
    // avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
    title: '内容不要超过两行字，超出时自动截断',
    datetime: '2017-08-07',
    type: 'notification',
  },
  // {
  //   id: '000000006',
  //   avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
  //   title: '曲丽丽 评论了你',
  //   description: '描述信息描述信息描述信息',
  //   datetime: '2017-08-07',
  //   type: 'message',
  //   clickClose: true,
  // },
  // {
  //   id: '000000007',
  //   avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
  //   title: '朱偏右 回复了你',
  //   description: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
  //   datetime: '2017-08-07',
  //   type: 'message',
  //   clickClose: true,
  // },
  // {
  //   id: '000000008',
  //   avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
  //   title: '标题',
  //   description: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
  //   datetime: '2017-08-07',
  //   type: 'message',
  //   clickClose: true,
  // },
  // {
  //   id: '000000009',
  //   title: '任务名称',
  //   description: '任务需要在 2017-01-12 20:00 前启动',
  //   extra: '未开始',
  //   status: 'todo',
  //   type: 'event',
  // },
  // {
  //   id: '000000010',
  //   title: '第三方紧急代码变更',
  //   description: '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务',
  //   extra: '马上到期',
  //   status: 'urgent',
  //   type: 'event',
  // },
  // {
  //   id: '000000011',
  //   title: '信息安全考试',
  //   description: '指派竹尔于 2017-01-09 前完成更新并发布',
  //   extra: '已耗时 8 天',
  //   status: 'doing',
  //   type: 'event',
  // },
  // {
  //   id: '000000012',
  //   title: 'ABCD 版本发布',
  //   description: '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务',
  //   extra: '进行中',
  //   status: 'processing',
  //   type: 'event',
  // },
];

function onItemClick(item, tabProps) {
  console.log(item, tabProps);
}

function onClear(tabTitle) {
  console.log(tabTitle);
}

function getNoticeData(notices) {
  if (notices.length === 0) {
    return {};
  }
  const newNotices = notices.map(notice => {
    const newNotice = { ...notice };
    // transform id to item key
    if (newNotice.id) {
      newNotice.key = newNotice.id;
    }
    if (newNotice.extra && newNotice.status) {
      const color = {
        todo: '',
        processing: 'blue',
        urgent: 'red',
        doing: 'gold',
      }[newNotice.status];
      newNotice.extra = (
        <Tag color={color} style={{ marginRight: 0 }}>
          {newNotice.extra}
        </Tag>
      );
    }
    return newNotice;
  });
  return newNotices.reduce((pre, data) => {
    if (!pre[data.type]) {
      pre[data.type] = [];
    }
    pre[data.type].push(data);
    return pre;
  }, {});
}

const noticeData = getNoticeData(data);
const Demo_notfication = () => (
  <div
    style={{
      // textAlign:'right',
      // float:'right',
      display: 'inline-block',
      height: '64px',
      lineHeight: '64px',
      width: '12%',
      paddingRight:'20px'
      // position: 'fixed',
      // top: '0px' ,
      // right:'50px',
    }}
  >
    <NoticeIcon className="notice-icon" count={5} onItemClick={onItemClick} onClear={onClear}>
      <NoticeIcon.Tab
        list={noticeData.notification}
        title="账户变动"
        emptyText="你已查看所有通知"
        emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
      />
      {/* <NoticeIcon.Tab
        list={noticeData.message}
        title="message"
        emptyText="您已读完所有消息"
        emptyImage="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
      />
      <NoticeIcon.Tab
        list={noticeData.event}
        title="event"
        emptyText="你已完成所有待办"
        emptyImage="https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg"
      /> */}
    </NoticeIcon>
  </div>
);

export default Demo_notfication