import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {
  private loginUrl = 'https://social-media-app-1-uy0g.onrender.com/user/login'; 
  private logoutUrl = 'https://social-media-app-1-uy0g.onrender.com/user/logout'; 
 
  
  private isLoggedInSubject = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));

  constructor(private http: HttpClient,private router: Router) { }

  login(userData: any): Observable<any> {
    return this.http.post(this.loginUrl, userData);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
    this.isLoggedInSubject.next(true);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setUserID(userID: string) {
    localStorage.setItem('userID', userID);
  }

  getUserID(): string {
    return localStorage.getItem('userID') || "";
  }

  logoutUser() {
    // Send logout request to server
    this.http.post(this.logoutUrl, {}, {
      headers: { 'Authorization': `Bearer ${this.getToken()}` }
    }).subscribe(
      () => {
        localStorage.clear();  
        this.isLoggedInSubject.next(false);  
        this.router.navigate(['/login']);  
      },
      (error) => {
        console.error('Logout failed', error);  
      }
    );
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  
}
