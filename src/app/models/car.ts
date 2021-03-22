import { CarImage } from './carImage';

export interface Car {
  id: number;
  brandId: number;
  brandName: string;
  colorId: number;
  colorName: string;
  carName: string;
  modelYear: number;
  dailyPrice: number;
  description: string;
}
