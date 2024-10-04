import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { PostComponent } from './components/post/post.component';
import { CreatepostComponent } from './components/createpost/createpost.component';
import { EditpostComponent } from './components/editpost/editpost.component';



const routes: Routes = [
  {path:"login", component:LoginComponent},
  {path:"signup", component:SignupComponent},
  {path:"post/:userID", component:PostComponent},
  {path:"create", component:CreatepostComponent},
  {path:"edit/:postID", component:EditpostComponent},
  {path:"", redirectTo:"/login", pathMatch:"full"},
  { path: '**', redirectTo: '/login' }




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
