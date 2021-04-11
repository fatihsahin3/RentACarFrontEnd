import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarService } from 'src/app/services/car.service';
import { CarimageService } from 'src/app/services/carimage.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Rental } from 'src/app/models/rental';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/models/customer';
import { DatePipe } from '@angular/common';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { CreditScoreService } from 'src/app/services/credit-score.service';
import { CreditScore } from 'src/app/models/creditScore';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-cardetail',
  template: '<app-cardetail [myRental]="myRental"></app-cardetail>',
  templateUrl: './cardetail.component.html',
  styleUrls: ['./cardetail.component.css'],
})
export class CardetailComponent implements OnInit {
  cars: Car[] = [];
  car: Car;
  carId: number;
  customers: Customer[] = [];
  myRental: Rental;
  rentalForm: FormGroup;

  images: CarImage[] = [];
  imageUrl: string = 'https://localhost:44399';
  closeResult = '';
  rentDate: Date;
  returnDate: Date;
  activeCustomer: Customer;
  activeCustomerEmail: string;
  activeCustomerCreditScore: CreditScore;

  minDate: string | any;
  maxDate: string | null;
  firstDateSelected: boolean = false;

  constructor(
    private carService: CarService,
    private customerService: CustomerService,
    private carImageService: CarimageService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private toastrService: ToastrService,
    private router: Router,
    private datePipe: DatePipe,
    private formBuilder: FormBuilder,
    private creditScoreService: CreditScoreService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.createRentalForm();
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.carId = params['carId'];
        this.getCarDetailsByCarId(params['carId']);
        this.getCarImagesByCarId(params['carId']);
      }
    });

    this.customerService
      .getCustomerDetailsByEmail(this.localStorageService.get('email')!)
      .subscribe((response) => {
        this.activeCustomer = response.data[0];

        this.creditScoreService
          .getCreditScoreByCustomerId(this.activeCustomer.id)
          .subscribe((response) => {
            this.activeCustomerCreditScore = response.data;
          });
      });
  }

  createRentalForm() {
    this.rentalForm = this.formBuilder.group({
      rentDate: ['', Validators.required],
      returnDate: ['', Validators.required],
    });
  }

  getCarDetailsByCarId(carId: number) {
    this.carService.getCarDetails(carId).subscribe((response) => {
      this.cars = response.data;
    });
  }

  getCarImagesByCarId(carId: number) {
    this.carImageService.getCarImagesByCarId(carId).subscribe((response) => {
      this.images = response.data;
    });
  }

  getBack() {
    this.carService.getCars();
  }

  getSliderClassName(index: Number) {
    if (index == 0) {
      return 'carousel-item active';
    } else {
      return 'carousel-item';
    }
  }

  open(content: any) {
    if (
      this.activeCustomerCreditScore.creditScoreValue >=
      this.cars[0].minCreditScore
    ) {
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
        .result;
    } else {
      this.toastrService.error(
        'Your credit score is insufficient for this car!'
      );
    }
  }

  getRentMinDate() {
    this.minDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    return this.minDate;
  }

  getReturnMinDate() {
    if (this.rentDate != undefined) {
      let stringToDate = new Date(this.rentDate);
      let new_date = new Date();
      new_date.setDate(stringToDate.getDate() + 1);
      return new_date.toISOString().slice(0, 10);
    } else {
      return this.rentDate;
    }
  }
  getReturnMaxDate() {
    this.maxDate = this.datePipe.transform(
      new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      'yyyy-MM-dd'
    );
    return this.maxDate;
  }

  onChangeEvent(event: any) {
    this.minDate = event.target.value;
    this.firstDateSelected = true;
  }

  createRental() {
    this.car = this.cars[0];

    this.myRental = {
      carId: this.car.id,
      customerId: this.activeCustomer.id,
      rentDate: this.rentDate,
      returnDate: this.returnDate,
    };
    this.toastrService.success('You are being directed to payment page..');
    setTimeout(() => {
      this.router.navigate(['/payment/', JSON.stringify(this.myRental)]);
    }, 5000);
  }

  getCustomerDetails() {
    this.customerService.getCustomerDetails().subscribe((response) => {
      this.customers = response.data;
    });
  }

  getCreditScoreByCustomerId(customerId: number) {
    this.creditScoreService
      .getCreditScoreByCustomerId(customerId)
      .subscribe((response) => {
        this.activeCustomerCreditScore = response.data;
      });
  }
}
