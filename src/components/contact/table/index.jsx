import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { PostContact } from "../../../redux/contact";
import TableCommon from "../../common/table";
import './styles.css'
export default function TableAdd({ onClickDelete }) {
  const ContactGetState = useSelector(
    (state) => state.contact.getContact?.Data
  );
  const dispatch = useDispatch();
  const DateFormat = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join("/");
  };

  React.useEffect(() => {
    dispatch(PostContact());
  }, []);

  const data = [];
  ContactGetState.map((elem, index) => {
    data.push({
      data: index + 1,
      key: elem.id,
      Имя: elem.name,
      Телефонныйномер: elem.phone_number,
      Времяденьмесяцгод: DateFormat(elem.createdAt),
      Действие: (
        <div className="btn-wrap">
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
      fixed: "left",
    },
    {
      title: "Телефонный номер",
      dataIndex: "Телефонныйномер",
      key: "Телефонныйномер",
    },
    {
      title: "Время/день/месяц/год",
      dataIndex: "Времяденьмесяцгод",
      key: "Времяденьмесяцгод",
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
          y: 330,
        }}
      />
    </>
  );
}
