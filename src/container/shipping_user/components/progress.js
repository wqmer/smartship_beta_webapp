import { Progress } from 'antd';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import React, { Component } from 'react';

class My_progress extends React.Component {
    constructor(props) {
        super(props);
        this.state = { percent: 0 };
    }

    add_ten_percent() {
        if (this.state.percent < 35) {
            this.setState(state => ({
                percent: state.percent + 10
            }));
        }
        else if (this.state.percent >= 35 && this.state.percent < 100 ) {
            this.setState(state => ({
                percent: state.percent + 10
            }));
            this.props.got_progress()
        }
        else if (this.state.percent == 100) {
            this.props.got_finished()
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.percent > 100 ? false : true
    }

    componentDidMount() {
        this.interval = setInterval(() => this.add_ten_percent(), 120);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div>
                <Progress width={150} type="circle" percent={this.state.percent} />
            </div>
        );
    }
}

export default My_progress