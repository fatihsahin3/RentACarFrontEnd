import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../models/customer';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  apiUrl = 'https://localhost:44399/api/customers/';

  constructor(private httpClient: HttpClient) {}

  getCustomerDetails(): Observable<ListResponseModel<Customer>> {
    return this.httpClient.get<ListResponseModel<Customer>>(
      this.apiUrl + 'getcustomerdetails'
    );
  }

  getCustomerDetailsByEmail(
    email: string
  ): Observable<ListResponseModel<Customer>> {
    return this.httpClient.get<ListResponseModel<Customer>>(
      this.apiUrl + 'getcustomerdetailsbyemail?email=' + email
    );
  }

  getCustomerDetailsById(id: number): Observable<ListResponseModel<Customer>> {
    return this.httpClient.get<ListResponseModel<Customer>>(
      this.apiUrl + 'getcustomerdetailsbyid?id=' + id
    );
  }
}
