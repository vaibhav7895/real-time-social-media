import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginserviceService } from 'src/app/services/loginservice.service';
import { PostServiceService } from 'src/app/services/post-service.service';

@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.css'],
})
export class EditpostComponent implements OnInit {
  userID: string = '';
  title: string = '';
  body: string = '';
  image: string = '';
  postID: string = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostServiceService,
    private loginService: LoginserviceService
  ) {}

  ngOnInit(): void {
    this.userID = this.loginService.getUserID();

    this.route.paramMap.subscribe((params) => {
      this.postID = params.get('postID') || '';
      
    });
  }

  editPost() {
    const postData = {
      title: this.title,
      body: this.body,
      image: this.image,
    };

    this.postService.editPost(postData, this.postID).subscribe(
      (response) => {
      
        this.router.navigate(['/post', this.userID]);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
