import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { UserDetailUpdateModel } from 'src/app/models/userDetailUpdateModel';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css'],
})
export class CustomerDetailComponent implements OnInit {
  customers: Customer[] = [];
  activeCustomer: Customer;
  activeCustomerEmail: string;
  activeCustomerName: string;
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  currentPassword: string;
  newPassword: string;
  dataLoaded = false;
  customerDetailsForm: FormGroup;

  constructor(
    private customerService: CustomerService,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getActiveCustomer();
    this.createCustomerDetailsForm();
  }

  createCustomerDetailsForm() {
    this.customerDetailsForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      companyName: ['', Validators.required],
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
    });
  }

  getActiveCustomer() {
    if (this.localStorageService.get('email') !== null) {
      this.activeCustomerEmail = this.localStorageService.get('email')!;

      this.customerService
        .getCustomerDetailsByEmail(this.activeCustomerEmail)
        .subscribe((response) => {
          this.customers = response.data;
          this.activeCustomer = this.customers[0];
          this.firstName = this.activeCustomer.firstName;
          this.lastName = this.activeCustomer.lastName;
          this.email = this.activeCustomer.email;
          this.companyName = this.activeCustomer.companyName;
        });
    }
  }

  updateCustomerDetails() {
    let userDetailUpdateModel: UserDetailUpdateModel = {
      id: this.activeCustomer.userId,
      customerId: this.activeCustomer.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      companyName: this.companyName,
      currentPassword: this.currentPassword,
      newPassword: this.newPassword,
    };

    this.userService
      .updateUserDetails(userDetailUpdateModel)
      .subscribe((response) => {
        if (response.success) {
          this.toastrService.success('User updated!');
        } else {
          this.toastrService.error('User Update Failed!');
        }
      });
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result;
    console.log(this.activeCustomer.userId);
  }
}
