import React, { useState } from "react";
import {
   Button,
   Form,
   Slider,
   Typography,
   Input,
   Radio,
   Space,
   Row,
   Col,
} from "antd";
import { Result } from "./components/result/Result";
import { CalcForm } from "../../types/calc";
import {
   calcResult,
   marks,
   initialValuesForm,
   initialValuesResult,
} from "../../utils/calc";

import { Option } from "./components/option/Option";

import styles from "./styles.module.css";

const { Title, Paragraph } = Typography;

export const Calculator = () => {
   const [isResultVisible, setResultVisible] = useState(false);
   const [calcs, setCalcs] = useState(initialValuesResult);

   const onFinish = (data: CalcForm) => {
      setCalcs(calcResult(data));
      setResultVisible(true);
      window.scrollTo({
         top: 1000,
         behavior: "smooth",
      });
   };
   return (
      <div className={styles.calc_form_wrapper}>
         <Form
            name="calcForm"
            initialValues={initialValuesForm}
            onFinish={onFinish}
         >
            <Title level={3}>
               Выберите ниже условия, по которым Вы работаете с Wildberries
            </Title>
            <Option
               title="Процент вознаграждения Wildberries согласно Вашим условиям
               договора"
               hint="Укажите кГВА (коэффициент гарантированного вознаграждения) по
               договору"
            >
               <Form.Item name="perReward">
                  <Slider marks={marks} />
               </Form.Item>
            </Option>

            <Option
               title="Укажите тариф логистики, по которыму Вы работаете с Wildberries"
               hint={
                  <p>
                     Тип тарифа вы можете уточнить{" "}
                     <a
                        href="https://docs.google.com/spreadsheets/d/14nIZvwnT0YQkd3TELmx72CLLCQW4IyG50dQM9wB3wnI/edit?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                     >
                        в нашей Google таблице
                     </a>
                  </p>
               }
            >
               <Form.Item name="tariffLogistics">
                  <Input />
               </Form.Item>
            </Option>
            <h3 className={styles.title_sub}>
               Введите параметры вашего товара
            </h3>

            <Row gutter={64}>
               <Col span={12}>
                  <Option title="Розничная цена" description="Цена до скидки">
                     <Form.Item name="priceBeforeDiscount">
                        <Input />
                     </Form.Item>
                  </Option>
               </Col>
               <Col span={12}>
                  <Option
                     title="Себестоимость товара"
                     description="Стоимость одной единицы товара для вас"
                  >
                     <Form.Item name="costPrice">
                        <Input />
                     </Form.Item>
                  </Option>
               </Col>
            </Row>
            <Row gutter={16}>
               <Col span={8}>
                  <Option
                     title="Согласованная скидка"
                     hint="Укажите процент указанный для артикула в качестве 'Скидки' - если 'Скидки' нет укажите '0'"
                  >
                     <Form.Item name="agreedDiscount">
                        <Input />
                     </Form.Item>
                  </Option>
               </Col>
               <Col span={8}>
                  <Option
                     title="Согласованный промокод"
                     hint="Укажите процент указанный для артикула в качестве 'Промокода' - если 'Промокода' нет укажите '0'"
                  >
                     <Form.Item name="agreedPromoCode">
                        <Input />
                     </Form.Item>
                  </Option>
               </Col>
               <Col span={8}>
                  <Option
                     title="Согласованная СПП"
                     hint="Укажите процент указанный для артикула в качестве 'СПП' - если 'СПП' нет укажите '0'"
                  >
                     <Form.Item name="agreedSPP">
                        <Input />
                     </Form.Item>
                  </Option>
               </Col>
            </Row>

            <Option
               title="Процент выкупа на проверяемый артикул*"
               description="Если вы не знаете процент, то:

            - для одежды/обуви и всех категорий, которые требуют примерки - хорошим показатем считается 30%
            
            - для товара не требущего примерки рекомендуем устанавливать 70-80%"
               hint="* учитывается в расчетах для всех договоров с платной логистикой"
            >
               <Form.Item name="perBuyout">
                  <Slider marks={marks} />
               </Form.Item>
            </Option>

            <Paragraph>
               * будем считать, что СПП = 0% - рекомендуем устанавливать данный
               показатель на уровне 0, чтобы избежать непрогнозируемого
               колебания, ** оплата за хранение (новые условия) - рассчитывается
               отдельно
            </Paragraph>

            <h3 className={styles.title_sub}>
               Выберите систему налогообложения
            </h3>

            <Row gutter={64}>
               <Col span={12}>
                  <Option title="Ставка налога, %">
                     <Form.Item name="taxRate">
                        <Input />
                     </Form.Item>
                  </Option>
               </Col>
               <Col span={12}>
                  <Option title="Система налогообложения">
                     <Form.Item name="taxSystem">
                        <Radio.Group>
                           <Space direction="vertical">
                              <Radio value={1}>Доходы</Radio>
                              <Radio value={2}>Доходы - Расходы</Radio>
                           </Space>
                        </Radio.Group>
                     </Form.Item>
                  </Option>
               </Col>
            </Row>

            <Button
               type="primary"
               size="large"
               className={styles.submit_btn}
               htmlType="submit"
            >
               Посчитать
            </Button>
         </Form>
         {isResultVisible && <Result {...calcs} />}
      </div>
   );
};
