import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { RouterData } from "./index-data";
import Header from "../components/Dashboard_Header/Dashboard_Header";
import Cookies from "universal-cookie";
import logo from "../assets/image/logocircle.png";
import "./styles.css";
import Sidebar from "../components/sidebar";
import { dataSidebar } from "../router/sidebar-data";

function RouterComponent() {
  const pathname = window.location.pathname;
  const cookies = new Cookies();
  return (
    <>
      {/* <div className="wrappers">
        <Suspense
          fallback={
            <div className="logo-wrap">
              <img src={logo} alt="" />
            </div>
          }
        >
          <div className="headers">
           
          </div>
          <div className="pages">
            <Routes>
              {RouterData.map((elem) => (
                <Route
                  key={elem.id}
                  path={elem.path}
                  element={elem.component}
                />
              ))}
            </Routes>
          </div>
        </Suspense>
      </div> */}
      <div className="big_wrap">
        <Suspense
          fallback={
            <div className="logo-wrap">
              <img src={logo} alt="" />
            </div>
          }
        >
          {/* {cookies.get("token") ? ( */}
            {/* <Sidebar> */}
              <Routes>
                {RouterData.map((elem) => (
                  <Route
                    key={elem.id}
                    path={elem.path}
                    element={elem.component}
                  />
                ))}
              </Routes>
            {/* </Sidebar> */}
          {/* ) : null} */}
        </Suspense>
      </div>
    </>
  );
}

export default RouterComponent;
