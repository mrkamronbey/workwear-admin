import React, { useRef } from "react";
import CommonBtn from "../../common/CommonBtn";
import ModalCommon from "../../common/Modal/Modal";
import { useDispatch } from "react-redux";
import { adminAdd, adminGet } from "../../../redux/admin_add";
import { Wrapper } from "./styled-index";
import { Row, Col } from "react-grid-system";
import "./styles.css";
import { useSelector } from "react-redux";
function AdminAddForm({ Open, HandleClose }) {
  const dispatch = useDispatch();
  const emailUseRef = useRef();
  const passwordUseRef = useRef();
  const addAdmin = useSelector((state) => state.adminadd);
  const nameUseRef = useRef();
  const HandleSubmit = async (e) => {
    e.preventDefault();
    const email = emailUseRef.current.value;
    const password = passwordUseRef.current.value;
    const name = nameUseRef.current.value;
    await dispatch(adminAdd({ email, password, name }));
    dispatch(adminGet());
    HandleClose();
  };
  // if (addAdmin.AddPost.Success == true) {
  //   window.location.reload();
  // }
  return (
    <ModalCommon width={600} height={350} open={Open} handleClose={HandleClose}>
      <>
        <Wrapper onSubmit={HandleSubmit}>
          <div>
            <h3>Админ добавить</h3>
            <div className="input_wrap">
              <Row className="row">
                <Col className="col" lg={6}>
                  <input
                    type="email"
                    placeholder="эл. почта.."
                    required
                    ref={emailUseRef}
                  />
                </Col>
                <Col className="col" lg={6}>
                  <input
                    type="name"
                    placeholder="имя"
                    required
                    ref={nameUseRef}
                  />
                </Col>
                <Col className="col" lg={6}>
                  <input
                    type="password"
                    placeholder="парол"
                    required
                    ref={passwordUseRef}
                  />
                </Col>
              </Row>
              {addAdmin.AddPost.Error == true ? (
                <p style={{ color: "red" }}>Должно быть 8 или более 16 чисел</p>
              ) : null}
            </div>
          </div>
          <CommonBtn
            type={"submit"}
            style={{
              padding: "12px 40px",
              border: "2px solid #fff",
            }}
          >
            Добавить
          </CommonBtn>
        </Wrapper>
      </>
    </ModalCommon>
  );
}

export default AdminAddForm;
