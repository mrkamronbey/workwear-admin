import React, { useRef, useEffect } from "react";
import CommonBtn from "../../common/CommonBtn";
import ModalCommon from "../../common/Modal/Modal";
import { useDispatch } from "react-redux";
import { CategoryAdd, CategoryGet, UploadCategoryImage } from "../../../redux/category";
import { Wrapper } from "./styled-index";
import { useSelector } from "react-redux";
import { Row, Col } from "react-grid-system";
import { Spin } from "antd";
import "./styles.css";

function CategoryAddForm({ Open, HandleClose }) {
  const dispatch = useDispatch();
  const titleUz = useRef();
  const titleRu = useRef();
  const titleEn = useRef();
  const categoryAdd = useSelector((state) => state.category);
  const dataProject = useSelector((state) => state.category?.uploadCategoryImage);
  useEffect(() => {
    dispatch(CategoryGet());
  }, []);
  const HandleChange = async (e) => {
    await dispatch(UploadCategoryImage(e));
  };
  const HandleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(
      CategoryAdd({
        title_uz: titleUz.current.value,
        title_ru: titleRu.current.value,
        title_en: titleRu.current.value,
        image: dataProject.data
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
                <Col className="col" lg={6}>
                  <input
                    type="text"
                    placeholder="Категория ен..."
                    required
                    ref={titleEn}
                  />
                </Col>
                <Col className="col" lg={6}>
                  {dataProject.Loading == true ? (
                    <div className="spins">
                      <Spin size="large" />
                    </div>
                  ) : (
                    <>
                      <input type="file" id="file" onChange={HandleChange} />
                      <label for="file" class="custom-file-upload">
                        <span className="span-download">
                          <ion-icon name="cloud-download-outline"></ion-icon>
                        </span>
                      </label>
                    </>
                  )}
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
