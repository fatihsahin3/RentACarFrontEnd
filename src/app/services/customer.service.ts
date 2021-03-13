import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomerResponseModel } from '../models/customerResponseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  apiUrl = 'https://localhost:44399/api/customers/getcustomerdetails';

  constructor(private httpClient: HttpClient) {}

  getCustomerDetails(): Observable<CustomerResponseModel> {
    return this.httpClient.get<CustomerResponseModel>(this.apiUrl);
  }
}
