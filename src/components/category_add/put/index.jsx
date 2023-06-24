import ModalCommon from "../../common/Modal/Modal";
import { Wrapper } from "./styled-index";
import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CategoryPut, CategoryGet } from "../../../redux/category";
import CommonBtn from "../../common/CommonBtn";
import { Row, Col } from "react-grid-system";

function Put({ openPut, handleClosePut, HandlePut, put_id }) {
  const ids = put_id;
  const dispatch = useDispatch();
  const titleUz = useRef();
  const titleRu = useRef();
  // const [titleUz, setTitleUz] = useState(null);
  // const[titleRu, setTitleRu] = useState(null);
  const categoryPuts = useSelector((state) => state.category);
  const categoryGets = useSelector((state) => state.category.categoryGet.data);
  useEffect(() => {
    dispatch(CategoryGet());
  }, []);
  const HandleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      category_name_uz: titleUz.current.value,
      category_name_ru: titleRu.current.value,
      // category_name_uz: titleUz,
      // category_name_ru: titleRu,
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
                          // onChange={(e) => setTitleUz(e.target.value)}
                          // placeholder={elem.category_name_uz}
                          ref={titleUz}
                          defaultValue={elem.category_name_uz}
                        />
                      </Col>
                      <Col className="col" lg={6}>
                        <input
                          type="text"
                          // onChange={(e) => setTitleRu(e.target.value)}
                          // placeholder={elem.category_name_ru}
                          ref={titleRu}
                          defaultValue={elem.category_name_ru}
                        />
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
