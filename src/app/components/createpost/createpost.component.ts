import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginserviceService } from 'src/app/services/loginservice.service';
import { PostServiceService } from 'src/app/services/post-service.service';

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css']
})
export class CreatepostComponent implements OnInit {
  userID: string = '';
  title: string = '';
  body: string = '';
  image: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostServiceService,
    private loginService: LoginserviceService
  ) {}

  ngOnInit(): void {
   this.userID=this.loginService.getUserID() 
   
  }

  createPost() {
    const postData = {
      title: this.title,
      body: this.body,
      image: this.image
    };

    this.postService.createPost(postData).subscribe(
      (response) => {
        
        this.router.navigate(['/post',this.userID]);
      },
      (error) => {
        console.log(error);
      }
    );
    
  }
}
