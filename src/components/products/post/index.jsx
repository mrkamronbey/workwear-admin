import React, { useEffect, useState } from "react";
import CommonBtn from "../../common/CommonBtn";
import ModalCommon from "../../common/Modal/Modal";
import { Wrapper } from "./styled-index";
import { useDispatch, useSelector } from "react-redux";
import {
  ProductPost,
  ProductGet,
  UploadImage,
  UploadImage1,
  UploadImage2,
  UploadImage3,
} from "../../../redux/products/index";
import { CategoryGet } from "../../../redux/category/index";
import { Row, Col } from "react-grid-system";
import SelectCommon from "../../common/select/index";
import DrawerCommon from "../../common/Drawer/index";
import InputCommon from "../../common/input/index";
import "./styles.css";
import { Spin, Input, Image, Select } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { sizes } from "../../../utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProductsPost } from "../../../queries/product_query";
import ReactQuill, { Quill } from "react-quill";
import QuillBetterTable from "quill-better-table";
import "react-quill/dist/quill.snow.css";


function ProductAddForm({ Open, HandleClose, setSelectId, selectId }) {
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

  // const queryClient = useQueryClient();

  const handleChange = (value) => {
    setSize(value);
  };

  // category get
  const categoryGets = useSelector((state) => state.category.categoryGet.data);

  useEffect(() => {
    dispatch(CategoryGet());
  }, []);
  // category get

  const dataProject = useSelector((state) => state.product?.uploadProjects);
  const dataProject1 = useSelector((state) => state.product?.uploadProjects1);
  const dataProject2 = useSelector((state) => state.product?.uploadProjects2);
  const dataProject3 = useSelector((state) => state.product?.uploadProjects3);

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

  const SelectChange = (e) => {
    setSelectId(e);
  };

  // product post

  // const mutation = useMutation({
  //   mutationFn: (body) => ProductsPost(body)
  // });
  // const HandleSubmit = async (e) => {
  //   e.preventDefault();
  //   mutation.mutate({
  //     title_uz: titleUz,
  //     title_ru: titleRu,
  //     title_en: titleEn,
  //     destination_uz: destinationUz,
  //     destination_ru: destinationRu,
  //     destination_en: destinationEn,
  //     text_uz: destinationUz2,
  //     text_ru: destinationRu2,
  //     text_en: destinationEn2,
  //     size: [...size],
  //     category: selectId,
  //     image: ["image", "image"],
  //   });
  //   if (mutation.isSuccess) {
  //     console.log("Qoshildi");
  //   } else if (mutation.isError) {
  //     console.log(error);
  //   }
  //   // const body = {
  //   //   title_uz: titleUz,
  //   //   title_ru: titleRu,
  //   //   title_en: titleEn,
  //   //   destination_uz: destinationUz,
  //   //   destination_ru: destinationRu,
  //   //   destination_en: destinationEn,
  //   //   text_uz: destinationUz2,
  //   //   text_ru: destinationRu2,
  //   //   text_en: destinationEn2,
  //   //   size: [...size],
  //   //   category: selectId,
  //   //   image1: dataProject.data,
  //   //   image2: dataProject1.data,
  //   //   image3: dataProject2.data,
  //   //   image4: dataProject3.data,
  //   // };

  //   // console.log(body, "body");

  //   // await dispatch(ProductPost(body));
  //   // dispatch(ProductGet());
  //   // HandleClose();
  //   // window.location.reload();
  // };
  const mutation = useMutation({
    mutationFn: (body) => ProductsPost(body),
    onSuccess: () => {
      console.log("Qo'shildi");
    },
    onError: (error) => {
      console.error(error);
    }
  });
  
  const HandleSubmit = async (e) => {
    e.preventDefault();
      await mutation.mutateAsync({
        title_uz: titleUz,
        title_ru: titleRu,
        title_en: titleEn,
        destination_uz: destinationUz,
        destination_ru: destinationRu,
        destination_en: destinationEn,
        text_uz: destinationUz2,
        text_ru: destinationRu2,
        text_en: destinationEn2,
        size: size,
        category: selectId,
        image: ["image1.jpg", "image2.jpg"] // Örnek resim URL'leri
      });
  }
  
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
        color: "#000",
      }}
      spin
    />
  );

  const options = [];
  categoryGets.map((elem) =>
    options.push({
      value: elem.id,
      label: elem.title_ru,
    })
  );
  // product post

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
    <DrawerCommon title="Добавить продукт" open={Open} onClose={HandleClose}>
      <>
        <Wrapper onSubmit={HandleSubmit}>
          <div className="input_wrap">
            <div className="scrool">
              <Row className="row">
                <Col className="col" lg={12}>
                  <h4>Выбрать категорию</h4>
                  <div className="selects">
                    <SelectCommon
                      defaultValue={selectId}
                      onChange={SelectChange}
                      placeholder="Выбрать"
                      options={options}
                    />
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
                          style={{
                            aspectRatio: "1 / 1",
                            borderRadius: "20px",
                            zIndex: "99999999",
                            objectFit: "cover",
                          }}
                          src={dataProject.data}
                        />
                      ) : (
                        <div className="none_img">
                          <i class="bx bxs-image"></i>
                        </div>
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
                            id="file0"
                            onChange={HandleChange}
                          />
                          <label for="file0" class="custom-file-upload">
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
                      ) : dataProject1.Success == true ? (
                        <Image
                          style={{
                            aspectRatio: "1 / 1",
                            borderRadius: "20px",
                            zIndex: "99999999",
                            objectFit: "cover",
                          }}
                          src={dataProject1.data}
                        />
                      ) : (
                        <div className="none_img">
                          <i class="bx bxs-image"></i>
                        </div>
                      )}
                    </Col>
                    <Col className="col_upload" lg={2}>
                      {dataProject1.Loading == true ? (
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
                          style={{
                            aspectRatio: "1 / 1",
                            borderRadius: "20px",
                            zIndex: "99999999",
                            objectFit: "cover",
                          }}
                          src={dataProject2.data}
                        />
                      ) : (
                        <div className="none_img">
                          <i class="bx bxs-image"></i>
                        </div>
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
                          style={{
                            aspectRatio: "1 / 1",
                            borderRadius: "20px",
                            zIndex: "99999999",
                            objectFit: "cover",
                          }}
                          src={dataProject3.data}
                        />
                      ) : (
                        <div className="none_img">
                          <i class="bx bxs-image"></i>
                        </div>
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
                          Рекомендуемое разрешение <span>1080×1080</span>
                        </p>
                        <p>
                          {" "}
                          <span>Размер: </span>размер файла не должен превышать
                          5 MB
                        </p>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col className="col" lg={6}>
                  <h4>НАЗВАНИЕ ТОВАРА НА УЗБЕКСКОМ *</h4>
                  <InputCommon
                    type="text"
                    placeholder="узбекский"
                    required
                    onChange={(e) => setTitleUz(e.currentTarget.value)}
                  />
                  <h4>НАЗВАНИЕ ТОВАРА НА РУССКОМ ЯЗЫКЕ *</h4>
                  <InputCommon
                    type="text"
                    placeholder="русский"
                    required
                    onChange={(e) => setTitleRU(e.currentTarget.value)}
                  />
                  <h4>НАЗВАНИЕ БРЕНДА НА АНГЛИЙСКОМ ЯЗЫКЕ *</h4>
                  <InputCommon
                    type="text"
                    placeholder="английский"
                    required
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
                    value={destinationUz}
                    onChange={(e) => setDestinationUz(e)}
                    modules={modules}
                    formats={formats}
                  />
                </Col>
                <Col className="col" lg={12}>
                  <h4>ОПИСАНИЕ ТОВАРА НА РУССКОМ ЯЗЫКЕ *</h4>
                  <ReactQuill
                    theme="snow"
                    value={destinationRu}
                    onChange={(e) => setDestinationRu(e)}
                    modules={modules}
                    formats={formats}
                  />
                </Col>
                <Col className="col" lg={12}>
                  <h4>ОПИСАНИЕ БРЕНДА НА АНГЛИЙСКОМ ЯЗЫКЕ *</h4>
                  <ReactQuill
                    theme="snow"
                    value={destinationEn}
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
                    value={destinationUz2}
                    onChange={(e) => setDestinationUz2(e)}
                    modules={modules}
                    formats={formats}
                  />
                </Col>
                <Col className="col" lg={12}>
                  <h4>ОПИСАНИЕ ТОВАРА НА РУССКОМ ЯЗЫКЕ 2 *</h4>
                  <ReactQuill
                    theme="snow"
                    value={destinationRu2}
                    onChange={(e) => setDestinationRu2(e)}
                    modules={modules}
                    formats={formats}
                  />
                </Col>
                <Col className="col" lg={12}>
                  <h4>ОПИСАНИЕ БРЕНДА НА АНГЛИЙСКОМ ЯЗЫКЕ 2 *</h4>
                  <ReactQuill
                    theme="snow"
                    value={destinationEn2}
                    onChange={(e) => setDestinationEn2(e)}
                    modules={modules}
                    formats={formats}
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
                  borderRadius: "50px",
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
