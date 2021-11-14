import { Form, Icon as LegacyIcon } from '@ant-design/compatible';

import { ReloadOutlined } from '@ant-design/icons';
import '@ant-design/compatible/assets/index.css';
import {
    Typography,
    Empty,
    Spin,
    Table,
    PageHeader,
    Timeline,
    Button,
    Modal,
    Input,
    Radio,
    Select,
    Row,
    Col,
    Tag,
    message,
    Divider,
    Tabs,
    DatePicker,
    Collapse,
} from 'antd';

import React, { Component, PropTypes } from 'react'
import FilterTag from './check_tag'
import Chip from '@material-ui/core/Chip';
import CloseIcon from '@material-ui/icons/Close';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import moment from 'moment';
import { CloseOutlined, CloseCircleOutlined, CloseCircleFilled, StarFilled, StarTwoTone } from '@ant-design/icons';

const InputGroup = Input.Group;
const { Text } = Typography;
const { Search } = Input;
const { RangePicker } = DatePicker;
const { CheckableTag } = Tag;
const { Option } = Select;
const { Panel } = Collapse;

const { TextArea } = Input;

const selectBefore = (
    <Select defaultValue="单条" >
        <Option value="单条">单条</Option>
        <Option value="批量">批量</Option>
    </Select>
);

const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

const chip_style = { padding: '6px', }

const fitler_content = (page_name, component) => {
    const filter_name = {
        base: [
            <RangePicker
                style={{ width: "100%" }}
                // size='small'
                // showTime={{ format: 'HH:mm' }}
                format="YYYY-MM-DD"
                placeholder={['开始时间', '结束时间']}
                onChange={(value, dateString) => component.filter_onChange({ value, dateString }, 'data_picker')}
                value={[component.state.start, component.state.end]}
            />,
            <Select mode="tags" style={{ width: "100%" }} placeholder="发件地址，可多选" onChange={component.handleChange}>
                {children}
            </Select>,
            <Select mode="tags" style={{ width: "100%" }} placeholder="渠道，可多选" onChange={component.handleChange}>
                {children}
            </Select>,

        ],
        draft: [],
        ready_to_ship: [
            <Select
                placeholder="选择出单状态"
                style={{ width: "100%" }}
                allowClear
                onChange={(value) => component.filter_onChange({ value }, 'select_server_status')}
                value={component.state.server_status}
            >
                <Option value="default">待出运单</Option>
                <Option value="processing">正在出单</Option>
                <Option value="error">服务器报错</Option>
            </Select>,

            <InputGroup compact>
                <Input style={{ width: "30%", textAlign: 'center' }} placeholder="最轻" />
                <Input
                    style={{
                        width: "14%",
                        borderLeft: 0,
                        pointerEvents: 'none',
                        backgroundColor: '#fff',
                        textAlign: 'center'
                    }}
                    placeholder="~"
                    disabled
                />
                <Input style={{ width: "30%", textAlign: 'center', borderLeft: 0 }} placeholder="最重" />

                <Select style={{ width: "26%" }} defaultValue="1">
                    <Option value="1">kg</Option>
                    <Option value="2">lb</Option>
                </Select>
            </InputGroup>,

            <InputGroup compact>
                <Input style={{ width: "40%", textAlign: 'center' }} placeholder="最低运费" />
                <Input
                    style={{
                        width: "20%",
                        borderLeft: 0,
                        pointerEvents: 'none',
                        backgroundColor: '#fff',
                        textAlign: 'center'
                    }}
                    placeholder="~"
                    disabled
                />
                <Input style={{ width: "40%", textAlign: 'center', borderLeft: 0 }} placeholder="最高运费" />
            </InputGroup>,
        ],
        completed: [
            <Select placeholder="打印状态" style={{ width: "100%" }} >
                <Option value="jack">已打印</Option>
                <Option value="lucy">未打印</Option>
            </Select>,

            <Select placeholder="选择物流状态" style={{ width: "100%" }} >
                <Option value="jack">投递</Option>
                <Option value="lucy">运输中</Option>
                <Option value="Yiminghe">创建</Option>
                <Option value="123">异常</Option>
            </Select>,


            <InputGroup compact>
                <Input style={{ width: "30%", textAlign: 'center' }} placeholder="最轻" />
                <Input
                    style={{
                        width: "14%",
                        borderLeft: 0,
                        pointerEvents: 'none',
                        backgroundColor: '#fff',
                        textAlign: 'center'
                    }}
                    placeholder="~"
                    disabled
                />
                <Input style={{ width: "30%", textAlign: 'center', borderLeft: 0 }} placeholder="最重" />

                <Select style={{ width: "26%" }} defaultValue="1">
                    <Option value="1">kg</Option>
                    <Option value="2">lb</Option>
                </Select>
            </InputGroup>,


            <InputGroup compact>
                <Input style={{ width: "40%", textAlign: 'center' }} placeholder="最低运费" />
                <Input
                    style={{
                        width: "20%",
                        borderLeft: 0,
                        pointerEvents: 'none',
                        backgroundColor: '#fff',
                        textAlign: 'center'
                    }}
                    placeholder="~"
                    disabled
                />
                <Input style={{ width: "40%", textAlign: 'center', borderLeft: 0 }} placeholder="最高运费" />
            </InputGroup>,
        ]
    }

    return ({
        base: filter_name.base,
        extra: filter_name[page_name]
    })
}

