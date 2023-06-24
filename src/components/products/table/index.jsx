import * as React from "react";
import { useSelector } from "react-redux";
import "./styles.css";
import TableCommon from "../../common/table";

export default function TableAdd({ onClickDelete, onClickPut, loadings }) {
  const productGetState = useSelector((state) => state.product);
  const productPost = useSelector((state) => state.product);
  const rows = productGetState.productGet?.data;

  // productPost.productPost.Success == true ? setLoadings(true) : setLoadings(false)

  const data = [];
  rows.map((elem, index) => {
    data.push({
      key: elem.id,
      data: index + 1,
      Имяпродукта: (
        <div>
          <span>{elem.title_uz}</span>
          <br />
          <span>{elem.title_ru}</span>
        </div>
      ),
      Видизделия: (
        <div>
          <span>{elem.product_type_uz}</span>
          <br />
          <span>{elem.product_type_ru}</span>
        </div>
      ),
      Комплектность: (
        <div>
          <span>{elem.completeness_uz}</span>
          <br />
          <span>{elem.completeness_ru}</span>
        </div>
      ),
      Назначение: (
        <div>
          <span>{elem.purpose_uz}</span>
          <br />
          <span>{elem.purpose_ru}</span>
        </div>
      ),
      Цвет: (
        <div>
          <span>{elem.color_uz}</span>
          <br />
          <span>{elem.color_ru}</span>
        </div>
      ),
      Основнаяткань: (
        <div>
          <span>{elem.main_fabric_uz}</span>
          <br />
          <span>{elem.main_fabric_ru}</span>
        </div>
      ),
      Состав: (
        <div>
          <span>{elem.compound_uz}</span>
          <br />
          <span>{elem.compound_ru}</span>
        </div>
      ),
      Гарантийныйсрок: (
        <div>
          <span>{elem.guarante_period_uz}</span>
          <br />
          <span>{elem.guarante_period_ru}</span>
        </div>
      ),
      Действие: (
        <div className="btn-wrap">
          <button onClick={onClickPut} id={elem.id}>
            <i id={elem.id} class="bx bx-message-square-edit"></i>
          </button>
          <button onClick={onClickDelete} id={elem.id}>
            <i id={elem.id} class="bx bxs-trash"></i>
          </button>
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
    },

    {
      title: "Имя продукта",
      dataIndex: "Имяпродукта",
      key: "Имяпродукта",
      fixed: "left",
    },
    {
      title: "Вид изделия",
      dataIndex: "Видизделия",
      key: "Видизделия",
    },
    {
      title: "Комплектность",
      dataIndex: "Комплектность",
      key: "Комплектность",
    },
    {
      title: "Назначение",
      dataIndex: "Назначение",
      key: "Назначение",
    },
    {
      title: "Цвет",
      dataIndex: "Цвет",
      key: "Цвет",
    },
    {
      title: "Основная ткань",
      dataIndex: "Основнаяткань",
      key: "Основнаяткань",
    },
    {
      title: "Состав",
      dataIndex: "Состав",
      key: "Состав",
    },
    {
      title: "Гарантийный срок",
      dataIndex: "Гарантийныйсрок",
      key: "Гарантийныйсрок",
      width: "200px",
    },
    {
      title: "Действие",
      dataIndex: "Действие",
      key: "Действие",
      fixed: "right",
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
          y: 330,
        }}
      />
    </>
  );
}
