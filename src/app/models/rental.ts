export interface Rental {
  id?: number;
  carId: number;
  brandName: string;
  customerId?: number;
  customerName: string;
  rentDate: Date;
  returnDate: Date;
}
