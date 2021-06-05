import { CalcForm, ResultForm } from "../types/calc";

export const marks = {
   0: "0",
   10: "10",
   20: "20",
   30: "30",
   40: "40",
   50: "50",
   60: "60",
   70: "70",
   80: "80",
   90: "90",
   100: "100",
};

export const initialValuesForm: CalcForm = {
   perReward: 19,
   tariffLogistics: 20,
   priceBeforeDiscount: 1000,
   costPrice: 50,
   agreedDiscount: 0,
   agreedPromoCode: 0,
   agreedSPP: 0,
   perBuyout: 80,
   taxRate: 7,
   taxSystem: 1,
};

export const initialValuesResult: ResultForm = {
   priceBeforeDiscount: 0,
   allSumDiscounts: 0,
   customerPrice: 0,
   wbReward: 0,
   salesByPayment: 0,
   avgPriceShipment: 0,
   accrualByOneUnit: 0,
   finalProviderReward: 0,
   ebitda: 0,
   taxSum: 0,
   ownRewardWithTax: 0,
};

export const toFixed = (number: string | number) => {
   return Number(number).toFixed(2);
};

export const calcResult = (data: CalcForm) => {
   const {
      perReward,
      priceBeforeDiscount,
      agreedDiscount,
      agreedPromoCode,
      agreedSPP,
      perBuyout,
      costPrice,
      tariffLogistics,
      taxRate,
   } = data;
   const allSumDiscounts =
      priceBeforeDiscount * agreedDiscount * 0.01 +
      (priceBeforeDiscount - priceBeforeDiscount * agreedDiscount * 0.01) *
         agreedPromoCode *
         0.01 +
      (priceBeforeDiscount -
         (priceBeforeDiscount * agreedDiscount * 0.01 +
            (priceBeforeDiscount -
               priceBeforeDiscount * agreedDiscount * 0.01) *
               agreedPromoCode *
               0.01)) *
         agreedSPP *
         0.01;
   const customerPrice = priceBeforeDiscount - allSumDiscounts;
   const wbReward =
      customerPrice -
      (priceBeforeDiscount -
         (priceBeforeDiscount * agreedDiscount * 0.01 +
            (priceBeforeDiscount -
               priceBeforeDiscount * agreedDiscount * 0.01) *
               agreedPromoCode *
               0.01)) *
         agreedSPP *
         0.01 -
      (customerPrice -
         (priceBeforeDiscount -
            (priceBeforeDiscount * agreedDiscount * 0.01 +
               (priceBeforeDiscount -
                  priceBeforeDiscount * agreedDiscount * 0.01) *
                  agreedPromoCode *
                  0.01)) *
            agreedSPP *
            0.01 *
            perReward *
            0.01);
   const salesByPayment = customerPrice - wbReward;
   const avgPriceShipment =
      (perBuyout * tariffLogistics +
         (100 - perBuyout) * (tariffLogistics * 2 + 33)) *
      0.01;
   const accrualByOneUnit = salesByPayment - avgPriceShipment;
   const finalProviderReward = accrualByOneUnit;
   const ebitda = accrualByOneUnit - costPrice;
   const taxSum = accrualByOneUnit * taxRate * 0.01;
   const ownRewardWithTax = ebitda - taxSum;

   return {
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
   };
};
