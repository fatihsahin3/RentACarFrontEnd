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

@Component({
  selector: 'app-payment',
  template: '{{myRental}}',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  rental: Rental;
  creditCard: CreditCard;
  payment: Payment;
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
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['rental']) {
        this.rental = JSON.parse(params['rental']);
      }
    });

    this.createPaymentForm();
  }

  createPaymentForm() {
    this.paymentForm = this.formBuilder.group({
      cardHolderName: ['', Validators.required],
      cardNumber: ['', Validators.required],
      cardCvv: ['', Validators.required],
      expirationDate: ['', Validators.required],
    });
  }

  executePayment() {
    this.creditCard = Object.assign({}, this.paymentForm.value);

    this.payment = {
      rental: this.rental,
      creditCard: this.creditCard,
      amount: 100,
    };

    console.log(this.payment);

    this.paymentService.executePayment(this.payment).subscribe((response) => {
      if (response.success) {
        this.toastrService.success(response.message);
      } else {
        this.toastrService.error(response.message);
      }
    });
  }
}
