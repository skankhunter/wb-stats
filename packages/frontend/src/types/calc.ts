export type CalcForm = {
   perReward: number;
   tariffLogistics: number;
   priceBeforeDiscount: number;
   costPrice: number;
   agreedDiscount: number;
   agreedPromoCode: number;
   agreedSPP: number;
   perBuyout: number;
   taxRate: number;
   taxSystem: number;
};

export type ResultForm = {
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