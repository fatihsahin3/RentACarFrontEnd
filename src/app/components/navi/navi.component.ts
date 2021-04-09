import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})
export class NaviComponent implements OnInit {
  activeCustomer: Customer;
  activeCustomerEmail: string;
  buttonClass: string;
  userMenuClass: string;

  constructor(
    private localStorageService: LocalStorageService,
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getHtmlElementsClass();
    this.getActiveCustomer();
  }

  logout() {
    this.localStorageService.clear();
    this.router.navigate(['']);
    this.ngOnInit();
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

  getHtmlElementsClass() {
    if (this.localStorageService.get('token')) {
      this.buttonClass = 'visually-hidden';
      this.userMenuClass = 'btn btn-secondary dropdown-toggle';
    } else {
      this.buttonClass = 'btn btn-outline-success';
      this.userMenuClass = 'visually-hidden';
    }
  }

  routeToCustomerDetailPage() {
    this.router.navigate(['/customers/' + this.activeCustomer.id]);
  }
}