const convertArrayToObject = (array, key) => {
    const initialValue = {};
    return array.reduce((obj, item) => {
        return { ...obj, [item[key]]: item, };
    }, initialValue);
};


class Filter extends Component {
    constructor(props) {
        super(props);

    }

    state = {
        ...convertArrayToObject(this.props.filter_content.map(({ tag, api_request_payload, poperty, ...keepAttrs }) => keepAttrs), 'component'),
        server_status: undefined,
        display_more: false,
        icon_type: 'down',
        description: '更多筛选',
        filter_tags: [],
    }

    //添加一个筛选组件步骤：
    // 一 在fitler_content中添加或者修改组件， 实现state 和 value 的绑定
    // 二 在filter的state 中 添加初始状态 ， 
    // 三 在filter_onChange 添加 state 改变和请求字段，此方法需要和组件中自带Onchange方法进行绑定。也会和触发父组件table的方法，进行实际筛选请求，展示对应数据。此步可以实现筛选组件自有的清除和添加功能
    // 四 在table 中 get_filter_tag 设置tag显示名字（对应，请求字段），为了实现展示 filter tag
    // 五 在handle_tag_close中添加关闭对应组件的tag 的方法。实际就是还原state，和清除对应filter并再次触发父组件的筛选请求，并展示数据
    // 最后再 reset_all_filter中设置还原初始状态，为了使重置控件能重置当前的组件

    filter(filter_obj) {
        switch (filter_obj.component) {
            case 'range_picker':
                return (
                    <RangePicker
                        {...filter_obj.poperty}
                        ranges={{
                            Today: [moment().startOf('day'), moment().endOf('day')],
                            'This Month': [moment().startOf('month'), moment().endOf('month')],
                        }}
                        style={{ width: "100%" }}
                        size='middle'
                        format="YYYY-MM-DD HH:mm:ss"
                        // onChange={(value, dateString) => component.filter_onChange({ value, dateString }, 'data_picker')}
                        onChange={(value, dateString) => {
                            // console.log(value[0])
                            let start_data = value ? value[0] : null
                            let end_data = value ? value[1] : null
                            let filter_type = value ? 'add' : 'clear'

                            // console.log(dateString)

                            // let request_start_data = start_data.format('YYYY-MM-DD HH:mm:ss')
                            // let request_end_data  = end_data.format('YYYY-MM-DD HH:mm:ss')

                            this.props.handle_filter(filter_obj.api_request_payload(dateString[0], dateString[1]), filter_obj.tag, filter_type)
                            this.setState({ 'range_picker': { ...this.state.range_picker, value: [start_data, end_data] } })
                        }}
                        value={this.state['range_picker'].value}
                    />);

            case "select_tag":
                return (
                    <Select
                        size='middle'
                        {...filter_obj.poperty}
                        // bordered={false}
                        mode="tags"
                        style={{ width: "100%" }}
                    // onChange={component.handleChange}
                    >
                        {children}
                    </Select>
                );

            case "search_bar":
                return (
                    // <TextArea style={{ width: "90%" }}   placeholder="textarea with clear icon" allowClear  />
                    <Search
                        size='middle'
                        {...filter_obj.poperty}
                        style={{ width: "100%" }}
                        onSearch={value => console.log(value)} enterButton
                    />
                    // <Input 
                    //     {...filter_obj.poperty}
                    //     // addonBefore={preffix}
                    //     size="middle"
                    //     style={{ width: "90%" }}
                    //     placeholder="搜索" />
                );
            default:
                return null;

        }
    }

