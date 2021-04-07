import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditScore } from '../models/creditScore';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CreditScoreService {
  apiUrl = 'https://localhost:44399/api/creditscores/';

  constructor(private httpClient: HttpClient) {}

  getCreditScores(): Observable<ListResponseModel<CreditScore>> {
    let newPath = this.apiUrl + 'getall';
    return this.httpClient.get<ListResponseModel<CreditScore>>(newPath);
  }

  getCreditScoreByCustomerId(
    customerId: number
  ): Observable<SingleResponseModel<CreditScore>> {
    let newPath = this.apiUrl + 'getbycustomerid?customerId=' + customerId;
    return this.httpClient.get<SingleResponseModel<CreditScore>>(newPath);
  }
}
