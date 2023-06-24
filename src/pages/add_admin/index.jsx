import React, { useEffect, useState } from "react";
import HeaderTopCommon from "../../components/common/HeaderTop";
import { WrapperContainer } from "../../style-App";
import { adminGet } from "../../redux/admin_add/index";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Sidebar from "../../components/sidebar";
import AdminAddComponent from "../../components/admin_add";
function AddAdmin() {
  const adminGetState = useSelector((state) => state.adminadd);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(adminGet());
  }, []);

  if (adminGetState.AdminDelete.Success === true) {
    window.location.reload();
  }
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  return (
    <Sidebar>
      <WrapperContainer>
        <HeaderTopCommon
          title={"Админ"}
          onClick={handleOpen}
          textBtn={"Админ добавить"}
        />
        <AdminAddComponent handleClose={handleClose} open={open} />
      </WrapperContainer>
    </Sidebar>
  );
}
export default AddAdmin;
