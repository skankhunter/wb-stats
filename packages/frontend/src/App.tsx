import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { protectedRoutes, routes, RouteWithSubRoutes } from "./router/routes";
import isLoadingHoc from "./components/errors-boundary/Loading";

import { useAuth } from "./services/auth.service";
import { HeaderLayout } from "./components/header/Header";
import { Layout } from "antd";
import { Sidebar } from "./components/dashboard/components/sider/Sider";

import { Page403 } from "./components/errors-boundary/403";
import { Page404 } from "./components/errors-boundary/404";

import "antd/dist/antd.css";
import styles from "./styles.module.css";
import { Calculator } from "./components/calculator/Calculator";

type ComponentProps = {};

const App: React.FC<ComponentProps> = () => {
   // const auth = useAuth();
   // const isAuthenticated = auth.user;

   return (
      <div className="App">
         <BrowserRouter>
            <Layout>
               <HeaderLayout />
               <Layout className={styles.content_wrapper}>
                  <Calculator/>
               </Layout>
            </Layout>
         </BrowserRouter>
      </div>
   );
};

export default isLoadingHoc(App, "Loading...");
