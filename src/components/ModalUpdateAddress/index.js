import { message, Modal, Form, Button } from 'antd';
import React, { useState } from 'react';
import AddressForm from '../AddressForm';
import { get, post } from '../../util/fetch';
import { EditFilled } from '@ant-design/icons';
const CollectionCreateForm = ({ content, confirmLoading, visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    return (
        <Modal
            getContainer={() => document.getElementById("Page")}
            maskClosable = {false}
            visible={visible}
            destroyOnClose={true}
            bodyStyle={{ height: 400 }}
            width={1000}
            title="编辑地址"
            cancelText="取消"
            confirmLoading={confirmLoading}
            destroyOnClose={true}
            onCancel={() => {
                onCancel()
            }}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        onCreate(values);
                        // form.resetFields()
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    })
            }}
        >
            <AddressForm content={content} form={form} />
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
            let result = await post('/user/update_address', { _id: props.content._id, ...values })
            if (result.code == 0) {
                setVisible(false)
                setTimeout(() => message.success('更新地址成功'), 500)
            }
        } catch (error) {
            // console.log()
            if (error.response.status == 404) setTimeout(() => message.warn('更新地址失败，或已被删除'), 500)

        } finally {
            setLoading(false)
            setTimeout(() => props.tirggleFetchingData(), 100)
        }
        // console.log('Received values of form: ', values);

    };

    return (
        <div >
            <Button type="link" onClick={() => setVisible(true)} icon={<EditFilled />} />
            <CollectionCreateForm
                content={props.content}
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