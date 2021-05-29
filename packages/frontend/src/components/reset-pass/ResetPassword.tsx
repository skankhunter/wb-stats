import React, { useState } from "react";

import { useAuth } from "../../services/auth.service";
import { useHistory } from "react-router-dom";

import { Button, Form, Input, Result } from "antd";
import { FIREBASE_ERRORS } from "../../utils/errors";
import { required } from "../../utils/validators";

import styles from "./styles.module.css";

export const ResetPassword = () => {
   const [succeed, setSucceed] = useState(false);
   const [errorMessage, setErrorMessage] = useState("");
   const history = useHistory();
   const { sendPasswordResetEmail } = useAuth();

   const onFinish = ({ email }) => {
      sendPasswordResetEmail(email)
         .then(() => {
            setSucceed(true);
         })
         .catch((error) => {
            setErrorMessage(FIREBASE_ERRORS[error.code]);
         });
   };

   return (
      <>
         <h1 className={styles.title}>
            На указанную Вами почту придёт письмо с ссылкой на смену пароля
         </h1>
         {!succeed ? (
            <Form
               className={styles.reset_form_wrapper}
               name="resetPassForm"
               onFinish={onFinish}
            >
               <Form.Item
                  validateStatus={errorMessage && "error"}
                  help={errorMessage}
                  name="email"
                  rules={[
                     {
                        type: "email",
                        message: "Некорректный E-mail",
                     },
                     required("Введите email"),
                  ]}
               >
                  <Input placeholder="Введите email" />
               </Form.Item>
               <Form.Item>
                  <Button type="primary" htmlType="submit">
                     Отправить письмо
                  </Button>
               </Form.Item>
            </Form>
         ) : (
            <Result
               status="success"
               title="Письмо успешно отправлено"
               extra={[
                  <Button key="to_main" onClick={() => history.push("/")}>
                     На главную
                  </Button>,
               ]}
            />
         )}
      </>
   );
};
