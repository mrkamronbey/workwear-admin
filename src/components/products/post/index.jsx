import React, { useEffect, useRef, useState } from "react";
import CommonBtn from "../../common/CommonBtn";
import ModalCommon from "../../common/Modal/Modal";
import { Wrapper } from "./styled-index";
import { useDispatch, useSelector } from "react-redux";
import { ProductPost, ProductGet, UploadImage } from "../../../redux/products/index";
import { CategoryGet } from "../../../redux/category/index";
import { Row, Col } from "react-grid-system";
import SelectCommon from "../../common/select/index";
import DrawerCommon from '../../common/Drawer/index'
import "./styles.css";
import { Spin } from "antd";

function ProductAddForm({ Open, HandleClose, setSelectId, selectId }) {

  console.log(selectId)

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



  // category get
  const categoryGets = useSelector((state) => state.category.categoryGet.data);
  
  useEffect(() => {
    dispatch(CategoryGet());
  }, []);
  // category get

  const dataProject = useSelector((state) => state.product?.uploadProjects);

  useEffect(() => {
    dispatch(ProductGet());
  }, []);
  const HandleChange = async (e) => {
    await dispatch(UploadImage(e));
  };

  window.localStorage.setItem('categoryId', selectId)

   const SelectChange = (e) => {
      setSelectId(e)
   }

  // product post
  const productPost = useSelector((state) => state.product);
  const HandleSubmit = async (e) => {
    console.log("ok");
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

    await dispatch(ProductPost(body));
    dispatch(ProductGet());
    HandleClose();
  };
  // if (ProductGet.pending) {
  //   setLoadings(true)
  // } else if(ProductGet.fulfilled){
  //   setLoadings(false)
  // }

  const options = [];
  categoryGets.map((elem) =>
    options.push({
      value: elem.id,
      label: elem.title_ru,
    })
  );
  // product post
  return (
    <DrawerCommon title='Добавить продукт' open={Open} onClose={HandleClose}>
      <>
        <Wrapper onSubmit={HandleSubmit}>
          <div className="input_wrap">
            <div className="scrool">
              <Row className="row">
                <Col className="col" lg={12}>
                  <h4>Выбрать категорию</h4>
                  <div className="selects">
                    <SelectCommon
                      onChange={SelectChange}
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
                    placeholder="узбекский"
                    required
                    ref={titleUz}
                  />
                </Col>
                <Col className="col" lg={4}>
                  <h4>*</h4>
                  <input
                    type="text"
                    placeholder="русский"
                    required
                    ref={titleRu}
                  />
                </Col>
                <Col className="col" lg={4}>
                  <h4>*</h4>
                  <input
                    type="text"
                    placeholder="английский"
                    required
                    ref={titleEn}
                  />
                </Col>
                <Col className="col" lg={4}>
                  <h4>Вид изделия</h4>
                  <input
                    type="text"
                    placeholder="узбекский"
                    required
                    ref={productTypeUz}
                  />
                </Col>
                <Col className="col" lg={4}>
                  <h4>*</h4>
                  <input
                    type="text"
                    placeholder="русский"
                    required
                    ref={productTypeRu}
                  />
                </Col>
                <Col className="col" lg={4}>
                  <h4>*</h4>
                  <input
                    type="text"
                    placeholder="английский"
                    required
                    ref={productTypeEn}
                  />
                </Col>
                <Col className="col" lg={4}>
                  <h4>Комплектность</h4>
                  <input
                    type="text"
                    placeholder="узбекский"
                    required
                    ref={contentsUz}
                  />
                </Col>
                <Col className="col" lg={4}>
                  <h4>*</h4>
                  <input
                    type="text"
                    placeholder="русский"
                    required
                    ref={contentsRu}
                  />
                </Col>
                <Col className="col" lg={4}>
                  <h4>*</h4>
                  <input
                    type="text"
                    placeholder="английский"
                    required
                    ref={contentsEn}
                  />
                </Col>
                <Col className="col" lg={4}>
                  <h4>Назначение</h4>
                  <input
                    type="text"
                    placeholder="узбекский"
                    required
                    ref={destinationUz}
                  />
                </Col>
                <Col className="col" lg={4}>
                  <h4>*</h4>
                  <input
                    type="text"
                    placeholder="русский"
                    required
                    ref={destinationRu}
                  />
                </Col>
                <Col className="col" lg={4}>
                  <h4>*</h4>
                  <input
                    type="text"
                    placeholder="английский"
                    required
                    ref={destinationEn}
                  />
                </Col>
                <Col className="col" lg={4}>
                  <h4>Цвет</h4>
                  <input
                    type="text"
                    placeholder="узбекский"
                    required
                    ref={colorUz}
                  />
                </Col>
                <Col className="col" lg={4}>
                  <h4>*</h4>
                  <input
                    type="text"
                    placeholder="русский"
                    required
                    ref={colorRu}
                  />
                </Col>
                <Col className="col" lg={4}>
                  <h4>*</h4>
                  <input
                    type="text"
                    placeholder="английский"
                    required
                    ref={colorEn}
                  />
                </Col>
                <Col className="col" lg={4}>
                  <h4>Основная ткань</h4>
                  <input
                    type="text"
                    placeholder="узбекский"
                    required
                    ref={mainFabricUz}
                  />
                </Col>
                <Col className="col" lg={4}>
                  <h4>*</h4>
                  <input
                    type="text"
                    placeholder="русский"
                    required
                    ref={mainFabricRu}
                  />
                </Col>
                <Col className="col" lg={4}>
                  <h4>*</h4>
                  <input
                    type="text"
                    placeholder="английский"
                    required
                    ref={mainFabricEn}
                  />
                </Col>
                <Col className="col" lg={12}>
                  <h4>Состав</h4>
                  <input
                    type="text"
                    placeholder="печатание..."
                    required
                    ref={compounds}
                  />
                </Col>
                <Col className="col" lg={4}>
                  <h4>Гарантийный срок</h4>
                  <input
                    type="text"
                    placeholder="узбекский"
                    required
                    ref={storageUz}
                  />
                </Col>
                <Col className="col" lg={4}>
                  <h4>*</h4>
                  <input
                    type="text"
                    placeholder="русский"
                    required
                    ref={storageRu}
                  />
                </Col>
                <Col className="col" lg={4}>
                  <h4>*</h4>
                  <input
                    type="text"
                    placeholder="английский"
                    required
                    ref={storageEn}
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
    </DrawerCommon>

  );
}

export default ProductAddForm;
