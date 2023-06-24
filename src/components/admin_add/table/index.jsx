import * as React from "react";
import { useSelector } from "react-redux";
import TableCommon from "../../common/table";
import "./styles.css"


export default function TableAdd({ onClickDelete, onClickPut }) {
  const adminGetState = useSelector((state) => state.adminadd);
  const rows = adminGetState.userGet?.data;

  const data = [];
  rows.map((elem, index) => {
    data.push({
      data: index + 1,
      key: elem.id,
      Имя: elem.name,
      Элпочта: elem.email,
      Действие: (
        <div className="btn-wrap">
          {/* <button onClick={onClickPut} id={elem.id}>
            <i id={elem.id} class="bx bx-message-square-edit"></i>
          </button> */}
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
      width: 50,
      align: "center",
    },
    {
      title: "Имя",
      dataIndex: "Имя",
      key: "Имя",
    },
    {
      title: "Эл. почта",
      dataIndex: "Элпочта",
      key: "Элпочта",
    },
    {
      title: "Действие",
      dataIndex: "Действие",
      key: "Действие",
    },
  ];
  return (
    <TableCommon
      bordered
      columns={columns}
      data={data}
      pagination={false}
      scroll={{
        y: 330,
      }}
    />
  );
}
