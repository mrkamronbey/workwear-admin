import React, { useEffect, useState } from "react";
import HeaderTopCommon from "../../components/common/HeaderTop";
import { WrapperContainer } from "../../style-App";
import { ProductGet } from "../../redux/products/index";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Sidebar from "../../components/sidebar";
import ProductsComponent from "../../components/products";
import HorizontalSidebar from "../../components/horizontal-sidebar";

function Product() {
  const productGetState = useSelector((state) => state.product);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ProductGet());
  }, []);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  if (productGetState.productDelete.Success === true) {
    window.location.reload();
  }
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  return (
    <HorizontalSidebar>
        <WrapperContainer style={{marginTop: "112px"}}>
          <HeaderTopCommon
            title={"Продукт"}
            onClick={showDrawer}
            textBtn={"Добавить продукт"}
          />
          <ProductsComponent handleClose={onClose} open={open} />
        </WrapperContainer>
    </HorizontalSidebar>
  );
}
export default Product;
