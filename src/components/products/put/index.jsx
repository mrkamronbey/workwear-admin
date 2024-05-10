import ModalCommon from "../../common/Modal/Modal";
import { Wrapper } from "./styled-index";
import { Row, Col } from "react-grid-system";
import CommonBtn from "../../common/CommonBtn";
import "./styles.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ProductPut,
  ProductGet,
  UploadImage,
  UploadImage1,
  UploadImage2,
  UploadImage3,
} from "../../../redux/products";
import { CategoryGet } from "../../../redux/category/index";
import SelectCommon from "../../common/select/index";
import DraverCommon from "../../common/Drawer";
import { Spin, Image, Select } from "antd";
import InputCommon from "../../common/input";
import { LoadingOutlined } from "@ant-design/icons";
import ReactQuill, { Quill } from "react-quill";
import QuillBetterTable from "quill-better-table";
import "react-quill/dist/quill.snow.css";
import { sizes } from "../../../utils/api";

function Put({ openPut, handleClosePut, put_id, setSelectId, selectId }) {
  const ids = put_id;
  const dispatch = useDispatch();
  const [titleUz, setTitleUz] = useState();
  const [titleRu, setTitleRU] = useState();
  const [titleEn, setTitleEn] = useState();
  const [destinationUz, setDestinationUz] = useState();
  const [destinationRu, setDestinationRu] = useState();
  const [destinationEn, setDestinationEn] = useState();
  const [destinationUz2, setDestinationUz2] = useState();
  const [destinationRu2, setDestinationRu2] = useState();
  const [destinationEn2, setDestinationEn2] = useState();
  const [size, setSize] = useState([]);

  const handleChange = (value) => {
    setSize(value);
  };

  const productPut = useSelector((state) => state.product);
  // product get
  const productGets = useSelector((state) => state.product.productGet.data);
  useEffect(() => {
    dispatch(ProductGet());
  }, []);
  const FilterData = productGets.filter((elem) => elem.id == ids);
  const filterData = productGets.filter((elem) => elem.id == ids);
  // console.log(filterData)
  // product get
  // category get
  const categoryGets = useSelector((state) => state.category.categoryGet.data);
  const dataProject = useSelector((state) => state.product?.uploadProjects);
  const dataProject1 = useSelector((state) => state.product?.uploadProjects1);
  const dataProject2 = useSelector((state) => state.product?.uploadProjects2);
  const dataProject3 = useSelector((state) => state.product?.uploadProjects3);

  const categoryFilter = categoryGets.filter(
    (elem) => elem.id == window.localStorage.getItem("selectId")
  );
  useEffect(() => {
    dispatch(CategoryGet());
  }, []);
  // category get

  useEffect(() => {
    dispatch(ProductGet());
  }, []);

  const HandleChange = async (e) => {
    await dispatch(UploadImage(e));
  };
  const HandleChange1 = async (e) => {
    await dispatch(UploadImage1(e));
  };
  const HandleChange2 = async (e) => {
    await dispatch(UploadImage2(e));
  };
  const HandleChange3 = async (e) => {
    await dispatch(UploadImage3(e));
  };

  const options = [];
  categoryGets.map((elem) =>
    options.push({
      value: elem.id,
      label: elem.title_ru,
    })
  );
  const SelectChange = (e) => {
    setSelectId(e)`selected${e}`;
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      title_uz: titleUz,
      title_ru: titleRu,
      title_en: titleEn,
      destination_uz: destinationUz,
      destination_ru: destinationRu,
      destination_en: destinationEn,
      text_uz: destinationUz2,
      text_ru: destinationRu2,
      text_en: destinationEn2,
      size: [...size],
      category: selectId,
      image1: !dataProject.data
        ? FilterData.map((elem) => elem.image1)[0]
        : dataProject.data,
      image2: !dataProject1.data
        ? FilterData.map((elem) => elem.image2)[0]
        : dataProject1.data,
      image3: !dataProject2.data
        ? FilterData.map((elem) => elem.image3)[0]
        : dataProject2.data,
      image4: !dataProject3.data
        ? FilterData.map((elem) => elem.image4)[0]
        : dataProject3.data,
    };

    await dispatch(ProductPut({ body, id: ids }));
    dispatch(ProductGet());
    handleClosePut();
    window.location.reload();
  };

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
        color: "#000",
      }}
      spin
    />
  );

  Quill.register("better-table", QuillBetterTable);
  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote"],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    [{ color: [] }, { background: [] }],
    ["better-table"],
    ["code-block"],
    ["link", "image", "video", "better-table"],
    ["clean"],
  ];

  const modules = {
    toolbar: toolbarOptions,
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "align",
    "strike",
    "script",
    "blockquote",
    "background",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "code-block",
  ];

  return (
    <>
      <DraverCommon
        title="Изменить продукт"
        open={openPut}
        onClose={handleClosePut}
      >
        <>
          <Wrapper onSubmit={HandleSubmit}>
            <div className="input_wrap">
              <div className="scrool">
                {productGets.map((elem) =>
                  elem.id == ids ? (
                    <>
                      <Row className="row">
                        <Col className="col" lg={12}>
                          <h4>Выбрать категорию</h4>
                          <div className="selects">
                            <SelectCommon
                              defaultValue={elem?.category?.title_ru}
                              onChange={SelectChange}
                              options={options}
                            />
                            <p className="select_alert_text">
                              Выбор категории товара является обязательным. В
                              противном случае ваш продукт не будет
                              редактироваться
                            </p>
                          </div>
                          <h4>Добавить фотографию</h4>
                          <Row className="row">
                            <Col className="col_upload" lg={2}>
                              {dataProject.Loading == true ? (
                                <div className="spinss">
                                  <Spin indicator={antIcon} />
                                </div>
                              ) : dataProject.Success == true ? (
                                <Image
                                  width="100%"
                                  height="100%"
                                  style={{
                                    aspectRatio: "1 / 1",
                                    borderRadius: "20px",
                                    zIndex: "99999999",
                                    objectFit: "cover",
                                  }}
                                  src={dataProject.data}
                                />
                              ) : (
                                <Image
                                  width="100%"
                                  height="100%"
                                  style={{
                                    aspectRatio: "1 / 1",
                                    borderRadius: "20px",
                                    zIndex: "99999999",
                                    objectFit: "cover",
                                  }}
                                  src={elem.image}
                                />
                              )}
                            </Col>
                            <Col className="col_upload" lg={2}>
                              {dataProject.Loading == true ? (
                                <div className="spins">
                                  <Spin indicator={antIcon} />
                                </div>
                              ) : (
                                <>
                                  <input
                                    type="file"
                                    id="file"
                                    onChange={HandleChange}
                                  />
                                  <label for="file" class="custom-file-upload">
                                    <span className="span-download">
                                      <ion-icon name="cloud-download-outline"></ion-icon>
                                      <span>Загрузить фото</span>
                                    </span>
                                  </label>
                                </>
                              )}
                            </Col>
                            <Col className="col_upload" lg={2}>
                              {dataProject1.Loading == true ? (
                                <div className="spinss">
                                  <Spin indicator={antIcon} />
                                </div>
                              ) : dataProject2.Success == true ? (
                                <Image
                                  width="100%"
                                  height="100%"
                                  style={{
                                    aspectRatio: "1 / 1",
                                    borderRadius: "20px",
                                    zIndex: "99999999",
                                    objectFit: "cover",
                                  }}
                                  src={dataProject2.data}
                                />
                              ) : (
                                <Image
                                  width="100%"
                                  height="100%"
                                  style={{
                                    aspectRatio: "1 / 1",
                                    borderRadius: "20px",
                                    zIndex: "99999999",
                                    objectFit: "cover",
                                  }}
                                  src={elem.image}
                                />
                              )}
                            </Col>
                            <Col className="col_upload" lg={2}>
                              {dataProject2.Loading == true ? (
                                <div className="spins">
                                  <Spin indicator={antIcon} />
                                </div>
                              ) : (
                                <>
                                  <input
                                    type="file"
                                    id="file1"
                                    onChange={HandleChange1}
                                  />
                                  <label for="file1" class="custom-file-upload">
                                    <span className="span-download">
                                      <ion-icon name="cloud-download-outline"></ion-icon>
                                      <span>Загрузить фото</span>
                                    </span>
                                  </label>
                                </>
                              )}
                            </Col>
                            <Col className="col_upload" lg={2}>
                              {dataProject2.Loading == true ? (
                                <div className="spinss">
                                  <Spin indicator={antIcon} />
                                </div>
                              ) : dataProject2.Success == true ? (
                                <Image
                                  width="100%"
                                  height="100%"
                                  style={{
                                    aspectRatio: "1 / 1",
                                    borderRadius: "20px",
                                    zIndex: "99999999",
                                    objectFit: "cover",
                                  }}
                                  src={dataProject.data}
                                />
                              ) : (
                                <Image
                                  width="100%"
                                  height="100%"
                                  style={{
                                    aspectRatio: "1 / 1",
                                    borderRadius: "20px",
                                    zIndex: "99999999",
                                    objectFit: "cover",
                                  }}
                                  src={elem.image}
                                />
                              )}
                            </Col>
                            <Col className="col_upload" lg={2}>
                              {dataProject2.Loading == true ? (
                                <div className="spins">
                                  <Spin indicator={antIcon} />
                                </div>
                              ) : (
                                <>
                                  <input
                                    type="file"
                                    id="file2"
                                    onChange={HandleChange2}
                                  />
                                  <label for="file2" class="custom-file-upload">
                                    <span className="span-download">
                                      <ion-icon name="cloud-download-outline"></ion-icon>
                                      <span>Загрузить фото</span>
                                    </span>
                                  </label>
                                </>
                              )}
                            </Col>
                            <Col
                              className="col_upload"
                              style={{ paddingLeft: "0", marginTop: "30px" }}
                              lg={2}
                            >
                              {dataProject3.Loading == true ? (
                                <div className="spinss">
                                  <Spin indicator={antIcon} />
                                </div>
                              ) : dataProject3.Success == true ? (
                                <Image
                                  width="100%"
                                  height="100%"
                                  style={{
                                    aspectRatio: "1 / 1",
                                    borderRadius: "20px",
                                    zIndex: "99999999",
                                    objectFit: "cover",
                                  }}
                                  src={dataProject.data}
                                />
                              ) : (
                                <Image
                                  width="100%"
                                  height="100%"
                                  style={{
                                    aspectRatio: "1 / 1",
                                    borderRadius: "20px",
                                    zIndex: "99999999",
                                    objectFit: "cover",
                                  }}
                                  src={elem.image}
                                />
                              )}
                            </Col>
                            <Col
                              className="col_upload"
                              style={{ paddingRight: "0", marginTop: "30px" }}
                              lg={2}
                            >
                              {dataProject3.Loading == true ? (
                                <div className="spins">
                                  <Spin indicator={antIcon} />
                                </div>
                              ) : (
                                <>
                                  <input
                                    type="file"
                                    id="file3"
                                    onChange={HandleChange3}
                                  />
                                  <label for="file3" class="custom-file-upload">
                                    <span className="span-download">
                                      <ion-icon name="cloud-download-outline"></ion-icon>
                                      <span>Загрузить фото</span>
                                    </span>
                                  </label>
                                </>
                              )}
                            </Col>
                            <Col lg={12}>
                              <div className="infor_box">
                                <p>
                                  <span>Формат: </span>PNG, JPEG, JPG, SVG.
                                  Рекомендуемое разрешение{" "}
                                  <span>1080×1080</span>
                                </p>
                                <p>
                                  {" "}
                                  <span>Размер: </span>размер файла не должен
                                  превышать 5 MB
                                </p>
                              </div>
                            </Col>
                          </Row>
                          <hr />
                        </Col>
                        <Col className="col" lg={6}>
                          <h4>НАЗВАНИЕ ТОВАРА НА УЗБЕКСКОМ *</h4>
                          <InputCommon
                            type="text"
                            defaultValue={elem.title_uz}
                            onChange={(e) => setTitleUz(e.currentTarget.value)}
                          />
                          <h4>НАЗВАНИЕ ТОВАРА НА РУССКОМ ЯЗЫКЕ *</h4>
                          <InputCommon
                            type="text"
                            defaultValue={elem.title_ru}
                            onChange={(e) => setTitleRU(e.currentTarget.value)}
                          />
                          <h4>НАЗВАНИЕ БРЕНДА НА АНГЛИЙСКОМ ЯЗЫКЕ *</h4>
                          <InputCommon
                            type="text"
                            defaultValue={elem.title_en}
                            onChange={(e) => setTitleEn(e.currentTarget.value)}
                          />
                        </Col>
                        <Col className="col" lg={6}>
                          <h4>РАЗМЕР</h4>
                          <div className="selects">
                            <Select
                              mode="multiple"
                              allowClear
                              style={{
                                width: "100%",
                              }}
                              placeholder="Выбрать"
                              onChange={handleChange}
                              options={sizes}
                            />
                          </div>
                        </Col>
                        <Col className="col" lg={12}>
                          <hr />
                          <h4>ОПИСАНИЕ ТОВАРА НА УЗБЕКСКОМ *</h4>
                          <ReactQuill
                            theme="snow"
                            defaultValue={elem.description_uz}
                            onChange={(e) => setDestinationUz(e)}
                            modules={modules}
                            formats={formats}
                          />
                        </Col>
                        <Col className="col" lg={12}>
                          <h4>ОПИСАНИЕ ТОВАРА НА РУССКОМ ЯЗЫКЕ *</h4>
                          <ReactQuill
                            theme="snow"
                            defaultValue={elem.description_ru}
                            onChange={(e) => setDestinationRu(e)}
                            modules={modules}
                            formats={formats}
                          />
                        </Col>
                        <Col className="col" lg={12}>
                          <h4>ОПИСАНИЕ БРЕНДА НА АНГЛИЙСКОМ ЯЗЫКЕ *</h4>
                          <ReactQuill
                            theme="snow"
                            defaultValue={elem.description_en}
                            onChange={(e) => setDestinationEn(e)}
                            modules={modules}
                            formats={formats}
                          />
                        </Col>
                        <Col className="col" lg={12}>
                          <hr />
                          <h4>ОПИСАНИЕ ТОВАРА НА УЗБЕКСКОМ 2 *</h4>
                          <ReactQuill
                            theme="snow"
                            defaultValue={elem.text_uz}
                            onChange={(e) => setDestinationUz2(e)}
                            modules={modules}
                            formats={formats}
                          />
                        </Col>
                        <Col className="col" lg={12}>
                          <h4>ОПИСАНИЕ ТОВАРА НА РУССКОМ ЯЗЫКЕ 2 *</h4>
                          <ReactQuill
                            theme="snow"
                            defaultValue={elem.text_ru}
                            onChange={(e) => setDestinationRu2(e)}
                            modules={modules}
                            formats={formats}
                          />
                        </Col>
                        <Col className="col" lg={12}>
                          <h4>ОПИСАНИЕ БРЕНДА НА АНГЛИЙСКОМ ЯЗЫКЕ 2 *</h4>
                          <ReactQuill
                            theme="snow"
                            defaultValue={elem.text_en}
                            onChange={(e) => setDestinationEn2(e)}
                            modules={modules}
                            formats={formats}
                          />
                        </Col>
                      </Row>
                    </>
                  ) : null
                )}
                <hr />
                <CommonBtn
                  type="submit"
                  style={{
                    margin: "20px 10px 0 auto",
                    padding: "15px 40px",
                    border: "2px solid #f3f3f3",
                    borderRadius: "50px",
                  }}
                >
                  Изменить
                </CommonBtn>
              </div>
            </div>
          </Wrapper>
        </>
      </DraverCommon>
    </>
  );
}
export default Put;
