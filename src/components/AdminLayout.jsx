import { useState, useMemo } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UsergroupAddOutlined,
    DashboardOutlined,
    UserAddOutlined,
    UserSwitchOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { pathname } = useLocation();
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const menuItems = useMemo(() => [
        {
            key: 'dashboard',
            icon: <DashboardOutlined />,
            label: <Link to="/dashboard">Dashboard</Link>,
        },
        {
            key: 'teachers',
            icon: <UserAddOutlined />,
            label: <Link to="/teachers">Teachers</Link>,
        },
        {
            key: 'students',
            icon: <UsergroupAddOutlined />,
            label: <Link to="/students">Students</Link>,
        },
    ], []);

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo">Admin Panel</div>
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[pathname.slice(1)]}
                    items={menuItems}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '0px 50px 0px 0px',
                        background: colorBgContainer,
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                        aria-label={collapsed ? "Expand menu" : "Collapse menu"}
                    />
                    <div style={{ cursor: 'pointer', border: '1px solid #000', width: '40px', height: '40px', marginTop: '10px', position: 'relative', borderRadius: '50%' }} className="login">
                        <Link to='/login'>
                            <UserSwitchOutlined style={{ position: 'absolute', top: '10px', left: '10px', fontSize: '20px', color: '#000' }} />
                        </Link>
                    </div>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;