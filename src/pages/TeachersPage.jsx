import { Image, Table, Button, Modal, Input, Form, Checkbox } from "antd";
import { Fragment, useEffect, useState } from "react";
import request from "../server/request";
import { Link } from "react-router-dom";

function TeachersPage() {
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const getTeachers = async () => {
            try {
                setLoading(true);
                const { data } = await request.get('teachers');
                console.log(data);
                setTeachers(data);
            } finally {
                setLoading(false);
            }
        };
        getTeachers();
    }, []);

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleShow = () => {
        setIsModalOpen(true);
    };

    const showModal = () => {
        handleShow();
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const columns = [
        {
            title: 'FirstName',
            dataIndex: 'firstName',
            key: 'firstName',
            render: (firstName) => <span style={{ fontWeight: 'bold', color: '#333' }}>{firstName}</span>,
        },
        {
            title: 'LastName',
            dataIndex: 'lastName',
            key: 'lastName',
            render: (lastName) => <span style={{ color: '#555' }}>{lastName}</span>,
        },
        {
            title: 'Image',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (_, { avatar }) => (
                <Image
                    style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                    src={avatar || 'fallback-image-url.png'}
                />
            ),
        },
        {
            title: 'Ismarried',
            dataIndex: 'isMarried',
            key: 'isMarried',
            render: (_, { isMarried }) => (
                <span style={{ fontWeight: 'bold' }}>
                    {isMarried ? "Yes" : "No"}
                </span>
            ),
        },
        {
            title: 'Actions',
            render: (_, { id }) => (
                <Fragment>
                    <Button danger style={{ marginRight: '8px' }}>Delete</Button>
                    <Button style={{ marginRight: '8px' }}>Edit</Button>
                    <Link to={`/teachers/${id}`} style={{ color: '#1890ff' }}>Students</Link>
                </Fragment>
            ),
        },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }} className="top">
                <div className="title">
                    <h1 style={{ marginBottom: '16px', color: '#333' }}>Teachers Page</h1>
                </div>
                <div className="btn">
                    <Button onClick={showModal} style={{ marginRight: '8px', border: '1px solid #0077b6', color: '#0077b6' }}>Add teacher</Button>
                </div>
            </div>

            <Table
                dataSource={teachers}
                columns={columns}
                loading={loading}
                bordered
                style={{ backgroundColor: '#f9f9f9', borderRadius: '8px' }}
            />

            <Modal okText="Add Teacher" title="New Teacher" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    name="basic"
                    labelCol={{
                        span: 24,
                    }}
                    wrapperCol={{
                        span: 24,
                    }}
                    autoComplete="off"
                >
                    <Form.Item style={{ marginBottom: '10px' }}
                        label="FirstName"
                        name="firstName"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your first name!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item style={{ marginBottom: '10px' }}
                        label="LastName"
                        name="lastName"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your last name!',
                            },
                        ]}
                    >
                    <Input />
                    </Form.Item>

                    <Form.Item style={{ marginBottom: '10px' }}
                        label="Imahe URL"
                        name="avatar"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your image url!',
                            },
                        ]}
                    >
                    <Input />
                    </Form.Item>

                    <Form.Item style={{ marginBottom: '10px' }}
                        name="isMerried"
                    >
                    <Checkbox>isMerried</Checkbox>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 0,
                            span: 24,
                        }}
                    >
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default TeachersPage;