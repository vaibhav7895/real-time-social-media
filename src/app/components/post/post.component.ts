import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginserviceService } from 'src/app/services/loginservice.service';
import { PostServiceService } from 'src/app/services/post-service.service';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit, OnDestroy {
  showComments: boolean = false;
  userID: string = '';
  posts: any[] = [];
  postID: string = '';
  newComment: string = '';
  socket: any;
  currentUserFollowing: string[] = [];
  button: string = '';
  comments: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private postService: PostServiceService,
    private loginService: LoginserviceService
  ) {}

  ngOnInit(): void {
    this.userID = this.loginService.getUserID();
    if (this.userID) {
      this.getPostsForUser();
    }
    this.route.paramMap.subscribe((params) => {
      this.postID = params.get('postID') || '';
    });

    this.socket = io('https://localhost:8080');
    this.listenForNewComments();
    this.listenForNewLikes();
  }

  ngOnDestroy(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  toggleComments(postID: string) {
    const post = this.posts.find((p) => p._id === postID);

    if (post) {
      post.showComments = !post.showComments;
    }
  }

  getPostsForUser() {
    this.postService.getallPosts(this.userID).subscribe(
      (response) => {
        this.posts = response.posts.reverse();
        this.comments = response.posts.comments;
      },
      (error) => {
        console.error('Error fetching posts', error);
      }
    );
  }

  deletePost(postID: string) {
    this.postService.deletePost(postID).subscribe(
      (response) => {
        this.getPostsForUser();
        // console.log('Post deleted successfully');
      },
      (error) => {
        console.error('Error deleting post', error);
      }
    );
  }

  addComment(postID: string) {
    const commentData = {
      text: this.newComment,
    };

    if (this.newComment.trim()) {
      this.postService.getComment(postID, commentData).subscribe(
        (response) => {
          // console.log(response, "response");

          this.newComment = '';
        },
        (error) => {
          console.error('Error adding comment', error);
        }
      );
    } else {
      console.warn('Comment is empty, not adding.');
    }
  }

  toggleLikes(postID: string) {
    this.postService.getLike(postID).subscribe((response) => {
      // console.log(response, "response");
      
    });
  }

  listenForNewComments() {
    this.socket.on('newComment', (data: any) => {
      // console.log('Real-time comment received:', data);

      const postIndex = this.posts.findIndex(
        (post) => post._id === data.postId
      );
      if (postIndex !== -1) {
        this.posts[postIndex].comments.push(data.comment);
      }
    });
  }

  listenForNewLikes() {
    this.socket.on('newLike', (data: any) => {
      // console.log('Real-time like received:', data);

      const postIndex = this.posts.findIndex(
        (post) => post._id === data.postId
      );
      if (postIndex !== -1) {
        const currentLikes = this.posts[postIndex].likes.length;

        const newLikesCount = data.like;

        if (newLikesCount > currentLikes) {
          this.posts[postIndex].likes.push(data.like);
        } else {
          this.posts[postIndex].likes.pop();
        }

        this.posts[postIndex].likesCount = newLikesCount;
      }
    });
  }

  isFollowing(authorID: string): boolean {
    const post = this.posts.find((post) => post.author._id === authorID);
    if (post && post.author && Array.isArray(post.author.followers)) {
      return post.author.followers.includes(this.userID);
    }

    return false;
  }

  handleFollow(authorID: string) {
    this.postService.postFollow(authorID).subscribe(
      (response) => {
        this.getPostsForUser(); // Refresh posts to update follow status
      },
      (error) => {
        console.error('Error following user', error);
      }
    );
  }

  handleUnfollow(authorID: string) {
    this.postService.postUnfollow(authorID).subscribe(
      (response) => {
        this.getPostsForUser();
      },
      (error) => {
        console.error('Error unfollowing user', error);
      }
    );
  }
}
