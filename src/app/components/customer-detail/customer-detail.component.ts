import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css'],
})
export class CustomerDetailComponent implements OnInit {
  activeCustomer: Customer;
  activeCustomerEmail: string;
  dataLoaded = false;

  constructor(
    private customerService: CustomerService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.getActiveCustomer();
  }

  getActiveCustomer() {
    this.getActiveCustomerEmail();
    this.customerService
      .getCustomerDetailsByEmail(this.activeCustomerEmail)
      .subscribe((response) => {
        this.activeCustomer = response.data[0];
      });
  }

  getActiveCustomerEmail() {
    this.activeCustomerEmail = this.localStorageService.get('email')!;
  }
}
