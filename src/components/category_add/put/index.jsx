import ModalCommon from "../../common/Modal/Modal";
import { Wrapper } from "./styled-index";
import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CategoryPut, CategoryGet, UploadCategoryImage } from "../../../redux/category";
import CommonBtn from "../../common/CommonBtn";
import { Row, Col } from "react-grid-system";
import { Spin, Image } from "antd";
import InputCommon from "../../common/input";
import { LoadingOutlined } from '@ant-design/icons';
import './styles.css'

function Put({ openPut, handleClosePut, HandlePut, put_id }) {
  const ids = put_id;
  const dispatch = useDispatch();
  const [titleUz, setTitleUz] = useState();
  const [titleRu, setTitleRu] = useState();
  const [titleEn, setTitleEn] = useState();

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
      title_uz: titleUz,
      title_ru: titleRu,
      title_en: titleEn,
      image: dataProject.data
    };
    await dispatch(CategoryPut({ body, id: ids }));
    dispatch(CategoryGet());
    handleClosePut();
    window.location.reload()
  };
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );
  return (
    <>
      <ModalCommon width={700} open={openPut} handleClose={handleClosePut}>
        <Wrapper onSubmit={HandleSubmit}>
          <h3>Изменение категории</h3>
          <div className="input_wrap">
            <div className="scrool">
              <Row className="row">
                {
                  categoryGets.map(elem => elem.id == put_id ? (
                    <>
                      <Col className="col" lg={6}>
                        {
                          dataProject.Loading == true ? (
                            <div className="spinss">
                              <Spin indicator={antIcon} />
                            </div>
                          ) : (
                            dataProject.Success == true ? (
                              <Image
                                width="100%"
                                style={{ aspectRatio: "16 / 9", borderRadius: "20px", zIndex: "99999999" }}
                                src={dataProject.data}
                              />
                            ) : (
                              <Image
                                width="100%"
                                style={{ aspectRatio: "16 / 9", borderRadius: "20px", zIndex: "99999999" }}
                                src={elem.image}
                              />
                            )
                          )
                        }

                        <div className="infor_box">
                          <p style={{ color: "#fff" }}><span>Формат: </span>PNG, JPEG, JPG, SVG. Рекомендуемое разрешение <span>1920×1080</span> или <span>1280×720</span></p>
                          <p style={{ color: "#fff" }}> <span>Размер: </span>размер файла не должен превышать 5 MB</p>
                        </div>


                      </Col>
                      {/* <Col className="col" lg={6}>

                        {
                          dataProject.Success == true ? (
                            <Image
                              width="100%"
                              style={{ aspectRatio: "16 / 9", borderRadius: "20px", zIndex: "99999999" }}
                              src={dataProject.data}
                            />
                          ) : (
                            <Image
                              width="100%"
                              style={{ aspectRatio: "16 / 9", borderRadius: "20px", zIndex: "99999999" }}
                              src={elem.image}
                            />
                          )
                        }
                        <div className="infor_box">
                          <p><span>Формат: </span>PNG, JPEG, JPG, SVG. Рекомендуемое разрешение <span>1920×1080</span> или <span>1280×720</span></p>
                          <p> <span>Размер: </span>размер файла не должен превышать 5 MB</p>
                        </div>
                      </Col> */}
                      <Col className="col" lg={6}>
                        {
                          dataProject.Loading == true ? (
                            <div className="spins">
                              <Spin indicator={antIcon} />
                            </div>
                          ) : (
                            <>

                              <input type="file" id="file" onChange={HandleChange} />
                              <label for="file" class="custom-file-upload">
                                <span className="span-download">
                                  <ion-icon name="cloud-download-outline"></ion-icon>
                                  <span>Загрузить фото</span>
                                </span>
                              </label>
                            </>
                          )
                        }
                        <InputCommon
                          type="text"
                          defaultValue={elem.title_uz}
                          onChange={(e) => setTitleUz(e.currentTarget.value)}
                        />
                        <InputCommon
                          type="text"
                          defaultValue={elem.title_ru}
                          onChange={(e) => setTitleRu(e.currentTarget.value)}
                        />
                        <InputCommon
                          type="text"
                          defaultValue={elem.title_en}
                          onChange={(e) => setTitleEn(e.currentTarget.value)}
                        />
                        <CommonBtn
                          type="submit"
                          style={{
                            margin: "20px auto 0 auto",
                            padding: "12px 40px",
                            border: "2px solid #fff",
                            background: "#03544c",
                          }}
                        >
                          Изменить
                        </CommonBtn>
                      </Col>
                    </>
                  ) : null)
                }
              </Row>
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
