import { Image, Table } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import request from "../server/request";

function StudentsPage() {
    const { teacherId } = useParams();
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getStudents = async () => {
            try {
                setLoading(true);
                const { data } = await request.get(`students?teacherId=${teacherId}`);
                console.log(data);
                setStudents(data);
            } finally {
                setLoading(false);
            }
        };
        getStudents();
    }, [teacherId]);

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
            title: 'Birthday',
            dataIndex: 'birthday',
            key: 'birthday',
            render: (birthday) => (
                <span style={{ color: '#888' }}>{birthday.slice(0, 10)}</span>
            ),
        },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ marginBottom: '16px', color: '#333' }}>Students of Teacher {teacherId}</h1>
            <Table
                dataSource={students}
                columns={columns}
                loading={loading}
                bordered
                style={{ backgroundColor: '#f9f9f9', borderRadius: '8px' }}
            />
        </div>
    );
}

export default StudentsPage;