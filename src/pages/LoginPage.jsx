import { Button, Form, Input, message } from 'antd';
import useAuthContext from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const { login } = useAuthContext();
    const navigate = useNavigate();

    const onFinish = (values) => {
        const { username, password } = values;
        if (username === 'hasan' && password === '8811') {
            login({ username });
            navigate('/dashboard'); 
        } else {
            message.error('Username or password is incorrect!');
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <Form
                name="basic"
                labelCol={{
                    span: 24,
                }}
                wrapperCol={{
                    span: 24,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 0,
                        span: 24,
                    }}
                >
                    <Button style={{ width: '100%' }} type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default LoginPage;
