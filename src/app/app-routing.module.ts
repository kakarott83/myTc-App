import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { MembersComponent } from './auth/members/members.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AdminComponent } from './components/admin/admin.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'members', component: MembersComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'admin', component: AdminComponent},
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
