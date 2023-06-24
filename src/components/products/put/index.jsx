import ModalCommon from "../../common/Modal/Modal";
import { Wrapper } from "./styled-index";
import { Row, Col } from "react-grid-system";
import CommonBtn from "../../common/CommonBtn";
import "./styles.css";
import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductPut, ProductGet } from "../../../redux/products";
import { CategoryGet } from "../../../redux/category/index";
import SelectCommon from "../../common/select/index";

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

  const productPut = useSelector((state) => state.product);
  // product get
  const productGets = useSelector((state) => state.product.productGet.data);
  useEffect(() => {
    dispatch(ProductGet());
  }, []);
  // product get
  // category get
  const categoryGets = useSelector((state) => state.category.categoryGet.data);
  useEffect(() => {
    dispatch(CategoryGet());
  }, []);
  // category get

  useEffect(() => {
    dispatch(ProductGet());
  }, []);

  const options = [];
  categoryGets.map((elem) =>
    options.push({
      value: elem.id,
      label: elem.category_name_ru,
    })
  );

  const HandleSubmit = async (e) => {
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
      <ModalCommon
        width={600}
        height={350}
        open={openPut}
        handleClose={handleClosePut}
      >
        <Wrapper onSubmit={HandleSubmit}>
          <h3>Изменить продукт</h3>
          <div className="input_wrap">
            <div className="scrool">
              {productGets.map((elem) =>
                elem.id == put_id ? (
                  <>
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
                          defaultValue={elem.title_uz}
                          ref={titleUz}
                        />
                      </Col>
                      <Col className="col" lg={6}>
                        <input
                          type="text"
                          defaultValue={elem.title_ru}
                          ref={titleRu}
                        />
                      </Col>
                      <Col className="col" lg={6}>
                        <input
                        
                          type="text"
                          defaultValue={elem.product_type_uz}
                          ref={productTypeUz}
                        />
                      </Col>
                      <Col className="col" lg={6}>
                        <input
                          type="text"
                          defaultValue={elem.product_type_ru}
                          ref={productTypeRu}
                        />
                      </Col>
                      <Col className="col" lg={6}>
                        <input
                          type="text"
                          defaultValue={elem.completeness_uz}
                          ref={completenessUz}
                        />
                      </Col>
                      <Col className="col" lg={6}>
                        <input
                          type="text"
                          defaultValue={elem.completeness_ru}
                          ref={completenessRu}
                        />
                      </Col>
                      <Col className="col" lg={6}>
                        <input
                          type="text"
                          defaultValue={elem.purpose_uz}
                          ref={purposeUz}
                        />
                      </Col>
                      <Col className="col" lg={6}>
                        <input
                          type="text"
                          defaultValue={elem.purpose_ru}
                          ref={purposeRu}
                        />
                      </Col>
                      <Col className="col" lg={6}>
                        <input
                          type="text"
                          defaultValue={elem.color_uz}
                          ref={colorUz}
                        />
                      </Col>
                      <Col className="col" lg={6}>
                        <input
                          type="text"
                          defaultValue={elem.color_ru}
                          ref={colorRu}
                        />
                      </Col>
                      <Col className="col" lg={6}>
                        <input
                          type="text"
                          defaultValue={elem.main_fabric_uz}
                          ref={mainFabricUz}
                        />
                      </Col>
                      <Col className="col" lg={6}>
                        <input
                          type="text"
                          defaultValue={elem.main_fabric_ru}
                          ref={mainFabricRu}
                        />
                      </Col>
                      <Col className="col" lg={6}>
                        <input
                          type="text"
                          defaultValue={elem.compound_uz}
                          ref={compoundUz}
                        />
                      </Col>
                      <Col className="col" lg={6}>
                        <input
                          type="text"
                          defaultValue={elem.compound_ru}
                          ref={compoundRu}
                        />
                      </Col>
                      <Col className="col" lg={6}>
                        <input
                          type="text"
                          defaultValue={elem.guarante_period_uz}
                          ref={guarantePeriodUz}
                        />
                      </Col>
                      <Col className="col" lg={6}>
                        <input
                          type="text"
                          defaultValue={elem.guarante_period_ru}
                          ref={guarantePeriodRu}
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
                Изменить
              </CommonBtn>
            </div>
          </div>
        </Wrapper>
      </ModalCommon>
    </>
  );
}
export default Put;
