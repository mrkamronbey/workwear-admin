import * as React from "react";
import "./styles.css";
import TableCommon from "../../common/table";
import { useSelector } from "react-redux";
import { Image } from 'antd';
import { Popover, Tooltip, Space } from 'antd';



export default function TableAdd({ HandleDelete, onClickPut }) {
  const newsGetState = useSelector((state) => state.news);
  const rows = newsGetState.newsGet?.data;
  const data = [];
  rows.map((elem, index) => {
    data.push({
      data: index + 1,
      Фото: <Image
        width={60}
        height="100%"
        style={{ aspectRatio: "1 / 1", borderRadius: "20px", objectFit: "cover" }}
        src={elem.image}
      />,
      key: elem.id,
      Темаузб: (
        <Tooltip overlayInnerStyle={{
          width: "500px", height: "100%", borderRadius: "20px",
          padding: "15px"
        }} color="#1fab8a" title={
          <div className="tooltip_box">
            <span><span>{elem.title_uz}</span></span>
          </div>
        }>
          <span className="curson">{elem.title_uz.slice(0, 22)}...</span>
        </Tooltip>
      ),
      Темарусский: (
        <Tooltip overlayInnerStyle={{
          width: "500px", height: "100%", borderRadius: "20px",
          padding: "15px"
        }} color="#1fab8a" title={
          <div className="tooltip_box">
            <span><span>{elem.title_ru}</span></span>
          </div>
        }>
          <span className="curson">{elem.title_ru.slice(0, 22)}...</span>
        </Tooltip>
      ),
      Темаен: (
        <Tooltip  overlayInnerStyle={{
          width: "500px", height: "100%", borderRadius: "20px",
          padding: "15px"
        }} color="#1fab8a" title={
          <div className="tooltip_box">
            <span><span>{elem.title_en}</span></span>
          </div>
        }>
          <span className="curson">{elem.title_en.slice(0, 22)}...</span>
        </Tooltip>
      ),
      Описаниеuz: (
        <Tooltip  overlayInnerStyle={{
          width: "500px", height: "100%", borderRadius: "20px",
          padding: "15px"
        }} color="#1fab8a" title={
          <div className="tooltip_box">
            <span><span>{elem.description_uz}</span></span>
          </div>
        }>
          <span className="curson">
            {elem.description_uz.slice(0, 22)}...
          </span>
        </Tooltip>
      ),
      Описаниеru: (
        <Tooltip overlayInnerStyle={{
          width: "500px", height: "100%", borderRadius: "20px",
          padding: "15px"
        }} color="#1fab8a" title={
          <div className="tooltip_box">
            <span><span>{elem.description_ru}</span></span>
          </div>
        }>
          <span className="curson">{elem.description_ru.slice(0, 22)}...</span>
        </Tooltip>
      ),
      Описаниеen: (
        <Tooltip overlayInnerStyle={{
          width: "500px", height: "100%", borderRadius: "20px",
          padding: "15px"
        }} color="#1fab8a" title={
          <div className="tooltip_box">
            <span><span>{elem.description_en}</span></span>
          </div>
        }>
          <span className="curson">{elem.description_en.slice(0, 22)}...</span>
        </Tooltip>
      ),
      Ссылка: (
        <Tooltip placement="left" color="#1fab8a" title={
          <div className="tooltip_box">
            < a style={{ color: "#fff" }} href={elem.link} > {elem.link}</ a>
          </div>
        }>
          <span className="curson">{elem.link.slice(0, 20)}...</span>
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
                  <p>Вы уверены, что хотите удалить эту новости?</p>
                  <div className="btn_wrap_delete">
                    <button onClick={HandleDelete} id={elem.id} className="yes_btn">
                      Удалить
                    </button>
                  </div>
                </div>
              }
              title={
                <div className="delete_box">
                  <i class='bx bxs-error-circle'></i>
                  <span>Удалите новости <span>{elem.title_ru.slice(0,20)}...</span></span>
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
      width: 50,
      align: "center",
      fixed: 'left'
    },
    {
      title: "Фото",
      dataIndex: "Фото",
      key: "Фото",
      align: "center",
      fixed: 'left'
    },
    {
      title: "Тема узб",
      dataIndex: "Темаузб",
      key: "Темаузб",
      width: 300
    },
    {
      title: "Тема рус",
      dataIndex: "Темарусский",
      key: "Темарусский",
      width: 300
    },
    {
      title: "Тема ен",
      dataIndex: "Темаен",
      key: "Темаен",
      width: 300
    },
    {
      title: "Описаниеuz",
      dataIndex: "Описаниеuz",
      key: "Описаниеuz",
      width: 300
    },
    {
      title: "Описаниеru",
      dataIndex: "Описаниеru",
      key: "Описаниеru",
      width: 300
    },
    {
      title: "Описаниеen",
      dataIndex: "Описаниеen",
      key: "Описаниеen",
      width: 300
    },
    {
      title: "Ссылка",
      dataIndex: "Ссылка",
      key: "Ссылка",
      width: 300
    },
    {
      title: "Действие",
      dataIndex: "Действие",
      key: "Действие",
      fixed: "right",
      align: "center",
    },
  ];



  return (
    <TableCommon
      bordered
      scroll={{
        y: 330,
        x: 2000
      }}
      columns={columns}
      data={data}
      pagination={false}
    />
  );
}
