import React, { useState } from "react";
import { useFirebaseDatabase } from "../../services/firebase.service";
import { useAuth } from "../../services/auth.service";

import { Form, Input, Avatar, Button } from "antd";
import {
   MailOutlined,
   AntDesignOutlined,
   CheckCircleTwoTone,
   CloseCircleOutlined,
} from "@ant-design/icons";

import styles from "./styles.module.css";
import { getFormValues } from "../../utils/getters";

type FormProps = {
   email: string;
   firstName: string;
   lastName: string;
   patronymic: string;
   phone: string;
   wbAPIKey: string;
};

export const Profile: React.FC = () => {
   const [isDisabled, setDisabled] = useState(true);
   const [form] = Form.useForm();
   const database = useFirebaseDatabase();
   const { user, updateLocalUserData, updateEmail} = useAuth();
   const { email, firstName, lastName, patronymic, phone, wbAPIKey } = user;
   const initialValues = {
      email,
      firstName,
      lastName,
      patronymic,
      phone,
      wbAPIKey,
   };

   const onReset = () => {
      form.resetFields();
      setDisabled((prev) => !prev);
   };

   const onFinish = (data: FormProps) => {
      const values = getFormValues(data);
      if (values.email) {
         updateEmail(values.email)
      }
      
      database
         .users(user.uid)
         .update(values)
         .then(() => {
            updateLocalUserData();
            setDisabled((prev) => !prev);
         });
   };

   return (
      <div className={styles.profile_wrapper}>
         <Avatar
            className={styles.avatar}
            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
            icon={<AntDesignOutlined />}
         />
         <div className={styles.profile_form_wrapper}>
            <Form
               name="profileForm"
               form={form}
               className={styles.profile_form}
               initialValues={initialValues}
               onFinish={onFinish}
            >
               <Form.Item
                  name="email"
                  rules={[
                     {
                        type: "email",
                        message: "Некорректный E-mail",
                     },
                     { required: true, message: "Введите email" },
                  ]}
               >
                  <Input
                     disabled={isDisabled}
                     prefix={<MailOutlined />}
                     placeholder="Email"
                  />
               </Form.Item>
               <Form.Item name="lastName">
                  <Input disabled={isDisabled} placeholder="Фамилия" />
               </Form.Item>
               <Form.Item name="firstName">
                  <Input disabled={isDisabled} placeholder="Имя" />
               </Form.Item>
               <Form.Item name="patronymic">
                  <Input disabled={isDisabled} placeholder="Отчество" />
               </Form.Item>
               <Form.Item name="phone">
                  <Input disabled={isDisabled} placeholder="Телефон" />
               </Form.Item>
               <Form.Item name="wbAPIKey">
                  <Input disabled={isDisabled} placeholder="Ваш API Key x64" />
               </Form.Item>
               <Form.Item>
                  {!isDisabled && (
                     <>
                        <Button
                           type="primary"
                           size="large"
                           className={styles.submit_btn}
                           icon={<CheckCircleTwoTone />}
                           htmlType="submit"
                        />
                        <Button
                           size="large"
                           htmlType="button"
                           icon={<CloseCircleOutlined />}
                           onClick={onReset}
                        />
                     </>
                  )}
               </Form.Item>
            </Form>
            {isDisabled && (
               <Button
                  htmlType="button"
                  onClick={() => setDisabled((prev) => !prev)}
               >
                  Редактировать
               </Button>
            )}
         </div>
      </div>
   );
};
