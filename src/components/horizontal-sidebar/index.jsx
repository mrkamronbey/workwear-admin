import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { Switch } from 'antd';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
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
  SettingOutlined,
  ContactsOutlined,
  FileTextOutlined
} from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import './styles.css'
import logo from "../../assets/image/logos.png";
import { useSelector, useDispatch } from "react-redux";
import { adminGet } from "../../redux/admin_add/index";
const { Header, Content, Footer } = Layout;


const HorizontalSidebar = ({ children, setIsChecked }) => {
  // const [isDarkMode, setDarkMode] = useState(false);

  // const toggleDarkMode = (checked: boolean) => {
  //   setDarkMode(checked);
  // };

  const emailSave = window.localStorage.getItem('emails')
  const text = <span>Выйти</span>;
  const dispatch = useDispatch();
  const adminGetState = useSelector((state) => state.adminadd);
  const rows = adminGetState.userGet?.data;
  const filterData = rows.filter(elem => elem.email == emailSave)
  const pathname = useLocation();
  const cookies = new Cookies();
  console.log(filterData)
  useEffect(() => {
    dispatch(adminGet());
  }, []);

  const navigate = useNavigate();
  const HandleLogout = () => {
    cookies.remove("token");
    setTimeout(() => {
      navigate("/");
      window.location.reload();
    }, "1500");
  };

  const onChange = async (checked) => {
    window.localStorage.setItem('checked', 'true')
    window.location.reload()

  };


  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const items = [
    {
      label: <Tooltip title={text}>
        <button className="tool_btns" onClick={HandleLogout}>
          <span>Выйти</span>
          <LoginOutlined />
        </button>
      </Tooltip>,
      key: '0',
    },
    {
      label: <div className="switch_wrapp"> <span>Боковая панель</span> <Switch onChange={onChange} /></div>,
      key: '1',
    },
    // {
    //   label: (
    //     <div className="darkmode">
    //       <span>DarkMode</span>
    //       <DarkModeSwitch
    //         checked={isDarkMode}
    //         onChange={toggleDarkMode}
    //         size={30}
    //         moonColor="black"
    //       />
    //     </div>
    //   ),
    //   key: "2"
    // }
  ];

  return (
    <Layout className="layout hori_sidebar">
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <img src={logo} width={100} className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
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
              icon: <ContactsOutlined />,
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
                  <span class="title">Каталог</span>
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
              icon: <FileTextOutlined />,
              label: (
                <NavLink
                  to={"/news"}
                  className={pathname == "/news" ? "active" : ""}
                >
                  <span class="title">Новости</span>
                </NavLink>
              ),
            }
          ]}
        />
        <div className="profile">
          <Dropdown
            style={{ marginLeft: '10px' }}
            menu={{
              items,
            }}
            trigger={['click']}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>

                <SettingOutlined />
                <span className="drop_span">Настройки</span>
              </Space>
            </a>
          </Dropdown>
          <UserOutlined className="user-icon" />
          <div className="profile-right">
            {filterData.map((elem) => (
              <>
                <p className="profile_name">{elem.name}</p>
                <p className="profile_email">{elem.email}</p>
              </>
            ))}
          </div>
        </div>
      </Header>
      <Content
        style={{
          padding: '0 50px',
        }}
      >
        {/* <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb> */}
        <div
          className="site-layout-content"
          style={{
            background: colorBgContainer,
            borderRadius: "20px"
          }}
        >
          {children}
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
          background: "transparent",
          color: "rgb(31, 171, 138)",
          fontWeight: '500',
          padding: '15px 50px'
        }}
      >
        ©2023 Created by Kamronbey
      </Footer>
    </Layout>
  );
};
export default HorizontalSidebar;