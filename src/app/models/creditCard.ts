export interface CreditCard {
  id?: number;
  customerId?: number;
  cardHolderName: string;
  cardNumber: string;
  cvv: string;
  expMonth: number;
  expYear: number;
  cardType: string;
  currentCredit?: number;
}
