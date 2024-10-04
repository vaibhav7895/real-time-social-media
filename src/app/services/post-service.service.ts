import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginserviceService } from './loginservice.service'; 
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {
  private postUrl = 'https://social-media-app-1-uy0g.onrender.com/post';
  private getUserUrl = 'https://social-media-app-1-uy0g.onrender.com/user/newuser';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private loginService: LoginserviceService 
  ) {}
  

  
  private getHeaders(): HttpHeaders {
    const token = this.loginService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getPosts(userID: string): Observable<any> {
    return this.http.get(`${this.postUrl}/getposts/${userID}`, { headers: this.getHeaders() });
  }
  
  getallPosts(userID: string): Observable<any> {
    return this.http.get(`${this.postUrl}`, { headers: this.getHeaders() });
  }
  createPost(postData: any): Observable<any> {
    return this.http.post(`${this.postUrl}/new`, postData, { headers: this.getHeaders() });
  }

  editPost(Postchange:any,postID:string):Observable<any>{
    
    return this.http.put(`${this.postUrl}/${postID}`,Postchange,{ headers: this.getHeaders() });
  }
  deletePost(postID: string): Observable<any> {
    return this.http.delete(`${this.postUrl}/${postID}`, { headers: this.getHeaders()})
  }
  
  getComment(postID:string,commentData:any){
    return this.http.post(`${this.postUrl}/${postID}/comments`,commentData,{ headers: this.getHeaders()});
  }

  getLike(postID:string){
    return this.http.post(`${this.postUrl}/${postID}/like`,{},{ headers: this.getHeaders()});
  }

  postFollow(followerID:string){
    return this.http.put(`${this.postUrl}/${followerID}/follow`,{},{ headers: this.getHeaders()});
  }
  
  postUnfollow(followerID:string){
    return this.http.put(`${this.postUrl}/${followerID}/unfollow`,{},{ headers: this.getHeaders()});
  }
  getUser(): Observable<any> {
    return this.http.get(this.getUserUrl,{ headers: this.getHeaders()});
  }
  
}
