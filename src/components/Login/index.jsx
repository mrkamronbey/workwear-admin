import React, { useRef } from "react";
import { GlobalStyleLogin, Wrapper } from "./styled-index";
import { useDispatch } from "react-redux";
import { adminAuth } from "../../redux/login/authSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetProjects } from "../../redux/projects";
import "./styles.css";
import CommonButton from "../../components/common/button/index";
import login1 from "../../assets/image/loginimg.png";
import login2 from "../../assets/image/loginimg1.png";
import logo from "../../assets/image/logos.png";

const LoginComponent = () => {
  const EmailUserf = useRef();
  const dispatch = useDispatch();
  const passwordUsref = useRef();
  const admin = useSelector((state) => state);
  const navigate = useNavigate();
  const HandleSubmit = async (e) => {
    e.preventDefault();
    const email = EmailUserf.current.value;
    const password = passwordUsref.current.value;
    await dispatch(adminAuth({ email, password }));
    dispatch(GetProjects());
  };
  if (admin.admin?.Success == true) {
    navigate("/projects");
    window.location.reload();
  }
  return (
    <>
      <GlobalStyleLogin />
      <Wrapper>
        <div className="wrappp">
          <div className="left">
            <img src={login2} alt="" />
          </div>
          <div className="right">
            <img src={login1} alt="" />
          </div>
        </div>
        <div className="login-box">
          <div className="titles_box">
            <img src={logo} alt="" />
            <h2>Авторизоваться</h2>
          </div>
          <form onSubmit={HandleSubmit}>
            <div className="user-box">
              <input
                placeholder="Эл. почта"
                type="email"
                name=""
                required
                ref={EmailUserf}
              />
              {/* <input ref={EmailUserf} type="email" name="" required /> */}
              {/* <label>Имя пользователя</label> */}
            </div>
            <div className="user-box">
              <input
                ref={passwordUsref}
                placeholder="Пароль"
                type="password"
                name=""
                required
              />
            </div>
            {admin.admin?.Error == true ? (
              <p style={{ color: "red" }}>
                Электронная почта или пароль неверны
              </p>
            ) : null}
            <div className="btnss">
              <CommonButton type="submit">Вход</CommonButton>
            </div>
          </form>
        </div>
      </Wrapper>
    </>
  );
};

export default LoginComponent;
