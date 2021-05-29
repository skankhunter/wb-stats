import React, { useState } from "react";
import { Switch } from "react-router-dom";

import { Layout } from "antd";
import { RouteWithSubRoutes } from "../../router/routes";

import styles from "./styles.module.css";

const { Content } = Layout;

export const Dashboard = ({ routes }) => {
   return (
      <Content className={styles.content}>
         12312
         <Switch>
            {routes.map((route, i) => (
               <RouteWithSubRoutes key={i} {...route} />
            ))}
         </Switch>
      </Content>
   );
};
