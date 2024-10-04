import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginserviceService } from 'src/app/services/loginservice.service';
import { PostServiceService } from 'src/app/services/post-service.service';
import { SocketService } from 'src/app/services/socket-service.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  buttontext: string = '';
  userID: string = '';
  user: any = '';
  showModal: boolean = false; // Modal visibility
  newNotification: boolean = false; // New notification flag
  notifications: string[] = []; // List of notifications

  constructor(
    private loginService: LoginserviceService,
    private postService: PostServiceService,
    private router: Router,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    this.loginService.isLoggedIn().subscribe((isLoggedIn) => {
      this.buttontext = isLoggedIn ? 'Logout' : 'Login';

      if (isLoggedIn) {
        this.userID = this.loginService.getUserID();
        this.getNewuser();

    

        this.listenForNotifications();
      }
    });
  }

  getNewuser() {
    this.postService.getUser().subscribe(
      (response) => {
        this.user = response.user;
      },
      (error) => {
        console.log('Error fetching user details', error);
      }
    );
  }

  listenForNotifications() {
    
    this.socketService.listen('newComment').subscribe((data: any) => {
      
      if (data.comment.author._id !== this.userID) {
        this.notifications.push(`New comment on post`);
        this.newNotification = true;
      }
    }); 
  
   
    this.socketService.listen('newLike').subscribe((data: any) => {
     
      if (this.userID===data.author) {
        this.notifications.push(`New like on post`);
        this.newNotification = true;
      }
    });
  
    
    this.socketService.listen('newFollow').subscribe((data: any) => {
      
      if (this.userID !== data.author) {
        this.notifications.push(`You have a new follower`);
        this.newNotification = true;
      }
    });
  }
  

  onLogout() {
    this.loginService.logoutUser();
    this.router.navigate(['/login']);
  }

  handleClick() {
    this.router.navigate(['/post', this.userID]);
  }

  toggleModal() {
    this.showModal = !this.showModal;

    // Clear the notification flag if the modal is opened
    if (this.showModal) {
      this.newNotification = false;
    }
  }

  closeModal() {
    this.showModal = false;
  }
}
