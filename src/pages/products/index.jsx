import React, { useEffect, useState } from "react";
import HeaderTopCommon from "../../components/common/HeaderTop";
import { WrapperContainer } from "../../style-App";
import { ProductGet } from "../../redux/products/index";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Sidebar from "../../components/sidebar";
import ProductsComponent from "../../components/products";

function Product() {
  const productGetState = useSelector((state) => state.product);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ProductGet());
  }, []);

  if (productGetState.productDelete.Success === true) {
    window.location.reload();
  }
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  return (
    <Sidebar>
      <WrapperContainer>
        <HeaderTopCommon
          title={"Продукт"}
          onClick={handleOpen}
          textBtn={"Добавить продукт"}
        />
        <ProductsComponent handleClose={handleClose} open={open} />
      </WrapperContainer>
    </Sidebar>
  );
}
export default Product;
