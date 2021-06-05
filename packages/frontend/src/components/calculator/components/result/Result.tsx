import React from "react";
import { Divider } from "antd";
import { toFixed } from "../../../../utils/calc";

import styles from "./styles.module.css";

type Props = {
   priceBeforeDiscount: number;
   allSumDiscounts: number;
   customerPrice: number;
   wbReward: number;
   salesByPayment: number;
   avgPriceShipment: number;
   accrualByOneUnit: number;
   finalProviderReward: number;
   ebitda: number;
   taxSum: number;
   ownRewardWithTax: number;
};

export const Result: React.FC<Props> = (props) => {
   const {
      priceBeforeDiscount,
      allSumDiscounts,
      customerPrice,
      wbReward,
      salesByPayment,
      avgPriceShipment,
      accrualByOneUnit,
      finalProviderReward,
      ebitda,
      taxSum,
      ownRewardWithTax,
   } = props;
   return (
      <>
         <Divider plain>
            <h2 className={styles.info_title}>Результаты расчета</h2>
         </Divider>
         <article className={styles.info}>
            <span className={styles.info_item}>
               Цена товара до скидок:
               <span className={styles.info_item_result}>
                  {toFixed(priceBeforeDiscount)}
               </span>
            </span>
            <span className={styles.info_item}>
               Сумма всех скидок:
               <span className={styles.info_item_result}>
                  {toFixed(allSumDiscounts)}
               </span>
            </span>
            <span className={styles.info_item}>
               Покупатель приобрел товар за:
               <span className={styles.info_item_result}>
                  {toFixed(customerPrice)}
               </span>
            </span>
            <span className={styles.info_item}>
               Вознаграждение Wildberries:
               <span className={styles.info_item_result}>
                  {toFixed(wbReward)}
               </span>
            </span>
            <span className={styles.info_item}>
               Продажи по оплатам:
               <span className={styles.info_item_result}>
                  {toFixed(salesByPayment)}
               </span>
            </span>
         </article>

         <h2 className={styles.info_title}>Коммерческие расчеты</h2>
         <article className={styles.info}>
            <span className={styles.info_item}>
               Среднестатистическая стоимость доставки:
               <span className={styles.info_item_result}>
                  {toFixed(avgPriceShipment)}
               </span>
            </span>
            <span className={styles.info_item}>
               Начисление с продажи одной единицы:
               <span className={styles.info_item_result}>
                  {toFixed(accrualByOneUnit)}
               </span>
            </span>
            <span className={styles.info_item}>
               Итоговое вознаграждение поставщика, с учетом всех выплат WB:
               <span className={styles.info_item_result}>
                  {toFixed(finalProviderReward)}
               </span>
            </span>
         </article>

         <h2 className={styles.info_title}>
            С продажи одной единицы товара Wildberries
         </h2>
         <article className={styles.info}>
            <span className={styles.info_item}>
               Валовая прибыль до вычета налогов (EBITDA):
               <span className={styles.info_item_result}>
                  {toFixed(ebitda)}
               </span>
            </span>
            <span className={styles.info_item}>
               Сумма налога, руб:
               <span className={styles.info_item_result}>
                  {toFixed(taxSum)}
               </span>
            </span>
            <span className={styles.info_item}>
               Вы заработали (после вычета налогов):
               <span className={styles.info_item_result}>
                  {toFixed(ownRewardWithTax)}
               </span>
            </span>
         </article>
      </>
   );
};
