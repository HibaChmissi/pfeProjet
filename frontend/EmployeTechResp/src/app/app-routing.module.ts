import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './Service/auth.service';
import { ListeInterventionComponent } from './liste-intervention/liste-intervention.component';
import { HomeComponent } from './home/home.component';
import { AjouterInterventionComponent } from './ajouter-intervention/ajouter-intervention.component';
import { AjouterInterventionTechComponent } from './ajouter-intervention-tech/ajouter-intervention-tech.component';
import { ListeInterventionTechComponent } from './liste-intervention-tech/liste-intervention-tech.component';

import { Home1Component } from './home1/home1.component';
import { ProfilComponent } from './profil/profil.component';
import { Profil1Component } from './profil1/profil1.component';
import { MessageFormComponent } from './message-form/message-form.component';
import { AlertesComponent } from './alertes/alertes.component';
import { DroitsAccesComponent } from './droits-acces/droits-acces.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { Home3Component } from './home3/home3.component';
import { Profil3Component } from './profil3/profil3.component';
import { MessageForm1Component } from './message-form1/message-form1.component';
import { MessageForm3Component } from './message-form3/message-form3.component';





const routes: Routes = [
  { path: '', component:DashboardComponent },
  { path: 'dashboard', component:DashboardComponent },
  { path: 'home' , component: HomeComponent,canActivate:[AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'listeIntervention', component: ListeInterventionComponent,canActivate:[AuthGuard]},
  {path: 'ajouterIntervention',component: AjouterInterventionComponent,canActivate:[AuthGuard]},
  { path: 'listeInterventionTech', component: ListeInterventionTechComponent,canActivate:[AuthGuard]},
  {path: 'ajouterInterventionTech',component: AjouterInterventionTechComponent,canActivate:[AuthGuard]},
  {path: 'home1', component: Home1Component,canActivate:[AuthGuard]},
  {path: 'profil', component: ProfilComponent,canActivate:[AuthGuard]},
  {path: 'profil1', component: Profil1Component,canActivate:[AuthGuard]},
  {path: 'messageForm', component: MessageFormComponent, canActivate:[AuthGuard]},
  {path: 'alertes', component: AlertesComponent, canActivate:[AuthGuard]},
  {path: 'droitsAcces', component: DroitsAccesComponent ,canActivate:[AuthGuard]},
  {path: 'resetPassword', component: ResetPasswordComponent},
  {path: 'home3', component: Home3Component ,canActivate:[AuthGuard]},
  {path: 'profil3', component: Profil3Component, canActivate:[AuthGuard]},
  {path: 'messageForm1', component: MessageForm1Component, canActivate:[AuthGuard]},
  {path: 'messageForm3', component: MessageForm3Component, canActivate:[AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
