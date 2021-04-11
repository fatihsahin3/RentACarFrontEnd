import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/ResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CreditCardService {
  apiUrl = 'https://localhost:44399/api/creditcards/';

  constructor(private httpClient: HttpClient) {}

  getCreditCards(): Observable<ListResponseModel<CreditCard>> {
    let newPath = this.apiUrl + 'getall';
    return this.httpClient.get<ListResponseModel<CreditCard>>(newPath);
  }

  getByCustomerId(
    customerId: number
  ): Observable<SingleResponseModel<CreditCard[]>> {
    let newPath = this.apiUrl + 'getbycustomerid?customerId=' + customerId;
    return this.httpClient.get<SingleResponseModel<CreditCard[]>>(newPath);
  }

  add(creditCard: CreditCard): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'add', creditCard);
  }
}
