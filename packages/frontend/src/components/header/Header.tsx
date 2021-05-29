import React from "react";
import { Layout, Menu } from "antd";

import styles from "./styles.module.css";
import { UserMenu } from "./components/user-menu/UserMenu";
import { useAuth } from "../../services/auth.service";

const { Header } = Layout;

export const HeaderLayout = () => {
   const auth = useAuth();

   return (
      <Header className={styles.header}>
         <div className={styles.logo} />
         <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
         </Menu>
         {auth.user && <UserMenu />}
      </Header>
   );
};
