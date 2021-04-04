import { CreditCard } from './creditCard';
import { Rental } from './rental';

export interface Payment {
  rental?: Rental;
  creditCard: CreditCard;
  amount?: number;
}
