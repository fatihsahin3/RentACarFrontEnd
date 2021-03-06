import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RentalComponent } from './components/rental/rental.component';
import { CarComponent } from './components/car/car.component';
import { CustomerComponent } from './components/customer/customer.component';
import { MainpageComponent } from './components/mainpage/mainpage.component';
import { CardetailComponent } from './components/cardetail/cardetail.component';
import { PaymentComponent } from './components/payment/payment.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorComponent } from './components/color/color.component';
import { BrandComponent } from './components/brand/brand.component';
import { LoginComponent } from './components/login/login.component';
import { LoginGuard } from './guards/login.guard';
import { RegisterComponent } from './components/register/register.component';
import { CustomerDetailComponent } from './components/customer-detail/customer-detail.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: CarComponent },
  { path: 'cars', component: CarComponent },
  { path: 'brands', component: BrandComponent },
  { path: 'colors', component: ColorComponent },
  { path: 'rentals', component: RentalComponent },
  { path: 'cars/brand/:brandId', component: CarComponent },
  { path: 'cars/color/:colorId', component: CarComponent },
  { path: 'customers', component: CustomerComponent },
  { path: 'customers/:id', component: CustomerDetailComponent },
  {
    path: 'cars/details/:carId',
    component: CardetailComponent,
    canActivate: [LoginGuard],
  },
  { path: 'cars/rent/:carId', component: CardetailComponent },
  { path: 'payment/:rental', component: PaymentComponent },
  { path: 'cars/add', component: CarAddComponent, canActivate: [LoginGuard] },
  { path: 'brands/add', component: BrandAddComponent },
  { path: 'colors/add', component: ColorAddComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
