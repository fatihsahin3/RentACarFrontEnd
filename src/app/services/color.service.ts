import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ColorResponseModel } from '../models/colorResponseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  apiUrl = 'https://localhost:44399/api/colors/getall';

  constructor(private httpClient: HttpClient) {}

  getColors(): Observable<ColorResponseModel> {
    return this.httpClient.get<ColorResponseModel>(this.apiUrl);
  }
}
