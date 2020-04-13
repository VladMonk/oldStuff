import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RegComponent } from './reg/reg.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CheckRegDataService } from "./check-reg-data.service";
import { AuthService } from "./auth.service";
import { FlashMessagesModule } from "angular2-flash-messages";
import { HttpModule } from "@angular/http";
import { IsLoggedIn } from "./isLogged.guard";
import { NotFoundComponent } from './not-found/not-found.component';
import { UserPageService } from "./user-page.service";
import { ProfileNavCardComponent } from './profile-nav-card/profile-nav-card.component';
import { CompanyCardComponent } from './company-card/company-card.component';
import { CompanyComponent } from './company/company.component';
import { CreateCompanyComponent } from './create-company/create-company.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';


import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MarkdownModule } from "ngx-markdown";
import { CompanyWidgetComponent } from './company-widget/company-widget.component';
import { EditCompanyComponent } from './edit-company/edit-company.component';



const appRoute: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'auth/log', component: LoginComponent, canActivate: [IsLoggedIn]},
  {path: 'auth/reg', component: RegComponent, canActivate: [IsLoggedIn]},
  {path: 'account/:userid', component: ProfileComponent},
  {path: 'account/:userid/edit', component: EditProfileComponent},
  {path: 'project/:userid/new', component: CreateCompanyComponent},
  {path: 'project/all', component: DashboardComponent},
  {path: 'project/:userid/:projectid', component: CompanyComponent},
  {path: 'project/:userid/:projectid/edit', component: EditCompanyComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegComponent,
    HomeComponent,
    ProfileComponent,
    DashboardComponent,
    NotFoundComponent,
    ProfileNavCardComponent,
    CompanyCardComponent,
    CompanyComponent,
    CreateCompanyComponent,
    EditProfileComponent,
    CompanyWidgetComponent,
    EditCompanyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoute),
    FormsModule,
    ReactiveFormsModule,
    FlashMessagesModule.forRoot(),
    HttpModule,

    MarkdownModule.forRoot(),
    HttpClientModule
  ],
  providers: [
    CheckRegDataService,
    AuthService,
    IsLoggedIn,
    UserPageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
