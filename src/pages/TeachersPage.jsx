import { Image, Table, Button, Modal, Input, Form, Checkbox, message } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import request from "../server/request";

const { useForm } = Form;

function TeachersPage() {
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);
    const [selectedTeacherId, setSelectedTeacherId] = useState(null);
    const [form] = useForm();

    useEffect(() => {
        fetchTeachers();
    }, []);

    // Fetch teachers list
    const fetchTeachers = async () => {
        setLoading(true);
        try {
            const { data } = await request.get('teachers');
            setTeachers(data);
        } catch (error) {
            message.error("Failed to fetch teachers");
        } finally {
            setLoading(false);
        }
    };

    // Open Modal with teacher data if editing
    const openModal = async (teacherId = null) => {
        if (teacherId) {
            try {
                setModalLoading(true);
                const { data } = await request.get(`teachers/${teacherId}`);
                form.setFieldsValue(data);
                setSelectedTeacherId(teacherId);
            } catch {
                message.error("Failed to fetch teacher data");
            } finally {
                setModalLoading(false);
            }
        } else {
            form.resetFields();
        }
        setIsModalOpen(true);
    };

    // Close Modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTeacherId(null);
        form.resetFields();
    };

    // Handle Add or Update Teacher
    const handleFormSubmit = async () => {
        setModalLoading(true);
        try {
            const values = await form.validateFields();
            if (selectedTeacherId) {
                await request.put(`teachers/${selectedTeacherId}`, values);
                message.success("Teacher updated successfully");
            } else {
                await request.post('teachers', values);
                message.success("Teacher added successfully");
            }
            fetchTeachers();
            closeModal();
        } catch (error) {
            message.error("Failed to save teacher");
        } finally {
            setModalLoading(false);
        }
    };

    // Delete Teacher
    const deleteTeacher = async (teacherId) => {
        setLoading(true);
        try {
            await request.delete(`teachers/${teacherId}`);
            message.success("Teacher deleted successfully");
            fetchTeachers();
        } catch {
            message.error("Failed to delete teacher");
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
            render: (text) => <span style={{ fontWeight: 'bold', color: '#333' }}>{text}</span>,
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
            render: (text) => <span style={{ color: '#555' }}>{text}</span>,
        },
        {
            title: 'Image',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (avatar) => (
                <Image
                    style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                    src={avatar || 'fallback-image-url.png'}
                />
            ),
        },
        {
            title: 'Married Status',
            dataIndex: 'isMarried',
            key: 'isMarried',
            render: (isMarried) => <span>{isMarried ? "Yes" : "No"}</span>,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <>
                    <Button danger onClick={() => deleteTeacher(record.id)} style={{ marginRight: 8 }}>
                        Delete
                    </Button>
                    <Button onClick={() => openModal(record.id)} style={{ marginRight: 8 }}>
                        Edit
                    </Button>
                    <Link to={`/teachers/${record.id}`} style={{ color: '#1890ff' }}>
                        Students
                    </Link>
                </>
            ),
        },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <h1>Teachers ({teachers.length})</h1>
                <Button
                    type="primary"
                    onClick={() => openModal()}
                >
                    Add Teacher
                </Button>
            </div>

            <Table
                dataSource={teachers}
                columns={columns}
                loading={loading}
                bordered
                rowKey="id"
                style={{ backgroundColor: '#f9f9f9', borderRadius: '8px' }}
            />

            <Modal
                title={selectedTeacherId ? "Edit Teacher" : "Add Teacher"}
                visible={isModalOpen}
                onOk={handleFormSubmit}
                onCancel={closeModal}
                confirmLoading={modalLoading}
            >
                <Form form={form} layout="vertical" autoComplete="off">
                    <Form.Item
                        label="First Name"
                        name="firstName"
                        rules={[{ required: true, message: 'Please enter first name' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Last Name"
                        name="lastName"
                        rules={[{ required: true, message: 'Please enter last name' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Image URL"
                        name="avatar"
                        rules={[{ required: true, message: 'Please enter image URL' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="isMarried" valuePropName="checked">
                        <Checkbox>Married</Checkbox>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default TeachersPage;