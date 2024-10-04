import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupserviceService } from 'src/app/services/signupservice.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private signupService: SignupserviceService,private router: Router ) { }

  onSignup(form: NgForm) {
    if (form.valid) {
      const userData = form.value; 
      this.signupService.signup(userData).subscribe(
        response => {
       
          alert("Signup successful")
          form.reset();
          this.router.navigate(['/login']);
          
        },
        error => {
          console.error('Signup failed', error);
          
        }
      );
    }
  }
}
