import { lazy } from "react";
import Cookies from "universal-cookie";

const Login = lazy(() => import("./../pages/login/index"))
const AddAdmin = lazy(() => import("./../pages/add_admin/index"))
const Contact = lazy(() => import("./../pages/contact/index"))
const Projects = lazy(() => import("./../pages/projects/index"))
const Category = lazy(() => import("../pages/category/index"))
const Product = lazy(() => import("../pages/products/index"))
const cookie = new Cookies();

export const RouterData = [
    {
        id : 1,
        path : "/",
        component :cookie.get("token") ? null : <Login/>
    },
    {
        id : 2,
        path : "/adminadd",
        component : cookie.get("token") ? <AddAdmin/> : null
    },
    {
        id : 3,
        path : "/contact",
        component : cookie.get("token") ? <Contact/> : null
    },
    {
        id : 4,
        path : "/projects",
        component : cookie.get("token") ? <Projects/> : null
    },
    {
        id : 5,
        path : "/category",
        component : cookie.get("token") ? <Category/> : null
    },
    {
        id : 6,
        path : "/product",
        component : cookie.get("token") ? <Product/> : null
    },
]