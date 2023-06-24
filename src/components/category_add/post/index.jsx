import React, { useRef, useEffect } from "react";
import CommonBtn from "../../common/CommonBtn";
import ModalCommon from "../../common/Modal/Modal";
import { useDispatch } from "react-redux";
import { CategoryAdd, CategoryGet } from "../../../redux/category";
import { Wrapper } from "./styled-index";
import { useSelector } from "react-redux";
import { Row, Col } from "react-grid-system";
import "./styles.css";

function CategoryAddForm({ Open, HandleClose }) {
  const dispatch = useDispatch();
  const titleUz = useRef();
  const titleRu = useRef();
  const categoryAdd = useSelector((state) => state.category);
  useEffect(() => {
    dispatch(CategoryGet());
  }, []);
  const HandleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(
      CategoryAdd({
        category_name_uz: titleUz.current.value,
        category_name_ru: titleRu.current.value,
      })
    );
    dispatch(CategoryGet());
    HandleClose();
  };
  // if (categoryAdd.categoryPost.Success == true) {
  //   window.location.reload();
  // }
  return (
    <ModalCommon width={550} open={Open} handleClose={HandleClose}>
      <>
        <Wrapper onSubmit={HandleSubmit}>
          <h3>Добавить категорию</h3>
          <div className="input_wrap">
            <div className="scrool">
              <Row className="row">
                <Col className="col" lg={6}>
                  <input
                    type="text"
                    placeholder="Категория узб..."
                    required
                    ref={titleUz}
                  />
                </Col>
                <Col className="col" lg={6}>
                  <input
                    type="text"
                    placeholder="Категория русский..."
                    required
                    ref={titleRu}
                  />
                </Col>
              </Row>
              <CommonBtn
                type="submit"
                style={{
                  margin: "20px auto 0 auto",
                  padding: "12px 40px",
                  border: "2px solid #fff",
                }}
              >
                Добавить
              </CommonBtn>
            </div>
          </div>
        </Wrapper>
      </>
    </ModalCommon>
  );
}

export default CategoryAddForm;
