import React, { Component, PropTypes } from 'react'
import Animate from 'rc-animate'
import {
    Space,
    Layout,
} from 'antd';

import Demo_avatar from '../Avatar'
import Demo_notification from '../Notification'
import Balance from '../Balacne'
import { get, post, } from '../../util/fetch';
import axios from 'axios';




const { Header, Sider, Content, Footer } = Layout;
const siderWidth = 215
class CustomHeader extends Component {
    constructor(props) {
        super(props);
        this.mounted = false
        // this.eventSource = new EventSource("events");
        // this.test = this.test.bind(this);
        // this.eventSource = new EventSource("http://localhost:8081/api/forwarder/event");
    }


    state = {
        header_hidden: false,
        balance: 0,
        updated: false,
    };

    handleScroll = e => {
        // console.log(e)
        const currentStatus = this.state.header_hidden
        if (e.target.className == 'ant-layout-content') {
            if (e.srcElement.scrollTop > 64 && !currentStatus) this.setState({ header_hidden: true })
            if (e.srcElement.scrollTop <= 64 && currentStatus) this.setState({ header_hidden: false })
        }
    }

    fetchData = async (cancelToken) => {
        // console.log('request to data')
        const result = await get('/user/userInfo', cancelToken);
        return result
    };

    componentDidMount = () => {
        console.log('it refresh')
        this.mounted = true
        this.axiosCancelSource = axios.CancelToken.source()
        document.getElementById("content").addEventListener('scroll', this.handleScroll.bind(this), true)
    }

    // componentDidUpdate = async (prevProps, prevState, snapshot) => {
    //     if (this.props.requiredToRefresh && !this.state.updated) {
    //         const result = await this.fetchData({ cancelToken: this.axiosCancelSource.token })
       
    //         this.setState({updated : true})
    //     //    if() this.setState({ balance: result.data.balance })
    //     }
    //     console.log("prevState is " + prevState.updated)
    //     console.log("currentState is " + this.state.updated)
    //     console.log('it triggle from componentDidUpdate')
    // }



    componentWillReceiveProps = async (prevProps) => {
        // console.log('prevProps ' + prevProps.requiredToRefresh)
        // console.log('current props ' + this.props.requiredToRefresh)
        try {
            // console.log(this.props)
            // this.axiosCancelSource = axios.CancelToken.source()
            if (prevProps.requiredToRefresh) {
                // console.log('it works on http request')
                const result = await this.fetchData({ cancelToken: this.axiosCancelSource.token })
                if(result.data.balance != this.state.balance) this.setState({ balance: result.data.balance })
             
            }

            // this.setState({ balance: result.data.balance })

        } catch (error) {
            this.axiosCancelSource.cancel('Axios request canceled.')
            // console.log(error)
            // this.setState({ balance: result.data.balance })     
        }
    }

    componentWillUnmount() {
        console.log(123)
        this.mounted = false
        this.axiosCancelSource.cancel('Axios request canceled.')

        // this.eventSource.close()
        // console.log('i triggered by componentWillUnmount in homepage') 

        // SourceCancel()
        document.getElementById("content").removeEventListener('scroll', this.handleScroll);
    }

    render() {
        return (
            <div>
                <Animate transitionName="fade">
                    {!this.state.header_hidden ?
                        <Header
                            style={{
                                boxShadow: 'rgb(204, 204, 204) 0px 0px 10px',
                                height: '64px',
                                left: this.props.siderWidth,
                                // borderBottom: '1px solid rgb(235, 237, 240)',

                                position: 'fixed',
                                zIndex: 1,
                                width: '100%',
                                background: '#fff',
                                padding: 0,
                            }}>
                            {this.props.page_header_title}
                            <div
                                style={{
                                    textAlign: 'right',
                                    // boxShadow: '0 1px 4px rgba(0,21,41,.12)',
                                    display: 'inline-block',
                                    position: 'fixed',
                                    top: '0px',
                                    right: '24px',
                                    width: '800px',
                                    height: '48px'
                                }}>

                                {/* <Demo_search_bar_top /> */}
                                <Space align="baseline" size={1}>
                                    {/* <InputWithoutBorder/> */}
                                    {/* <Balance balance={this.state.balance} />
                                    <Demo_notification />
                                    <Demo_avatar name='kimi' logout={() => this.props.logout()} /> */}
                                </Space>
                            </div>
                        </Header> : null}
                </Animate>
            </div>)
    }
}


export default CustomHeader