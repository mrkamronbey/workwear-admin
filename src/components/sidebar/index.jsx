import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { Button, Tooltip } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UsergroupAddOutlined,
  UserAddOutlined,
  AppstoreOutlined,
  ShoppingCartOutlined,
  FileImageOutlined,
  LoginOutlined,
  CommentOutlined,
  BellOutlined,
  QuestionCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";
import { Layout, Menu, theme } from "antd";
import "./sidebar.css";
import logo from "../../assets/image/logos.png";
import { adminGet } from "../../redux/admin_add/index";
const { Header, Sider, Content } = Layout;

const Sidebar = ({ children }) => {
  const text = <span>Выйти</span>;
  const dispatch = useDispatch();
  const adminGetState = useSelector((state) => state.adminadd);
  const rows = adminGetState.userGet?.data;
  useEffect(() => {
    dispatch(adminGet());
  }, []);
  const [collapsed, setCollapsed] = useState(false);
  const cookies = new Cookies();
  const pathname = useLocation();
  const navigate = useNavigate();
  const HandleLogout = () => {
    cookies.remove("token");
    setTimeout(() => {
      navigate("/");
      window.location.reload();
    }, "1500");
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        style={{ backgroundColor: "#5A79E5" }}
        width={240}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserAddOutlined />,
              label: (
                <NavLink
                  to={"/adminadd"}
                  className={pathname == "/adminadd" ? "active" : ""}
                >
                  <span class="title">Админ</span>
                </NavLink>
              ),
            },
            {
              key: "2",
              icon: <UsergroupAddOutlined />,
              label: (
                <NavLink to={"/contact"}>
                  <span class="title">Заявки</span>
                </NavLink>
              ),
            },
            {
              key: "3",
              icon: <AppstoreOutlined />,
              label: (
                <NavLink
                  to={"/category"}
                  className={pathname == "/category" ? "active" : ""}
                >
                  <span class="title">Категория</span>
                </NavLink>
              ),
            },
            {
              key: "4",
              icon: <ShoppingCartOutlined />,
              label: (
                <NavLink
                  to={"/product"}
                  className={pathname == "/product" ? "active" : ""}
                >
                  <span class="title">Продукт</span>
                </NavLink>
              ),
            },
            {
              key: "5",
              icon: <FileImageOutlined />,
              label: (
                <NavLink
                  to={"/projects"}
                  className={pathname == "/projects" ? "active" : ""}
                >
                  <span class="title">Изображение</span>
                </NavLink>
              ),
            },
          ]}
          style={{ backgroundColor: "#03544C" }}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: "#03544C",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div className="logos">
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
              }
            )}
            <img src={logo} alt="" />
          </div>
          <div className="left">
            <div className="icons">
              <CommentOutlined style={{ fontSize: "16px", color: "#fff" }} />
              <BellOutlined style={{ fontSize: "16px", color: "#fff" }} />
              <QuestionCircleOutlined
                style={{ fontSize: "20px", color: "#fff" }}
              />
            </div>
            <div className="profile">
              <div className="profile-right">
                {rows.slice(0, 1).map((elem) => (
                  <>
                    <p className="profile_name">{elem.name}</p>
                    <p className="profile_email">{elem.email}</p>
                  </>
                ))}
              </div>
              <UserOutlined className="user-icon" />
              <Tooltip title={text}>
                <button onClick={HandleLogout}>
                  <LoginOutlined />
                </button>
              </Tooltip>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: "#EEEFF5",
            overflowY: "auto",
            height: "85vh",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default Sidebar;
