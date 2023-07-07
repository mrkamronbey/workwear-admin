import React, { useState, useEffect } from "react";
import CommonBtn from "../../common/CommonBtn";
import { useDispatch } from "react-redux";
import { NewsPost, NewsGet, UploadImage } from "../../../redux/news/index";
import { Wrapper } from "./styled-index";
import { useSelector } from "react-redux";
import { Row, Col } from "react-grid-system";
import { Spin, Input, Image } from "antd";
import "./styles.css";
import DraverCommon from "../../common/Drawer";
import InputCommon from '../../common/input/index'
import { LoadingOutlined } from '@ant-design/icons';

const { TextArea } = Input;
function NewsForm({ Open, HandleClose }) {
  const dispatch = useDispatch();
  const [titleUz, setTitleUz] = useState();
  const [titleRu, setTitleRu] = useState();
  const [titleEn, setTitleEn] = useState();
  const [descriptionUz, setDescriptionUz] = useState()
  const [descriptionRu, setDescriptionRu] = useState()
  const [descriptionEn, setDescriptionEn] = useState()
  const [links, setLinks] = useState()
  const categoryAdd = useSelector((state) => state.category);
  const dataProject = useSelector((state) => state.news?.uploadNews);
  useEffect(() => {
    dispatch(NewsGet());
  }, []);
  const HandleChange = async (e) => {
    await dispatch(UploadImage(e));
  };
  const HandleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(
      NewsPost({
        title_uz: titleUz,
        title_ru: titleRu,
        title_en: titleEn,
        description_uz: descriptionUz,
        description_ru: descriptionRu,
        description_en: descriptionEn,
        link: links,
        image: dataProject.data
      })
    );
    dispatch(NewsGet());
    HandleClose();
    window.location.reload()
  };


  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
        color: "#000"
      }}
      spin
    />
  );


  return (
    <DraverCommon title='Добавить новости' open={Open} onClose={HandleClose}>
      <>
        <Wrapper onSubmit={HandleSubmit}>
          <div className="input_wrap">
            <div className="scrool">
              <Row className="row">
                <Col className="col" lg={4}>
                  <h4>Добавить фотографию</h4>
                  <Row className="row">
                    <Col className="col_upload" lg={6}>
                      {
                        dataProject.Loading == true ? (
                          <div className="spinss">
                            <Spin indicator={antIcon} />
                          </div>
                        ) : (
                          dataProject.Success == true ? (
                            <Image
                              height={161.25}
                              style={{ aspectRatio: "1 / 1", borderRadius: "20px", zIndex: "99999999" }}
                              src={dataProject.data}
                            />
                          ) : (
                            <div className="none_img">
                              <i class='bx bxs-image'></i>
                            </div>
                          )
                        )
                      }
                    </Col>
                    <Col className="col_upload" lg={6}>
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
                    </Col>
                    <Col lg={12}>
                      <div className="infor_box">
                        <p><span>Формат: </span>PNG, JPEG, JPG, SVG. Рекомендуемое разрешение <span>1080×1080</span></p>
                        <p> <span>Размер: </span>размер файла не должен превышать 5 MB</p>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col className="col" lg={8}>
                  <h4>Тема</h4>
                  <InputCommon
                    type="text"
                    placeholder="узбекский"
                    required
                    onChange={(e) => setTitleUz(e.currentTarget.value)}
                  />
                  <InputCommon
                    type="text"
                    placeholder="русский"
                    required
                    onChange={(e) => setTitleRu(e.currentTarget.value)}
                  />
                  <InputCommon
                    type="text"
                    placeholder="английский"
                    required
                    onChange={(e) => setTitleEn(e.currentTarget.value)}
                  />
                  <h4>Ссылка</h4>
                  <InputCommon
                    type="url"
                    placeholder="https://example.com"
                    required
                    onChange={(e) => setLinks(e.currentTarget.value)}
                  />
                </Col>
                <Col className="col" lg={12}>
                  <h4>Описание </h4>
                  <TextArea
                    style={{ marginBottom: "20px", borderRadius: "20px" }}
                    required
                    autoSize
                    placeholder="узбекский"
                    allowClear onChange={(e) => setDescriptionUz(e.currentTarget.value)}
                  />
                </Col>
                <Col className="col" lg={12}>
                  <TextArea
                    style={{ marginBottom: "20px", borderRadius: "20px" }}
                    required
                    placeholder="русский"
                    autoSize
                    allowClear onChange={(e) => setDescriptionRu(e.currentTarget.value)}
                  />

                </Col>
                <Col className="col" lg={12}>
                  <TextArea
                    autoSize
                    style={{ marginBottom: "20px", borderRadius: "20px" }}
                    required
                    placeholder="английский"
                    allowClear onChange={(e) => setDescriptionEn(e.currentTarget.value)}
                  />
                </Col>
              </Row>
              <hr />
              <CommonBtn
                type="submit"
                style={{
                  margin: "20px 10px 0 auto",
                  padding: "15px 40px",
                  border: "2px solid #f3f3f3",
                  borderRadius: "50px"
                }}
              >
                Добавить
              </CommonBtn>
            </div>
          </div>
        </Wrapper>
      </>
    </DraverCommon>
  );
}

export default NewsForm;
