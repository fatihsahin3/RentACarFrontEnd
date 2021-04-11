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
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreditCardService } from 'src/app/services/credit-card.service';

@Component({
  selector: 'app-payment',
  template: '{{myRental}}',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  cars: Car[] = [];
  creditCards: CreditCard[] = [];
  rental: Rental;
  creditCard: CreditCard;
  payment: Payment;
  amountToPay: number;
  paymentForm: FormGroup;
  cardHolderName: string;
  cardNumber: string;
  cvv: string;
  expMonth: number;
  expYear: number;

  tableClass: string;

  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private paymentService: PaymentService,
    private router: Router,
    private modalService: NgbModal,
    private creditCardService: CreditCardService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['rental']) {
        this.rental = JSON.parse(params['rental']);
      }
    });
    this.createPaymentForm();
    this.getCarDetailsByCarId(this.rental.carId);
    this.getCreditCards();
  }

  createPaymentForm() {
    this.paymentForm = this.formBuilder.group({
      cardHolderName: ['', Validators.required],
      cardNumber: ['', Validators.required],
      cvv: ['', Validators.required],
      expMonth: ['', Validators.required],
      expYear: ['', Validators.required],
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
    /*this.creditCard = Object.assign({}, this.paymentForm.value);*/
    this.creditCard = {
      customerId: this.rental.customerId,
      cardHolderName: this.cardHolderName,
      cardNumber: this.cardNumber.toString(),
      cvv: this.cvv.toString(),
      expMonth: parseInt(this.expMonth.toString()),
      expYear: parseInt(this.expYear.toString()),
      cardType: 'Visa',
    };

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

  getCreditCards() {
    this.creditCardService
      .getByCustomerId(this.rental.customerId!)
      .subscribe((response) => {
        this.creditCards = response.data;
      });
  }

  saveCreditCard() {
    console.log(this.creditCard);
    this.creditCardService.add(this.creditCard).subscribe((response) => {
      if (response.success) {
        this.toastrService.success(response.message);
      } else {
        this.toastrService.error('Credit Card save failed!');
      }
    });
  }

  getSavedCreditCardsTableClass() {
    if (this.creditCards.length > 0) {
      this.tableClass = 'table';
    } else {
      this.tableClass = 'visually-hidden';
    }
  }

  fillCreditCardForm(creditCard: CreditCard) {
    this.cardHolderName = creditCard.cardHolderName;
    this.cardNumber = creditCard.cardNumber;
    this.cvv = creditCard.cvv;
    this.expMonth = creditCard.expMonth;
    this.expYear = creditCard.expYear;
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result;
  }
}
