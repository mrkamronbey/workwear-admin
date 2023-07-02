import React, { useEffect, useState } from "react";
import HeaderTopCommon from "../../components/common/HeaderTop";
import { WrapperContainer } from "../../style-App";
import { useDispatch } from "react-redux";
import Sidebar from "../../components/sidebar";
import ContactComponent from "../../components/contact/index";
import { GetContact } from "../../redux/contact/index";
import HorizontalSidebar from "../../components/horizontal-sidebar";
function Partner() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetContact());
  }, []);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  return (
    <HorizontalSidebar>
      <WrapperContainer style={{marginTop: '112px'}}>
        <HeaderTopCommon title={"Контакт"} onClick={handleOpen} isBtn={false} />
        <ContactComponent handleClose={handleClose} open={open} />
      </WrapperContainer>
    </HorizontalSidebar>
  );
}
export default Partner;
