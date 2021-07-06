import React, { useState } from "react";
import { Form, Input, Button, Result } from "antd";
import { useAuth } from "../../services/auth.service";
import { useAppDispatch } from "../../store/hooks";
import { useHistory } from "react-router-dom";
import { loading } from "../../slices/registrationSlice";

import { useFirebaseDatabase } from "../../services/firebase.service";
import { required } from "../../utils/validators";
import { ROLES } from "../../utils/roles";

import styles from "./styles.module.css";

type RegFormData = {
   email: string;
   username: string;
   password: string;
   firstName: string;
   lastName: string;
   patronymic?: string;
   phone?: string;
};

export const Registration: React.FC = () => {
   const dispatch = useAppDispatch();
   const history = useHistory();
   // const auth = useAuth();
   const database = useFirebaseDatabase();
   const [isRegSucceed, setRegSucceed] = useState(false);
   const [form] = Form.useForm();

   const onFinish = (data: RegFormData) => {
      const {
         username,
         email,
         phone,
         password,
         firstName,
         lastName,
         patronymic,
      } = data;
      const roles = [ROLES.USER];
      dispatch(loading(true));

      // auth
      //    .signup(email, password, username, phone)
      //    .then((user) => {
      //       dispatch(loading(false));
      //       setRegSucceed(true);
      //       return database.users(user.uid).set({
      //          username,
      //          password,
      //          email,
      //          firstName,
      //          lastName,
      //          patronymic: patronymic || null,
      //          phone,
      //          roles,
      //       });
      //    })
      //    .catch((error) => {
      //       dispatch(loading(false));

      //       console.log(error);
      //    });
   };

   return (
      <div className={styles.reg_form_wrapper}>
         {!isRegSucceed ? (
            <Form
               form={form}
               className={styles.reg_form}
               name="register"
               onFinish={onFinish}
               scrollToFirstError
            >
               <Form.Item
                  name="email"
                  label="E-mail"
                  rules={[
                     {
                        type: "email",
                        message: "Некорректный E-mail",
                     },
                     required("Введите E-mail"),
                  ]}
               >
                  <Input />
               </Form.Item>

               <Form.Item
                  name="password"
                  label="Пароль"
                  rules={[required("Введите пароль")]}
                  hasFeedback
               >
                  <Input.Password />
               </Form.Item>

               <Form.Item
                  name="confirm"
                  label="Повторите пароль"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                     required("Введите пароль ещё раз"),
                     ({ getFieldValue }) => ({
                        validator(_, value) {
                           if (!value || getFieldValue("password") === value) {
                              return Promise.resolve();
                           }
                           return Promise.reject(
                              new Error("Пароли не совпадают")
                           );
                        },
                     }),
                  ]}
               >
                  <Input.Password />
               </Form.Item>

               <Form.Item
                  name="username"
                  label="Псевдоним"
                  rules={[required("Введите псевдоним")]}
               >
                  <Input />
               </Form.Item>

               <Form.Item name="lastName" label="Фамилия" rules={[required()]}>
                  <Input />
               </Form.Item>
               <Form.Item name="firstName" label="Имя" rules={[required()]}>
                  <Input />
               </Form.Item>
               <Form.Item name="patronymic" label="Отчество">
                  <Input />
               </Form.Item>

               <Form.Item
                  name="phone"
                  label="Номер телефона"
                  rules={[
                     {
                        required: true,
                        message: "Введите пароль ещё раз",
                     },
                  ]}
               >
                  <Input addonBefore={"+7"} />
               </Form.Item>

               <Form.Item>
                  <Button type="primary" htmlType="submit">
                     Зарегистрироваться
                  </Button>
               </Form.Item>
            </Form>
         ) : (
            <Result
               status="success"
               title="Регистрация успешно прошла!"
               extra={[
                  <Button
                     type="primary"
                     key="console"
                     onClick={() => history.push("/dashboard")}
                  >
                     Dashboard
                  </Button>,
                  <Button key="buy" onClick={() => history.push("/")}>
                     На главную
                  </Button>,
               ]}
            />
         )}
      </div>
   );
};
