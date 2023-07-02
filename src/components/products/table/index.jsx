import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./styles.css";
import TableCommon from "../../common/table";
import { Image, Popover, Tooltip, Space } from 'antd';
import { CategoryGet } from "../../../redux/category";
import { useEffect } from "react";


export default function TableAdd({ HandleDelete, onClickPut, selectId }) {
  const productGetState = useSelector((state) => state.product);
  const productPost = useSelector((state) => state.product);
  const rows = productGetState.productGet?.data;
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(CategoryGet());
  }, []);

  // productPost.productPost.Success == true ? setLoadings(true) : setLoadings(false)
  const categoryGets = useSelector((state) => state.category.categoryGet.data);
  const categoryFind = categoryGets.find(elem => elem.id == selectId)
  console.log(categoryGets.map(elem => elem.products.map(el => el.id)))

  const data = [];
  rows.map((elem, index) => {
    data.push({
      key: elem.id,
      data: index + 1,
      Фото: <Image
        style={{ objectFit: "cover" }}
        width={60}
        height={50}
        src={elem.image}
        fallback="data:image/png;base64,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"
      />,
      имяпродукта: (
        <Tooltip color="#1fab8a" title={
          <div className="tooltip_box">
            <span>узбекский: <span>{elem.title_uz}</span></span>
            <span>английский: <span>{elem.title_en}</span></span>
          </div>
        }>
          <span className="curson">{elem.title_ru}</span>
        </Tooltip>

      ),
      видизделия: (
        <Tooltip color="#1fab8a" title={
          <div className="tooltip_box">
            <span>узбекский: <span>{elem.product_type_uz}</span></span>
            <span>английский: <span>{elem.product_type_en}</span></span>
          </div>
        }>
          <span className="curson">{elem.product_type_ru}</span>
        </Tooltip>
      ),
      комплектность: (
        <Tooltip color="#1fab8a" title={
          <div className="tooltip_box">
            <span>узбекский: <span>{elem.contents_uz}</span></span>
            <span>английский: <span>{elem.contents_en}</span></span>
          </div>
        }>
          <span className="curson">{elem.contents_ru}</span>
        </Tooltip>
      ),
      назначение: (
        <Tooltip color="#1fab8a" title={
          <div className="tooltip_box">
            <span>узбекский: <span>{elem.destination_uz}</span></span>
            <span>английский: <span>{elem.destination_en}</span></span>
          </div>
        }>
          <span className="curson">{elem.destination_ru}</span>
        </Tooltip>
      ),
      цвет: (
        <Tooltip color="#1fab8a" title={
          <div className="tooltip_box">
            <span>узбекский:  <span>{elem.color_uz}</span></span>
            <span>английский: <span>{elem.color_en}</span></span>
          </div>
        }>
          <span className="curson">{elem.color_ru}</span>
        </Tooltip>
      ),
      основнаяткань: (
        <Tooltip color="#1fab8a" title={
          <div className="tooltip_box">
            <span>узбекский:  <span>{elem.main_fabric_uz}</span></span>
            <span>английский: <span>{elem.main_fabric_en}</span></span>
          </div>
        }>
          <span className="curson">{elem.main_fabric_ru}</span>
        </Tooltip>
      ),
      состав: (
        <div>
          <span className="curson">{elem.Compound}</span>
        </div>
      ),
      гарантийныйсрок: (
        <Tooltip color="#1fab8a" title={
          <div className="tooltip_box">
            <span>узбекский:  <span>{elem.storage_uz}</span></span>
            <span>английский: <span>{elem.storage_en}</span></span>
          </div>
        }>
          <span className="curson">{elem.storage_ru}</span>
        </Tooltip>
      ),
      Действие: (
        <div className="boxx">
          <div className="btn-wraps">
            <button onClick={onClickPut} id={elem.id}>
              <i class='bx bx-message-square-edit'></i>
            </button>
          </div>

          <Space wrap>
            <Popover
              trigger="click"
              placement="rightBottom"
              content={
                <div className="content_delete_box">
                  <p>Вы уверены, что хотите удалить эту категория?</p>
                  <p>При удалений категорий вся информация принадлежащая <br /> данной категории будут удалены безвозратно</p>
                  <div className="btn_wrap_delete">
                    <button className="no_btn">
                      Нет
                    </button>
                    <button onClick={HandleDelete} id={elem.id} className="yes_btn">
                      да
                    </button>
                  </div>
                </div>
              }
              title={
                <div className="delete_box">
                  <i class='bx bxs-error-circle'></i>
                  <span>Удалите категория <span>{elem.title_ru}</span></span>
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

      ),
    });
  });

  const columns = [
    {
      title: "№",
      dataIndex: "data",
      key: "data",
      fixed: "left",
      align: "center",
      width: "50px"
    },

    {
      title: "Фото",
      dataIndex: "Фото",
      key: "Фото",
      fixed: "left",
      width: "50",
      align: "center",
    },
    {
      title: "Имя продукта",
      dataIndex: "имяпродукта",
      key: "имяпродукта",
      fixed: "left",

    },
    {
      title: "Вид изделия",
      dataIndex: "видизделия",
      key: "видизделия",

    },
    {
      title: "Комплектность",
      dataIndex: "комплектность",
      key: "комплектность",

    },
    {
      title: "Назначение",
      dataIndex: "назначение",
      key: "назначение",

    },
    {
      title: "Цвет",
      dataIndex: "цвет",
      key: "цвет",

    },
    {
      title: "Основная ткань",
      dataIndex: "основнаяткань",
      key: "основнаяткань",
      width: "200px",

    },
    {
      title: "Состав",
      dataIndex: "состав",
      key: "состав",

    },
    {
      title: "Гарантийный срок",
      dataIndex: "гарантийныйсрок",
      key: "гарантийныйсрок",
      width: "200px",


    },
    {
      title: "Действие",
      dataIndex: "Действие",
      key: "Действие",
      fixed: "right",
      align: 'center'
    },
  ];

  return (
    <>
      <TableCommon
        bordered
        columns={columns}
        data={data}
        pagination={false}
        scroll={{
          x: 1500,
          y: 320,
        }}
      />
    </>
  );
}
