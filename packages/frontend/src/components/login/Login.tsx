import React, { useState } from "react";
import { useAuth } from "../../services/auth.service";
import { useSelector } from "react-redux";
import { loading, selectLoadingStatus } from "../../slices/loginSlice";
import { useAppDispatch } from "../../store/hooks";
import { Link, useHistory } from "react-router-dom";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import styles from "./styles.module.css";
import { FIREBASE_ERRORS } from "../../utils/errors";

export type LoginFormData = {
   email: string;
   password: string;
};

const to = { pathname: "/dashboard" };

export const Login: React.FC = () => {
   const dispatch = useAppDispatch();
   const history = useHistory();
   // const auth = useAuth();
   const isLoading = useSelector(selectLoadingStatus);
   const [needRemember, setRemember] = useState(true);
   const [errorCode, setErrorCode] = useState('');

   const onFinish = (data: LoginFormData) => {
      const { email, password } = data;
      dispatch(loading(true));
      // auth.signin(email, password, needRemember).then(
      //    (userData) => {
      //       dispatch(loading(false));
      //       history.replace(to);
      //    },
      //    (error) => {
      //       dispatch(loading(false));
      //       setErrorCode(error.code)

      //       //error
      //       console.log(error);
      //    }
      // );
   };

   return (
      <div className={styles.login_form_wrapper}>
         <Form
            name="loginForm"
            className={styles.login_form}
            onFinish={onFinish}
         >
            <Form.Item
               name="email"
               validateStatus={errorCode && "error"}
               help={FIREBASE_ERRORS[errorCode]}
               rules={[
                  {
                     type: "email",
                     message: "Некорректный E-mail",
                  },
                  { required: true, message: "Введите email" },
               ]}
            >
               <Input prefix={<UserOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item
               name="password"
               validateStatus={errorCode && "error"}
               rules={[{ required: true, message: "Введите пароль" }]}
            >
               <Input
                  prefix={<LockOutlined />}
                  type="password"
                  placeholder="Password"
               />
            </Form.Item>
            <Form.Item>
               <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox onChange={() => setRemember((prev) => !prev)}>
                     Запомнить
                  </Checkbox>
               </Form.Item>

               <Link to="/reset">Забыл пароль</Link>
            </Form.Item>

            <Form.Item>
               <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  disabled={isLoading}
               >
                  Войти
               </Button>
               &nbsp;Или&nbsp;
               <Link to="/registration">Зарегистрироваться</Link>
            </Form.Item>
         </Form>
      </div>
   );
};
