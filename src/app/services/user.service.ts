import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/ResponseModel';
import { User } from '../models/user';
import { UserDetailUpdateModel } from '../models/userDetailUpdateModel';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = 'https://localhost:44399/api/users/';

  constructor(private httpClient: HttpClient) {}

  updateUser(user: User): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'update', user);
  }

  updateUserDetails(
    userDetailUpdateModel: UserDetailUpdateModel
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'updateuserdetails',
      userDetailUpdateModel
    );
  }
}
