import ModalCommon from "../../common/Modal/Modal";
import { Wrapper } from "./styled-index";
import { Row, Col } from "react-grid-system";
import CommonBtn from "../../common/CommonBtn";
import "./styles.css";
import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductPut, ProductGet, UploadImage } from "../../../redux/products";
import { CategoryGet } from "../../../redux/category/index";
import SelectCommon from "../../common/select/index";
import DraverCommon from "../../common/Drawer";
import { Spin } from "antd";

function Put({
  openPut,
  handleClosePut,
  put_id,
  setSelectId,
  selectId,
  setLoadings,
}) {
  const ids = put_id;
  const dispatch = useDispatch();
  const titleUz = useRef();
  const titleRu = useRef();
  const titleEn = useRef();
  const productTypeUz = useRef();
  const productTypeRu = useRef();
  const productTypeEn = useRef();
  const contentsUz = useRef();
  const contentsRu = useRef();
  const contentsEn = useRef();
  const destinationUz = useRef();
  const destinationRu = useRef();
  const destinationEn = useRef();
  const colorUz = useRef();
  const colorRu = useRef();
  const colorEn = useRef();
  const mainFabricUz = useRef();
  const mainFabricRu = useRef();
  const mainFabricEn = useRef();
  const compounds = useRef();
  const storageUz = useRef();
  const storageRu = useRef();
  const storageEn = useRef();

  const productPut = useSelector((state) => state.product);
  // product get
  const productGets = useSelector((state) => state.product.productGet.data);
  useEffect(() => {
    dispatch(ProductGet());
  }, []);
  // product get
  // category get
  const categoryGets = useSelector((state) => state.category.categoryGet.data);
  const dataProject = useSelector((state) => state.product?.uploadProjects);
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

  const options = [];
  categoryGets.map((elem) =>
    options.push({
      value: elem.id,
      label: elem.title_ru,
    })
  );

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      title_uz: titleUz.current.value,
      title_ru: titleRu.current.value,
      title_en: titleEn.current.value,
      product_type_uz: productTypeUz.current.value,
      product_type_ru: productTypeRu.current.value,
      product_type_en: productTypeEn.current.value,
      contents_uz: contentsUz.current.value,
      contents_ru: contentsRu.current.value,
      contents_en: contentsEn.current.value,
      destination_uz: destinationUz.current.value,
      destination_ru: destinationRu.current.value,
      destination_en: destinationEn.current.value,
      color_uz: colorUz.current.value,
      color_ru: colorRu.current.value,
      color_en: colorEn.current.value,
      main_fabric_uz: mainFabricUz.current.value,
      main_fabric_ru: mainFabricRu.current.value,
      main_fabric_en: mainFabricEn.current.value,
      Compound: compounds.current.value,
      storage_uz: storageUz.current.value,
      storage_ru: storageRu.current.value,
      storage_en: storageEn.current.value,
      category: selectId,
      image: dataProject.data
    };

    await dispatch(ProductPut({ body, id: ids }));
    dispatch(ProductGet());
    handleClosePut();
    setLoadings(true);
  };
  // if (productPut.productPut.Success == true) {
  //   handleClosePut();
  //   window.location.reload();
  // }
  // const findData = productGets.find((elem) => elem.id == ids);
  // console.log("put_id find", ids ? findData : null);
  return (
    <>
      <DraverCommon title='Изменить продукт' open={openPut} onClose={handleClosePut}>
        <>
          <Wrapper onSubmit={HandleSubmit}>
            <div className="input_wrap">
              <div className="scrool">
                {productGets.map((elem) =>
                  elem.id == put_id ? (
                    <>
                      <Row className="row">
                        <Col className="col" lg={12}>
                          <h4>Выбрать категорию</h4>
                          <div className="selects">
                            <SelectCommon
                              onChange={(e) => setSelectId(e)}
                              placeholder="Выбрать"
                              options={options}
                            />
                          </div>
                        </Col>
                        <Col className="col" lg={12}>
                          <h4>Добавить фотографию</h4>
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
                        <Col className="col" lg={4}>
                          <h4>Имя продукта</h4>
                          <input
                            type="text"
                            defaultValue={elem.title_uz}
                            ref={titleUz}
                          />
                        </Col>
                        <Col className="col" lg={4}>
                          <h4>*</h4>
                          <input
                            type="text"
                            defaultValue={elem.title_ru}
                            ref={titleRu}
                          />
                        </Col>
                        <Col className="col" lg={4}>
                          <h4>*</h4>
                          <input
                            type="text"
                            defaultValue={elem.title_en}
                            ref={titleEn}
                          />
                        </Col>
                        <Col className="col" lg={4}>
                          <h4>Вид изделия</h4>
                          <input
                            type="text"
                            defaultValue={elem.product_type_uz}
                            ref={productTypeUz}
                          />
                        </Col>
                        <Col className="col" lg={4}>
                          <h4>*</h4>
                          <input
                            type="text"
                            defaultValue={elem.product_type_ru}
                            ref={productTypeRu}
                          />
                        </Col>
                        <Col className="col" lg={4}>
                          <h4>*</h4>
                          <input
                            type="text"
                            defaultValue={elem.product_type_en}
                            ref={productTypeEn}
                          />
                        </Col>
                        <Col className="col" lg={4}>
                          <h4>Комплектность</h4>
                          <input
                            type="text"
                            defaultValue={elem.contents_uz}
                            ref={contentsUz}
                          />
                        </Col>
                        <Col className="col" lg={4}>
                          <h4>*</h4>
                          <input
                            type="text"
                            defaultValue={elem.contents_ru}
                            ref={contentsRu}
                          />
                        </Col>
                        <Col className="col" lg={4}>
                          <h4>*</h4>
                          <input
                            type="text"
                            defaultValue={elem.contents_en}
                            ref={contentsEn}
                          />
                        </Col>
                        <Col className="col" lg={4}>
                          <h4>Назначение</h4>
                          <input
                            type="text"
                            defaultValue={elem.destination_uz}
                            ref={destinationUz}
                          />
                        </Col>
                        <Col className="col" lg={4}>
                          <h4>*</h4>
                          <input
                            type="text"
                            defaultValue={elem.destination_ru}
                            ref={destinationRu}
                          />
                        </Col>
                        <Col className="col" lg={4}>
                          <h4>*</h4>
                          <input
                            type="text"
                            defaultValue={elem.destination_en}
                            ref={destinationEn}
                          />
                        </Col>
                        <Col className="col" lg={4}>
                          <h4>Цвет</h4>
                          <input
                            type="text"
                            defaultValue={elem.color_uz}
                            ref={colorUz}
                          />
                        </Col>
                        <Col className="col" lg={4}>
                          <h4>*</h4>
                          <input
                            type="text"
                            defaultValue={elem.color_ru}
                            ref={colorRu}
                          />
                        </Col>
                        <Col className="col" lg={4}>
                          <h4>*</h4>
                          <input
                            type="text"
                            defaultValue={elem.color_en}
                            ref={colorEn}
                          />
                        </Col>
                        <Col className="col" lg={4}>
                          <h4>Основная ткань</h4>
                          <input
                            type="text"
                            defaultValue={elem.main_fabric_uz}
                            ref={mainFabricUz}
                          />
                        </Col>
                        <Col className="col" lg={4}>
                          <h4>*</h4>
                          <input
                            type="text"
                            defaultValue={elem.main_fabric_ru}
                            ref={mainFabricRu}
                          />
                        </Col>
                        <Col className="col" lg={4}>
                          <h4>*</h4>
                          <input
                            type="text"
                            defaultValue={elem.main_fabric_en}
                            ref={mainFabricEn}
                          />
                        </Col>
                        <Col className="col" lg={12}>
                          <h4>Состав</h4>
                          <input
                            type="text"
                            defaultValue={elem.Compound}
                            ref={compounds}
                          />
                        </Col>
                        <Col className="col" lg={4}>
                          <h4>Гарантийный срок</h4>
                          <input
                            type="text"
                            defaultValue={elem.storage_uz}
                            ref={storageUz}
                          />
                        </Col>
                        <Col className="col" lg={4}>
                          <h4>*</h4>
                          <input
                            type="text"
                            defaultValue={elem.storage_ru}
                            ref={storageRu}
                          />
                        </Col>
                        <Col className="col" lg={4}>
                          <h4>*</h4>
                          <input
                            type="text"
                            defaultValue={elem.storage_en}
                            ref={storageEn}
                          />
                        </Col>
                      </Row>
                    </>
                  ) : null
                )}

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
      </DraverCommon>
    </>
  );
}
export default Put;
