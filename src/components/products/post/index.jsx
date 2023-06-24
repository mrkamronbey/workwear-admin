import React, { useEffect, useRef, useState } from "react";
import CommonBtn from "../../common/CommonBtn";
import ModalCommon from "../../common/Modal/Modal";
import { Wrapper } from "./styled-index";
import { useDispatch, useSelector } from "react-redux";
import { ProductPost, ProductGet } from "../../../redux/products/index";
import { CategoryGet } from "../../../redux/category/index";
import { Row, Col } from "react-grid-system";
import SelectCommon from "../../common/select/index";
import "./styles.css";

function ProductAddForm({ Open, HandleClose, setSelectId, selectId, setLoadings }) {
  const dispatch = useDispatch();
  const titleUz = useRef();
  const titleRu = useRef();
  const productTypeUz = useRef();
  const productTypeRu = useRef();
  const completenessUz = useRef();
  const completenessRu = useRef();
  const purposeUz = useRef();
  const purposeRu = useRef();
  const colorUz = useRef();
  const colorRu = useRef();
  const mainFabricUz = useRef();
  const mainFabricRu = useRef();
  const compoundUz = useRef();
  const compoundRu = useRef();
  const guarantePeriodUz = useRef();
  const guarantePeriodRu = useRef();

  // category get
  const categoryGets = useSelector((state) => state.category.categoryGet.data);
  useEffect(() => {
    dispatch(CategoryGet());
  }, []);
  // category get

  useEffect(() => {
    dispatch(ProductGet());
  }, []);

  // product post
  const productPost = useSelector((state) => state.product);
  const HandleSubmit = async (e) => {
    console.log("ok");
    e.preventDefault();
    const body = {
      title_uz: titleUz.current.value,
      title_ru: titleRu.current.value,
      product_type_uz: productTypeUz.current.value,
      product_type_ru: productTypeRu.current.value,
      completeness_uz: completenessUz.current.value,
      completeness_ru: completenessRu.current.value,
      purpose_uz: purposeUz.current.value,
      purpose_ru: purposeRu.current.value,
      color_uz: colorUz.current.value,
      color_ru: colorRu.current.value,
      main_fabric_uz: mainFabricUz.current.value,
      main_fabric_ru: mainFabricRu.current.value,
      compound_uz: compoundUz.current.value,
      compound_ru: compoundRu.current.value,
      guarante_period_uz: guarantePeriodUz.current.value,
      guarante_period_ru: guarantePeriodRu.current.value,
      category: selectId,
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
      label: elem.category_name_ru,
    })
  );
  // product post
  return (
    <ModalCommon width={550} height={400} open={Open} handleClose={HandleClose}>
      <>
        <Wrapper onSubmit={HandleSubmit}>
          <h3>Добавить продукт</h3>

          <div className="input_wrap">
            <div className="scrool">
              <Row className="row">
                <Col className="col" lg={12}>
                  <div className="selects">
                    <SelectCommon
                      onChange={(e) => setSelectId(e)}
                      placeholder="Select"
                      options={options}
                    />
                  </div>
                </Col>
                <Col className="col" lg={6}>
                  <input
                    type="text"
                    placeholder="Имя продукта узб..."
                    required
                    ref={titleUz}
                  />
                </Col>
                <Col className="col" lg={6}>
                  <input
                    type="text"
                    placeholder="Имя продукта русский..."
                    required
                    ref={titleRu}
                  />
                </Col>
                <Col className="col" lg={6}>
                  <input
                    type="text"
                    placeholder="Вид изделия узб..."
                    required
                    ref={productTypeUz}
                  />
                </Col>
                <Col className="col" lg={6}>
                  <input
                    type="text"
                    placeholder="Вид изделия русский..."
                    required
                    ref={productTypeRu}
                  />
                </Col>
                <Col className="col" lg={6}>
                  <input
                    type="text"
                    placeholder="Комплектность узб..."
                    required
                    ref={completenessUz}
                  />
                </Col>
                <Col className="col" lg={6}>
                  <input
                    type="text"
                    placeholder="Комплектность русский..."
                    required
                    ref={completenessRu}
                  />
                </Col>
                <Col className="col" lg={6}>
                  <input
                    type="text"
                    placeholder="Назначение узб..."
                    required
                    ref={purposeUz}
                  />
                </Col>
                <Col className="col" lg={6}>
                  <input
                    type="text"
                    placeholder="Назначение русский..."
                    required
                    ref={purposeRu}
                  />
                </Col>
                <Col className="col" lg={6}>
                  <input
                    type="text"
                    placeholder="Цвет узб..."
                    required
                    ref={colorUz}
                  />
                </Col>
                <Col className="col" lg={6}>
                  <input
                    type="text"
                    placeholder="Цвет русский..."
                    required
                    ref={colorRu}
                  />
                </Col>
                <Col className="col" lg={6}>
                  <input
                    type="text"
                    placeholder="Основная ткань узб..."
                    required
                    ref={mainFabricUz}
                  />
                </Col>
                <Col className="col" lg={6}>
                  <input
                    type="text"
                    placeholder="Основная ткань русский..."
                    required
                    ref={mainFabricRu}
                  />
                </Col>
                <Col className="col" lg={6}>
                  <input
                    type="text"
                    placeholder="Состав узб..."
                    required
                    ref={compoundUz}
                  />
                </Col>
                <Col className="col" lg={6}>
                  <input
                    type="text"
                    placeholder="Состав русский..."
                    required
                    ref={compoundRu}
                  />
                </Col>
                <Col className="col" lg={6}>
                  <input
                    type="text"
                    placeholder="Гарантийный срок узб..."
                    required
                    ref={guarantePeriodUz}
                  />
                </Col>
                <Col className="col" lg={6}>
                  <input
                    type="text"
                    placeholder="Гарантийный срок русский..."
                    required
                    ref={guarantePeriodRu}
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

export default ProductAddForm;
