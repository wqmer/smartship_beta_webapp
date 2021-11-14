import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';


import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';


import { Button, Modal, Input, Radio, Select, Row, Col, message } from 'antd';

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

const selectAfter = (
    <Select defaultValue="lb" style={{ width: 60 }}>
        <Select.Option value="lb">lb</Select.Option>
        <Select.Option value="kg">kg</Select.Option>
    </Select>
);

const Rate_estimate_page = Form.create()(
    // eslint-disable-next-line
    class extends React.Component {
        render() {
            const {
                visible, onCancel, onCreate, form,
            } = this.props;

            const { getFieldDecorator } = form;

            const Option = Select.Option;

            function handleChange(value) {
                console.log(`selected ${value}`);
            }

            function cancel(e) {
                console.log(e);
                message.error('Click on No');
            }


            return ( 
                <div style={{ background: '#fff', padding: 32 }}>
                    <Form>
                        <Row gutter={24}>
                            <Col span={9} >
                                <FormItem label="发货邮编"  >
                                    {getFieldDecorator('sender_zip', {
                                        rules: [{ required: true, message: '请输入发货邮编' }],
                                    })(
                                        <Input autoComplete="off" placeholder='5位邮编' />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={9} >
                                <FormItem label="发货城市"  >
                                    {getFieldDecorator('sender_zip', {
                                        rules: [{ required: true, message: '请输入发货邮编' }],
                                    })(
                                        <Input autoComplete="off" placeholder='5位邮编' />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={6} >
                                <FormItem label="发货州"  >
                                    {getFieldDecorator('sender_zip', {
                                        rules: [{ required: true, message: '请输入发货邮编' }],
                                    })(
                                        <Input autoComplete="off" placeholder='5位邮编' />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>

                        <Row gutter={24}>
                            <Col span={9} >
                                <FormItem label="收货邮编"  >
                                    {getFieldDecorator('sender_zip', {
                                        rules: [{ required: true, message: '请输入发货邮编' }],
                                    })(
                                        <Input autoComplete="off" placeholder='5位邮编' />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={9} >
                                <FormItem label="收货城市"  >
                                    {getFieldDecorator('sender_zip', {
                                        rules: [{ required: true, message: '请输入发货邮编' }],
                                    })(
                                        <Input autoComplete="off" placeholder='5位邮编' />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={6} >
                                <FormItem label="收货州"  >
                                    {getFieldDecorator('sender_zip', {
                                        rules: [{ required: true, message: '请输入发货邮编' }],
                                    })(
                                        <Input autoComplete="off" placeholder='5位邮编' />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>





                        <Row gutter={24}>
                            <Col span={9} >
                                <FormItem label="重量"  >
                                    {getFieldDecorator('sender_zip', {
                                        rules: [{ required: true, message: '请输入发货邮编' }],
                                    })(
                                        <Input autoComplete="off" placeholder='5位邮编' />
                                    )}
                                </FormItem>
                            </Col>

                            <Col span={3} >
                                <FormItem label="单位"  >
                                    {getFieldDecorator('unit_weight', {
                                        initialValue: 'a',
                                        rules: [{ required: true, message: '请输入发货邮编' }],
                                    })(
                                        <Radio.Group buttonStyle="solid" size='small'>
                                            <Radio.Button value="a">LB</Radio.Button>
                                            <Radio.Button value="b">KG</Radio.Button>
                                        </Radio.Group>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={3} >
                                <FormItem label="长"  >
                                    {getFieldDecorator('sender_zip', {
                                        rules: [{ required: true, message: '请输入发货邮编' }],
                                    })(
                                        <Input autoComplete="off" placeholder='5位邮编' />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={3} >
                                <FormItem label="宽"  >
                                    {getFieldDecorator('sender_zip', {
                                        rules: [{ required: true, message: '请输入发货邮编' }],
                                    })(
                                        <Input autoComplete="off" placeholder='5位邮编' />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={3} >
                                <FormItem label="高"  >
                                    {getFieldDecorator('sender_zip', {
                                        rules: [{ required: true, message: '请输入发货邮编' }],
                                    })(
                                        <Input autoComplete="off" placeholder='5位邮编' />
                                    )}
                                </FormItem>
                            </Col>

                            <Col span={3} >
                                <FormItem label="单位"  >
                                    {getFieldDecorator('unit_legnth', {
                                        initialValue: 'a',
                                        rules: [{ required: true, message: '请输入发货邮编' }],
                                    })(
                                        <Radio.Group buttonStyle="solid" size='small'>
                                            <Radio.Button value="a">Inch</Radio.Button>
                                            <Radio.Button value="b">Cm</Radio.Button>
                                        </Radio.Group>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>



                        <Row gutter={24}>
                            <Col span={6} >
                                <Button
                                    style={{ marginTop: '20px' }}
                                    // disabled={hasErrors(getFieldsError())}
                                    type="primary" htmlType="submit"
                                >预估邮费</Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            );
        }
    }
);


export default Rate_estimate_page