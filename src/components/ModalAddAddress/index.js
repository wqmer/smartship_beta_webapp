import { message, Modal, Form, Button } from 'antd';
import React, { useState } from 'react';
import AddressForm from '../AddressForm';
import { get, post } from '../../util/fetch';
import { EditFilled, PlusOutlined, DeleteFilled } from '@ant-design/icons';


const CollectionCreateForm = ({ confirmLoading, visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    return (
        <Modal
            getContainer={() => document.getElementById("Page")}
            maskClosable = {false}
            visible={visible}
            destroyOnClose={true}
            bodyStyle={{ height: 400 }}
            width={1000}
            title="添加地址"
            cancelText="Cancel"
            confirmLoading={confirmLoading}
            destroyOnClose={true}
            onCancel={() => {
                onCancel()
                form.resetFields()
            }}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        onCreate(values);
                        // form.resetFields()
                    })
                    .then(() => setTimeout(() => form.resetFields(), 1000))
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    })
            }}
        >
            <AddressForm form={form} />
        </Modal>
    );
};

const CollectionsPage = (props) => {
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setLoading] = useState(false);

    const onCreate = async (values) => {
        //这里加入服务器的api请求处理，并异步处理返回，关闭对话框
        try {
            setLoading(true)
            let result = await post('/user/add_address', values)
            if (result.code == 0) {
                setLoading(false)
                setVisible(false)
                setTimeout(() => message.success('添加地址成功'), 500)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setTimeout(() => props.tirggleFetchingData(), 100)
        }
        // console.log('Received values of form: ', values);

    };

    return (
        <div >
            <Button
                type="primary"
                shape="circle"
                onClick={() => {
                    setVisible(true);
                }}
                icon={<PlusOutlined />}
            />
            <CollectionCreateForm
                confirmLoading={confirmLoading}
                visible={visible}
                onCreate={onCreate}
                onCancel={() => {
                    setVisible(false);
                }}
            />
        </div>
    );
};

export default CollectionsPage