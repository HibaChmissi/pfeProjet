import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { ProfilComponent } from './profil/profil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgToastModule } from 'ng-angular-popup';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HeaderdashComponent } from './headerdash/headerdash.component';
import { ListeInterventionComponent } from './liste-intervention/liste-intervention.component';
import { AjouterInterventionComponent } from './ajouter-intervention/ajouter-intervention.component';
import { ListeInterventionTechComponent } from './liste-intervention-tech/liste-intervention-tech.component';
import { AjouterInterventionTechComponent } from './ajouter-intervention-tech/ajouter-intervention-tech.component';
import { Header1Component } from './header1/header1.component';
import { Home1Component } from './home1/home1.component';
import { Profil1Component } from './profil1/profil1.component';
import { MessageFormComponent } from './message-form/message-form.component';
import { DroitsAccesComponent } from './droits-acces/droits-acces.component';
import { AlertesComponent } from './alertes/alertes.component';
import { HeaderrespComponent } from './headerresp/headerresp.component';
import { Profil3Component } from './profil3/profil3.component';
import { Home3Component } from './home3/home3.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { MessageForm1Component } from './message-form1/message-form1.component';
import { MessageForm3Component } from './message-form3/message-form3.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    ProfilComponent,
    HomeComponent,
    HeaderdashComponent,
    ListeInterventionComponent,
    AjouterInterventionComponent,
    ListeInterventionTechComponent,
    AjouterInterventionTechComponent,
    Header1Component,
    Home1Component,
    Profil1Component,
    MessageFormComponent,
    DroitsAccesComponent,
    AlertesComponent,
    HeaderrespComponent,
    Profil3Component,
    Home3Component,
    ResetPasswordComponent,
    MessageForm1Component,
    MessageForm3Component,
   
    
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgToastModule,
    CommonModule,

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