    filter_tag(filter_tag_name) {
        switch (filter_tag_name) {
            case 'is_all':
                return (
                    <Chip
                        style={chip_style}
                        label="全部"
                        // color="primary"
                        variant="outlined"
                        size='small'
                    />);
            case "is_searching":
                return (
                    <Chip
                        style={chip_style}
                        label='自定义搜索'
                        // color="primary"
                        variant="outlined"
                        size='small'
                        onDelete={(e) => {
                            this.props.handle_clear_search()
                        }}
                    />)
            // case filter_tag_name:
            //     return (
            //         <Chip
            //             deleteIcon={<CloseRoundedIcon />}
            //             style={chip_style}
            //             label={filter_tag_name}
            //             // color="primary"
            //             variant="outlined"
            //             size='small'
            //             onDelete={(e) => {
            //                 let obj = this.props.filter_content.find(item => item.tag == filter_tag_name)
            //                 this.props.handle_filter(obj.api_request_payload(), obj.tag, 'clear')
            //                 let state = {}
            //                 state[obj.component] = { ...this.state[obj.component], value: obj.value }
            //                 this.setState({ ...state })
            //                 // this.handle_tag_close(filter_tag_name)
            //             }}
            //         />);

            case filter_tag_name:
                return (
                    <Tag
                        style={{ transform: 'scale(1.10)' }}
                        // style={{ height: 'auto', width: '110%' }}
                        // color="primary"
                        // variant="outlined"
                        // color="#f50"
                        color='#f0f0f0'
                        // size='middle'
                        closeIcon={<CloseCircleFilled />}
                        closable
                        onClose={(e) => {
                            let obj = this.props.filter_content.find(item => item.tag == filter_tag_name)
                            this.props.handle_filter(obj.api_request_payload(), obj.tag, 'clear')
                            let state = {}
                            state[obj.component] = { ...this.state[obj.component], value: obj.value }
                            this.setState({ ...state })
                            // this.handle_tag_close(filter_tag_name)
                        }}
                    >
                        <Text>{filter_tag_name}</Text>

                    </Tag>
                );

            default:
                return null
        }
    }

    show_filter = (filter) => {
        let break_point = 3
        let row = Math.ceil(filter.length / break_point)
        let result = []

        // console.log(filter)
        for (let i = 0; i < row; i++) {
            let element =
                <Row key={i} gutter={24} hidden={!this.state.display_more && i > 0} style={{ marginTop: i > 0 ? "16px" : "0px" }}>
                    <Col span={2}> <span style={{ fontSize: '15px', fontWeight: 600 }}> {i == 0 ? '筛选：' : undefined}</span>  </Col>
                    {filter.map((item, index) => { if ((Math.floor(index / break_point)) == i) return (<Col key={index} span={6} >{this.filter(item)}</Col>) })}
                    {i == 0 ? <Col hidden={row > 1 ? false : true} style={{ textAlign: 'right', paddingTop: 6 }} span={3} > <a style={{ fontSize: '13px' }} onClick={() => this.handle_more()} > {this.state.description} <LegacyIcon type={this.state.icon_type} /></a></Col> : undefined}
                    {/* {i == 0 ? <Col span={3} style={{ textAlign: 'right', paddingTop: 6 }} ><a>高级查询 》</a></Col> : undefined } */}
                </Row>
            result.push(element)
        }
        return result
    }

    reset_all_filter() {
        this.setState({
            ...convertArrayToObject(this.props.filter_content.map(({ tag, api_request_payload, poperty, ...keepAttrs }) => keepAttrs), 'component'),
            server_status: undefined,
            display_more: false,
            icon_type: 'down',
            description: '更多筛选',
            filter_tags: [],
            start: undefined,
            end: undefined,
            server_status: undefined,
        })
        this.props.reset_all_filter()
    }

    handle_more = () => this.setState({
        display_more: !this.state.display_more,
        icon_type: this.state.icon_type == 'down' ? 'up' : 'down',
        description: this.state.description == '更多筛选' ? '收起' : '更多筛选'
    })

    componentDidMount() { this.props.onRef(this) }


    render() {

        return (
            <div style={{ boxShadow: 'rgb(217, 217, 217) 1px 1px 7px 0px', padding: "24px 32px 16px 32px", background: '#fff' }} hidden={this.props.filter_content.length == 0} >
                {/* filter 显示区域 */}
                {this.show_filter(this.props.filter_content)}

                <Divider style={{ marginTop: "16px", marginBottom: "8px" }} dashed />

                {/* filter tag 显示区域*/}
                <Row hidden={this.props.filter_tags.length == 1 && this.props.filter_tags[0] == "is_all"} gutter={25} type="flex">
                    <Col span={2} >  <span style={{ fontSize: '14px', fontWeight: 600 }}>过滤：</span>  </Col>
                    {/* 显示当前所有filter tag , 这个key不能使用index。一定用唯一的标识作key，当数组会有改变的时候，数据会有重叠 */}
                    {this.props.filter_tags.map((item, index) => <Col span={2} key={item} > {this.filter_tag(item)} </Col>)}

                    {/* reset 按钮 */}
                    {/* <Col span={1}  hidden={!this.props.show_reset} style={{ paddingTop: 1 }} >
                        <Button style={{ opacity: 0.4 }} onClick={() => this.reset_all_filter()} type="dashed" size="small" shape='circle' icon={<ReloadOutlined />} />
                    </Col> */}
                </Row>
            </div>
        );
    }
}

export default Filter