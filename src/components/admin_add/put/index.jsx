import ModalCommon from "../../common/Modal/Modal";
import { Wrapper } from "./styled-index";
import { Row, Col } from "react-grid-system";
import CommonBtn from "../../common/CommonBtn";
import "./styles.css";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminPut, adminGet } from "../../../redux/admin_add/index";

function Put({ openPut, handleClosePut, put_id }) {
  const ids = put_id;
  const dispatch = useDispatch();
  const emailUseRef = useRef();
  const passwordUseRef = useRef();
  const addAdmin = useSelector((state) => state.adminadd);
  const getAdmin = useSelector((state) => state.adminadd.userGet.data);
  const nameUseRef = useRef();
  const HandleSubmit = (e) => {
    e.preventDefault();
    const body = {
      email: emailUseRef.current.value,
      password: passwordUseRef.current.value,
      name: nameUseRef.current.value,
    };

    dispatch(adminPut({ body, id: ids }));
  };
  if (addAdmin.AddPut.Success == true) {
    window.location.reload();
  }
  return (
    <>
      <ModalCommon
        width={600}
        height={350}
        open={openPut}
        handleClose={handleClosePut}
      >
        <Wrapper onSubmit={HandleSubmit}>
          <h3> Админ изменить</h3>
          <div className="input_wrap">
            <Row className="row">
              {getAdmin.map((elem) =>
                elem.id == ids ? (
                  <>
                    <Col className="col" lg={6}>
                      <input
                        type="email"
                        placeholder={elem.email}
                        ref={emailUseRef}
                      />
                    </Col>
                    <Col className="col" lg={6}>
                      <input
                        type="name"
                        placeholder={elem.name}
                        ref={nameUseRef}
                      />
                    </Col>
                    <Col className="col" lg={6}>
                      <input
                        type="password"
                        placeholder={elem.password}
                        ref={passwordUseRef}
                      />
                    </Col>
                  </>
                ) : null
              )}
            </Row>
            {addAdmin.AddPost.Error == true ? (
              <p style={{ color: "red" }}>Должно быть 8 или более 16 чисел</p>
            ) : null}
          </div>
          <CommonBtn
            type={"submit"}
            style={{
              padding: "12px 40px",
              border: "2px solid #fff",
            }}
          >
            Изменить
          </CommonBtn>
        </Wrapper>
      </ModalCommon>
    </>
  );
}
export default Put;
