export interface CreditCard {
  id?: number;
  cardHolderName: string;
  cardNumber: number;
  cardCvv: number;
  expirationDate: string;
  currentCredit?: number;
}
