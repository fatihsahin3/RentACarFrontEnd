import { Component, OnInit } from '@angular/core';
import { Rental } from 'src/app/models/rental';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { CarService } from 'src/app/services/car.service';
import { ToastrService } from 'ngx-toastr';
import { Payment } from 'src/app/models/payment';
import { CreditCard } from 'src/app/models/creditCard';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from 'src/app/services/payment.service';
import { Car } from 'src/app/models/car';

@Component({
  selector: 'app-payment',
  template: '{{myRental}}',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  cars: Car[] = [];
  rental: Rental;
  creditCard: CreditCard;
  payment: Payment;
  amountToPay: number;
  customerId: number;
  paymentForm: FormGroup;
  cardHolderName: string;
  cardNumber: number;
  cardCvv: number;
  expirationDate: string;

  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private paymentService: PaymentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['rental']) {
        this.rental = JSON.parse(params['rental']);
      }
    });
    this.createPaymentForm();
    this.getCarDetailsByCarId(this.rental.carId);
  }

  createPaymentForm() {
    this.paymentForm = this.formBuilder.group({
      cardHolderName: ['', Validators.required],
      cardNumber: ['', Validators.required],
      cardCvv: ['', Validators.required],
      expirationDate: ['', Validators.required],
    });
  }

  calculateAmount() {
    var date1 = new Date(this.rental.returnDate.toString());
    var date2 = new Date(this.rental.rentDate.toString());
    var difference = date1.getTime() - date2.getTime();
    var numberOfDays = Math.ceil(difference / (1000 * 3600 * 24));
    this.amountToPay = numberOfDays * this.cars[0].dailyPrice;
  }

  executePayment() {
    this.creditCard = Object.assign({}, this.paymentForm.value);

    this.payment = {
      rental: this.rental,
      creditCard: this.creditCard,
      amount: this.amountToPay,
    };

    this.paymentService.executePayment(this.payment).subscribe((response) => {
      if (response.success) {
        this.toastrService.success(response.message);
      } else {
        this.toastrService.error(response.message);
      }
    });

    setTimeout(() => {
      this.router.navigate(['']);
    }, 3000);
  }

  getCarDetailsByCarId(carId: number) {
    this.carService.getCarDetails(carId).subscribe((response) => {
      this.cars = response.data;
      this.calculateAmount();
    });
  }
}
