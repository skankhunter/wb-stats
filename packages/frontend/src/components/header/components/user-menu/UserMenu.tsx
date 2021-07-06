import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../services/auth.service";
import { useHistory } from "react-router";

import { Menu, Dropdown, Avatar } from "antd";
import {
   UserOutlined,
   LogoutOutlined,
   ProfileOutlined,
} from "@ant-design/icons";

import styles from "./styles.module.css";

export const UserMenu: React.FC = () => {
   // const auth = useAuth();
   const history = useHistory();

   const onClick = () => {
      // auth.signout().then(() => {
      //    history.push("/");
      // });
   };

   const menu = (
      <Menu>
         <Menu.Item key="1">
            <Link to="/profile">
               <ProfileOutlined />
               Профиль{" "}
            </Link>
         </Menu.Item>
         <Menu.Divider />
         <Menu.Item key="2" onClick={onClick}>
            <LogoutOutlined />
            Выйти
         </Menu.Item>
      </Menu>
   );
   return (
      <div>
         <Dropdown overlay={menu}>
            <Avatar size="large" icon={<UserOutlined />} />
         </Dropdown>
      </div>
   );
};
