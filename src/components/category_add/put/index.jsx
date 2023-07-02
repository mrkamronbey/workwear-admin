import ModalCommon from "../../common/Modal/Modal";
import { Wrapper } from "./styled-index";
import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CategoryPut, CategoryGet, UploadCategoryImage } from "../../../redux/category";
import CommonBtn from "../../common/CommonBtn";
import { Row, Col } from "react-grid-system";
import { Spin } from "antd";

function Put({ openPut, handleClosePut, HandlePut, put_id }) {
  const ids = put_id;
  const dispatch = useDispatch();
  const titleUz = useRef();
  const titleRu = useRef();
  const titleEn = useRef();

  const dataProject = useSelector((state) => state.category?.uploadCategoryImage);
  const categoryPuts = useSelector((state) => state.category);
  const categoryGets = useSelector((state) => state.category.categoryGet.data);
  useEffect(() => {
    dispatch(CategoryGet());
  }, []);
  const HandleChange = async (e) => {
    await dispatch(UploadCategoryImage(e));
  };
  const HandleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      title_uz: titleUz.current.value,
      title_ru: titleRu.current.value,
      title_en: titleEn.current.value,
      image: dataProject.data
    };
    await dispatch(CategoryPut({ body, id: ids }));
    dispatch(CategoryGet());
    handleClosePut();
  };
  // if (categoryPuts.categoryPut.Success == true) {
  //   handleClosePut();
  //   window.location.reload();
  // }
  return (
    <>
      <ModalCommon width={550} open={openPut} handleClose={handleClosePut}>
        <Wrapper onSubmit={HandleSubmit}>
          <h3>Изменение категории</h3>
          <div className="input_wrap">
            <div className="scrool">
              <Row className="row">
                {categoryGets.map((elem) =>
                  elem.id == put_id ? (
                    <>
                      <Col className="col" lg={6}>
                        <input
                          type="text"
                          ref={titleUz}
                          defaultValue={elem.title_uz}
                        />
                      </Col>
                      <Col className="col" lg={6}>
                        <input
                          type="text"
                          ref={titleRu}
                          defaultValue={elem.title_ru}
                        />
                      </Col>
                      <Col className="col" lg={6}>
                        <input
                          type="text"
                          ref={titleEn}
                          defaultValue={elem.title_en}
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

                    </>
                  ) : null
                )}
              </Row>
              <CommonBtn
                type="submit"
                style={{
                  margin: "20px auto 0 auto",
                  padding: "12px 40px",
                  border: "2px solid #fff",
                }}
              >
                Изменение
              </CommonBtn>
            </div>
          </div>

          {/* <CommonBtn type={"submit"} style={{ marginTop: "20px" }}>
            Изменение
          </CommonBtn> */}
        </Wrapper>
      </ModalCommon>
    </>
  );
}
export default Put;
