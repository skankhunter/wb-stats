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
   const auth = useAuth();
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

      auth
         .signup(email, password, username, phone)
         .then((user) => {
            dispatch(loading(false));
            setRegSucceed(true);
            return database.users(user.uid).set({
               username,
               password,
               email,
               firstName,
               lastName,
               patronymic: patronymic || null,
               phone,
               roles,
            });
         })
         .catch((error) => {
            dispatch(loading(false));

            console.log(error);
         });
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
                        message: "???????????????????????? E-mail",
                     },
                     required("?????????????? E-mail"),
                  ]}
               >
                  <Input />
               </Form.Item>

               <Form.Item
                  name="password"
                  label="????????????"
                  rules={[required("?????????????? ????????????")]}
                  hasFeedback
               >
                  <Input.Password />
               </Form.Item>

               <Form.Item
                  name="confirm"
                  label="?????????????????? ????????????"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                     required("?????????????? ???????????? ?????? ??????"),
                     ({ getFieldValue }) => ({
                        validator(_, value) {
                           if (!value || getFieldValue("password") === value) {
                              return Promise.resolve();
                           }
                           return Promise.reject(
                              new Error("???????????? ???? ??????????????????")
                           );
                        },
                     }),
                  ]}
               >
                  <Input.Password />
               </Form.Item>

               <Form.Item
                  name="username"
                  label="??????????????????"
                  rules={[required("?????????????? ??????????????????")]}
               >
                  <Input />
               </Form.Item>

               <Form.Item name="lastName" label="??????????????" rules={[required()]}>
                  <Input />
               </Form.Item>
               <Form.Item name="firstName" label="??????" rules={[required()]}>
                  <Input />
               </Form.Item>
               <Form.Item name="patronymic" label="????????????????">
                  <Input />
               </Form.Item>

               <Form.Item
                  name="phone"
                  label="?????????? ????????????????"
                  rules={[
                     {
                        required: true,
                        message: "?????????????? ???????????? ?????? ??????",
                     },
                  ]}
               >
                  <Input addonBefore={"+7"} />
               </Form.Item>

               <Form.Item>
                  <Button type="primary" htmlType="submit">
                     ????????????????????????????????????
                  </Button>
               </Form.Item>
            </Form>
         ) : (
            <Result
               status="success"
               title="?????????????????????? ?????????????? ????????????!"
               extra={[
                  <Button
                     type="primary"
                     key="console"
                     onClick={() => history.push("/dashboard")}
                  >
                     Dashboard
                  </Button>,
                  <Button key="buy" onClick={() => history.push("/")}>
                     ???? ??????????????
                  </Button>,
               ]}
            />
         )}
      </div>
   );
};
