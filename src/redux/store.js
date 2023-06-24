import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./login/authSlice";
import AdminSlice from "./admin_add/index";
import ProjectsSlice from "./projects/index";
import ContactSlice from './contact/index';
import CategorySlice from './category/index'
import ProductSlice from './products/index'
export const store = configureStore({
  reducer: {
    admin: authSlice,
    adminadd: AdminSlice,
    projects: ProjectsSlice,
    contact: ContactSlice,
    category: CategorySlice,
    product: ProductSlice
  },
});