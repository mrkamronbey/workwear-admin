import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./styles.css";
import TableCommon from "../../common/table";
import { Image, Popover, Tooltip, Space, Card } from "antd";
import { CategoryGet } from "../../../redux/category";
import { useEffect, useState } from "react";
import DraverCommon from "../../common/Drawer";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Row, Col } from "react-grid-system";
const { Meta } = Card;

export default function TableAdd({ HandleDelete, onClickPut, selectId }) {
  const productGetState = useSelector((state) => state.product);
  const productPost = useSelector((state) => state.product);
  const rows = productGetState.productGet?.data;
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(CategoryGet());
  }, []);

  // productPost.productPost.Success == true ? setLoadings(true) : setLoadings(false)
  const categoryGets = useSelector((state) => state.category.categoryGet.data);
  const categoryFind = categoryGets.find((elem) => elem.id == selectId);
  console.log(rows, "bu category");

  // const data = [];
  // rows.map((elem, index) => {
  //   data.push({
  //     key: elem.id,
  //     Имявкаталоге: (
  //       <span style={{ fontWeight: "bold" }}>{elem?.category?.title_ru}</span>
  //     ),
  //     data: index + 1,
  //     Фото: (
  //       <Image
  //         width={60}
  //         height="100%"
  //         style={{
  //           aspectRatio: "1 / 1",
  //           borderRadius: "20px",
  //           objectFit: "cover",
  //         }}
  //         src={elem.image}
  //       />
  //     ),
  //     имяпродукта: (
  //       <Tooltip
  //         width="100%"
  //         color="#1fab8a"
  //         title={
  //           <div className="tooltip_box">
  //             <span>
  //               узбекский:<span>{elem.title_uz}</span>
  //             </span>
  //             <br />
  //             <span>
  //               английский:<span>{elem.title_en}</span>
  //             </span>
  //           </div>
  //         }
  //       >
  //         <span className="curson">{elem.title_ru}</span>
  //       </Tooltip>
  //     ),
  //     видизделия: (
  //       <Tooltip
  //         color="#1fab8a"
  //         title={
  //           <div className="tooltip_box">
  //             <span>
  //               узбекский:<span>{elem.product_type_uz}</span>
  //             </span>
  //             <br />
  //             <span>
  //               английский:<span>{elem.product_type_en}</span>
  //             </span>
  //           </div>
  //         }
  //       >
  //         <span className="curson">{elem.product_type_ru}</span>
  //       </Tooltip>
  //     ),
  //     комплектность: (
  //       <Tooltip
  //         color="#1fab8a"
  //         title={
  //           <div className="tooltip_box">
  //             <span>
  //               узбекский:<span>{elem.contents_uz}</span>
  //             </span>
  //             <br />
  //             <span>
  //               английский:<span>{elem.contents_en}</span>
  //             </span>
  //           </div>
  //         }
  //       >
  //         <span className="curson">{elem.contents_ru}</span>
  //       </Tooltip>
  //     ),
  //     назначение: (
  //       <Tooltip
  //         color="#1fab8a"
  //         title={
  //           <div className="tooltip_box">
  //             <span>
  //               узбекский:<span>{elem.destination_uz}</span>
  //             </span>
  //             <br />
  //             <span>
  //               английский:<span>{elem.destination_en}</span>
  //             </span>
  //           </div>
  //         }
  //       >
  //         <span className="curson">{elem.destination_ru}</span>
  //       </Tooltip>
  //     ),
  //     цвет: (
  //       <Tooltip
  //         color="#1fab8a"
  //         title={
  //           <div className="tooltip_box">
  //             <span>
  //               узбекский:<span>{elem.color_uz}</span>
  //             </span>
  //             <br />
  //             <span>
  //               английский:<span>{elem.color_en}</span>
  //             </span>
  //           </div>
  //         }
  //       >
  //         <span className="curson">{elem.color_ru}</span>
  //       </Tooltip>
  //     ),
  //     основнаяткань: (
  //       <Tooltip
  //         color="#1fab8a"
  //         title={
  //           <div className="tooltip_box">
  //             <span>
  //               узбекский:<span>{elem.main_fabric_uz}</span>
  //             </span>
  //             <br />
  //             <span>
  //               английский:<span>{elem.main_fabric_en}</span>
  //             </span>
  //           </div>
  //         }
  //       >
  //         <span className="curson">{elem.main_fabric_ru}</span>
  //       </Tooltip>
  //     ),
  //     состав: (
  //       <div>
  //         <span className="curson">{elem.Compound}</span>
  //       </div>
  //     ),
  //     гарантийныйсрок: (
  //       <Tooltip
  //         color="#1fab8a"
  //         title={
  //           <div className="tooltip_box">
  //             <span>
  //               узбекский:<span>{elem.storage_uz}</span>
  //             </span>
  //             <br />
  //             <span>
  //               английский:<span>{elem.storage_en}</span>
  //             </span>
  //           </div>
  //         }
  //       >
  //         <span className="curson">{elem.storage_ru}</span>
  //       </Tooltip>
  //     ),
  //     Действие: (
  //       <div className="boxx">
  //         <div className="btn-wraps">
  //           <button onClick={onClickPut} id={elem.id}>
  //             <i class="bx bx-message-square-edit"></i>
  //           </button>
  //         </div>

  //         <Space wrap>
  //           <Popover
  //             trigger="click"
  //             placement="rightBottom"
  //             content={
  //               <div className="content_delete_box">
  //                 <p>Вы уверены, что хотите удалить эту категория?</p>
  //                 <p>
  //                   При удалений категорий вся информация принадлежащая <br />{" "}
  //                   данной категории будут удалены безвозратно
  //                 </p>
  //                 <div className="btn_wrap_delete">
  //                   <button
  //                     onClick={HandleDelete}
  //                     id={elem.id}
  //                     className="yes_btn"
  //                   >
  //                     Удалить
  //                   </button>
  //                 </div>
  //               </div>
  //             }
  //             title={
  //               <div className="delete_box">
  //                 <i class="bx bxs-error-circle"></i>
  //                 <span>
  //                   Удалите категория <span>{elem.title_ru}</span>
  //                 </span>
  //               </div>
  //             }
  //           >
  //             <div className="btn-wrap">
  //               <button id={elem.id}>
  //                 <i class="bx bxs-trash"></i>
  //               </button>
  //             </div>
  //           </Popover>
  //         </Space>
  //       </div>
  //     ),
  //   });
  // });

  // const columns = [
  //   {
  //     title: "№",
  //     dataIndex: "data",
  //     key: "data",
  //     fixed: "left",
  //     align: "center",
  //     width: "50px",
  //   },
  //   {
  //     title: "Имя в каталоге",
  //     dataIndex: "Имявкаталоге",
  //     key: "Имявкаталоге",
  //     fixed: "left",
  //     width: "auto",
  //     align: "center",
  //   },
  //   {
  //     title: "Фото",
  //     dataIndex: "Фото",
  //     key: "Фото",
  //     // fixed: "left",
  //     align: "center",
  //   },
  //   {
  //     title: "Имя продукта",
  //     dataIndex: "имяпродукта",
  //     key: "имяпродукта",
  //     // fixed: "left",
  //   },
  //   {
  //     title: "Вид изделия",
  //     dataIndex: "видизделия",
  //     key: "видизделия",
  //   },
  //   {
  //     title: "Комплектность",
  //     dataIndex: "комплектность",
  //     key: "комплектность",
  //   },
  //   {
  //     title: "Назначение",
  //     dataIndex: "назначение",
  //     key: "назначение",
  //   },
  //   {
  //     title: "Цвет",
  //     dataIndex: "цвет",
  //     key: "цвет",
  //   },
  //   {
  //     title: "Основная ткань",
  //     dataIndex: "основнаяткань",
  //     key: "основнаяткань",
  //     width: "200px",
  //   },
  //   {
  //     title: "Состав",
  //     dataIndex: "состав",
  //     key: "состав",
  //   },
  //   {
  //     title: "Гарантийный срок",
  //     dataIndex: "гарантийныйсрок",
  //     key: "гарантийныйсрок",
  //     width: "200px",
  //   },
  //   {
  //     title: "Действие",
  //     dataIndex: "Действие",
  //     key: "Действие",
  //     fixed: "right",
  //     align: "center",
  //   },
  // ];

  return (
    <>
      {/* <TableCommon
        bordered
        columns={columns}
        data={data}
        pagination={false}
        scroll={{
          x: 1500,
          y: 320,
        }}
      /> */}
      <div>
        <Row>
          {rows.map((elem) => (
            <Col key={elem.id} lg={2}>
              <Card
                style={{
                  width: 200,
                }}
                cover={
                  <img
                    style={{
                      aspectRatio: "1 / 1",
                      borderRadius: "10px 10px 20px 20px",
                      zIndex: "99999999",
                      objectFit: "cover",
                    }}
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  />
                }
                actions={[
                  <>
                    <div className="boxx">
                      <Space wrap>
                        <Popover
                          trigger="click"
                          placement="rightBottom"
                          content={
                            <div className="content_delete_box">
                              <p>
                                Вы уверены, что хотите удалить эту ПРОДУКТ?
                              </p>
                              <p>
                                При удалений категорий вся информация
                                принадлежащая <br /> данной ПРОДУКТ будут
                                удалены безвозратно
                              </p>
                              <div className="btn_wrap_delete">
                                <button
                                  onClick={HandleDelete}
                                  id={elem.id}
                                  className="yes_btn"
                                >
                                  Удалить
                                </button>
                              </div>
                            </div>
                          }
                          title={
                            <div className="delete_box">
                              <i class="bx bxs-error-circle"></i>
                              <span>
                                Удалите ПРОДУКТ <span>{elem.title_ru}</span>
                              </span>
                            </div>
                          }
                        >
                          <div className="btn-wrap">
                            <button id={elem.id}>
                              <i class="bx bxs-trash"></i>
                            </button>
                          </div>
                        </Popover>
                      </Space>
                    </div>
                  </>,
                  <EditOutlined onClick={onClickPut} id={elem.id} key="edit" />,
                  <EllipsisOutlined
                    onClick={() => setOpen(true)}
                    id={elem.id}
                    key="ellipsis"
                  />,
                ]}
              >
                <Meta title={elem.title_ru} />
              </Card>
            </Col>
          ))}
        </Row>
        <DraverCommon title={"Product Details"} open={open} onClose={onClose}>
          <h1>Product Details</h1>
        </DraverCommon>
      </div>
    </>
  );
}
