import React, { useEffect, useState } from "react";
import HeaderTopCommon from "../../components/common/HeaderTop";
import { WrapperContainer } from "../../style-App";
import { CategoryGet } from "../../redux/category/index";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import CategoryAddComponent from "../../components/category_add";
import Sidebar from "../../components/sidebar";
function Category() {
  const categoryGetState = useSelector((state) => state.category);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(CategoryGet());
  }, []);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  return (
    <Sidebar>
      <WrapperContainer>
        <HeaderTopCommon
          title={"Категория"}
          onClick={handleOpen}
          textBtn={"Добавить категорию"}
        />
        <CategoryAddComponent handleClose={handleClose} open={open} />
      </WrapperContainer>
    </Sidebar>
  );
}
export default Category;
