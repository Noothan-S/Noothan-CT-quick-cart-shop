import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, ConfigProvider, theme } from "antd";
import { Link, Outlet } from "react-router-dom";
import navItems from "../../../constants/nav_items";
import { DashboardNavItems } from "../../../constants/dashboard_nav_items";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  logOut,
  useCurrentUser,
} from "../../../redux/features/auth/auth.slice";
import { decrypt } from "../../../utils/text_encryption";
import { User } from "lucide-react";
import { useGetMyProfileQuery } from "../../../redux/features/user/user.api";
import UserRole from "../../../constants/user_role";

const { Header, Sider, Content } = Layout;

const Admin: React.FC = () => {
  const user = useAppSelector(useCurrentUser);
  const [collapsed, setCollapsed] = useState(false);
  const { data: profile } = useGetMyProfileQuery({}, { skip: !user });
  const dispatch = useAppDispatch();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
      }}
    >
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          theme="light"
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            paddingTop: 20,
            bottom: 0,
          }}
        >
          <div className="demo-logo-vertical" />
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            // @ts-expect-error: sometime user will null
            items={DashboardNavItems[decrypt(user?.role)]}
          />
        </Sider>
        <Layout
          style={{
            marginLeft: collapsed ? 80 : 200,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <div className="flex justify-between">
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
              <div className="flex items-center space-x-4 pr-20">
                {navItems.map((item) => (
                  <Link to={item.link}>{item.name}</Link>
                ))}
                {user ? (
                  <div className="dropdown mt-3 dropdown-end">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn btn-ghost btn-circle avatar"
                    >
                      <div className="w-10 rounded-full">
                        <img
                          alt="Profile Picture"
                          src={
                            decrypt(user.role) === UserRole.vendor
                              ? profile?.logo
                              : profile?.img
                          }
                        />
                      </div>
                    </div>
                    <ul
                      tabIndex={0}
                      className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                    >
                      <li>
                        <Link to="/profile" className="justify-between">
                          Profile
                          <span className="badge">New</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={`/dashboard/${decrypt(user.role).toLowerCase()}`}
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <a onClick={() => dispatch(logOut())}>Logout</a>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <Link
                    to="/auth/login"
                    className="text-gray-600 hover:text-primary"
                  >
                    <User className="h-6 w-6" />
                  </Link>
                )}
              </div>
            </div>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              overflow: "auto",
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default Admin;
