import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import QueueAnim from 'rc-queue-anim';


const myQueueAnim = props => <QueueAnim component= "tbody"  type={['right', 'left']} leaveReverse {...props} > </QueueAnim>
export default myQueueAnim 
