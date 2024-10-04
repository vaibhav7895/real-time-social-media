import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginserviceService } from 'src/app/services/loginservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  
  constructor(
    private loginService: LoginserviceService,
    private router: Router
  ) {}

  ngOnInit() {
    const token = this.loginService.getToken();
    
    const userID = this.loginService.getUserID();
    if (token && userID) {
      this.router.navigate(['/post', userID]);
    }
  }

  onLogin(form: NgForm) {
    if (form.valid) {
      const userData = form.value;
      this.loginService.login(userData).subscribe(
        (response) => {
          // console.log('Login successful', response);
          const token = response.token;
          const userID = response.user._id;
          this.loginService.setToken(token);
          this.loginService.setUserID(userID);

          alert('Login Successful');

          this.router.navigate(['/post', userID]);
        },
        (error) => {
          console.error('Login failed', error);
        }
      );
    }
  }

  

}
