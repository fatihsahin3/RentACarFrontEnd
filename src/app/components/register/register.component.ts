import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RegisterModel } from 'src/app/models/registerModel';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  registerModel: RegisterModel;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      companyName: [''],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  register() {
    if (this.registerForm.valid) {
      this.registerModel = Object.assign({}, this.registerForm.value);
      this.authService.register(this.registerModel).subscribe((response) => {
        if (response) {
          this.toastrService.success('Registration successful!');
          console.log('Response var!');
        } else {
          this.toastrService.error('Registration Failed!');
          console.log('Response yok!');
        }
      });
    } else {
      this.toastrService.error('Form data invalid!');
    }
  }
}
