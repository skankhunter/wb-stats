import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";

import styles from "./styles.module.css";
import { UserMenu } from "./components/user-menu/UserMenu";
import { useAuth } from "../../services/auth.service";
import { Link, useLocation } from "react-router-dom";

const { Header } = Layout;

export const HeaderLayout = () => {
   const [path, setPath] = useState('');
   // const auth = useAuth();
   const location = useLocation()

   useEffect(() => {
      setPath(location.pathname.split('/')[1])
   }, [location])

   return (
      <Header className={styles.header}>
         <div className={styles.logo} />
         {/* <Menu theme="dark" mode="horizontal" selectedKeys={[path]}>
            <Menu.Item key="dashboard">
               <Link to="/dashboard">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="calc">
               <Link to="/calc">Калькулятор</Link>
            </Menu.Item>
         </Menu> */}
         {/* {auth.user && <UserMenu />} */}
      </Header>
   );
};
