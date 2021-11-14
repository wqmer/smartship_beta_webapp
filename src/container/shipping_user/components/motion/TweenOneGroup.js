import React from 'react';
import ReactDOM from 'react-dom';
import QueueAnim from 'rc-queue-anim';
import 'antd/dist/antd.css';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { Button , Table , Divider} from 'antd';
import { Popconfirm, message } from 'antd';
import Animate from 'rc-animate';
import { TweenOneGroup } from 'rc-tween-one';


const TweenOneGroupBody = props =>  
     <TweenOneGroup
          component="tbody"
          {...props}

        enter = {[
                   {
                     opacity: 0, x: 30, backgroundColor: '#fffeee', duration: 0,
                   },
                   {
                     height: 0,
                     duration: 200,
                     type: 'from',
                     delay: 250,
                     ease: 'easeOutQuad',
                     onComplete: (e) => {  const dom = e.target;
                                           dom.style.height = 'auto';
                                        }
                    },
                    {
                      opacity: 1, x: 0, duration: 250, ease: 'easeOutQuad',
                    },
                    { delay: 1000, backgroundColor: '#fff' },
                ]}

        leave={[
                 { duration: 250, opacity: 0 },
                 { height: 0, duration: 200, ease: 'easeOutQuad' },
               ]}
               
        appear={true}
      

        exclusive ={true}
        >
          {props.children}
</TweenOneGroup>

export default  TweenOneGroupBody 