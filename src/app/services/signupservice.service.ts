import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupserviceService {

  private signupUrl = 'https://social-media-app-1-uy0g.onrender.com/user/register'; 

  constructor(private http: HttpClient) { }

  signup(userData: any): Observable<any> {
    return this.http.post(this.signupUrl, userData);
  }
}
