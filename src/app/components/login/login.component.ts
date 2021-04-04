import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  activeCustomer: Customer;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      let loginModel = Object.assign({}, this.loginForm.value);

      this.authService.login(loginModel).subscribe(
        (response) => {
          this.toastrService.info(response.message);
          localStorage.setItem('token', response.data.token);
          this.router.navigate(['']);
          this.customerService
            .getCustomerDetailsByEmail(loginModel.email)
            .subscribe((response) => {
              this.activeCustomer = response.data[0];
              localStorage.setItem(
                'activeCustomerName',
                this.activeCustomer.customerName
              );
              localStorage.setItem(
                'activeCustomerEmail',
                this.activeCustomer.email
              );
              console.log(this.activeCustomer);
            });
        },
        (responseError) => {
          this.toastrService.error(responseError.error);
        }
      );
    }
  }
}
