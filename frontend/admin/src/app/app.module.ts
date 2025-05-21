import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeComponent } from './employe/employe.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ListeInterventionComponent } from './liste-intervention/liste-intervention.component';
import { LoginComponent } from './login/login.component';
import { ResponsableComponent } from './responsable/responsable.component';
import { ServicesComponent } from './services/services.component';
import { TechnicienComponent } from './technicien/technicien.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgToastModule } from 'ng-angular-popup';
import { AjouterTechnicienComponent } from './ajouter-technicien/ajouter-technicien.component';
import { AjouterEmployeComponent } from './ajouter-employe/ajouter-employe.component';
import { AjouterResponsableComponent } from './ajouter-responsable/ajouter-responsable.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DroitsAccesComponent } from './droits-acces/droits-acces.component';
import { AjouterEquipementComponent } from './ajouter-equipement/ajouter-equipement.component';
import { EquipementComponent } from './equipement/equipement.component';
import { ModifierEmployeComponent } from './modifier-employe/modifier-employe.component';
import { ModifierTechnicienComponent } from './modifier-technicien/modifier-technicien.component';
import { ModifierResponsableComponent } from './modifier-responsable/modifier-responsable.component';
import { ModifierEquipementComponent } from './modifier-equipement/modifier-equipement.component';
import { ProfilComponent } from './profil/profil.component';
import { MajEquipementComponent } from './maj-equipement/maj-equipement.component';
import { ListeInterventionResumeComponent } from './liste-intervention-resume/liste-intervention-resume.component';
import { UtilisateurResumeComponent } from './utilisateur-resume/utilisateur-resume.component';
import { EquipementsResumeComponent } from './equipements-resume/equipements-resume.component';
import { ListMessageComponent } from './list-message/list-message.component';
import { AlertesComponent } from './alertes/alertes.component';
import { AlerteResumeComponent } from './alerte-resume/alerte-resume.component';
import { MessageResumeComponent } from './message-resume/message-resume.component';




@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ContactComponent,
    DashboardComponent,
    EmployeComponent,
    FooterComponent,
    HeaderComponent,
    ListeInterventionComponent,
    LoginComponent,
    ResponsableComponent,
    ServicesComponent,
    TechnicienComponent,
    AjouterTechnicienComponent,
    AjouterEmployeComponent,
    AjouterResponsableComponent,
    DroitsAccesComponent,
    AjouterEquipementComponent,
    EquipementComponent,
    ModifierEmployeComponent,
    ModifierTechnicienComponent,
    ModifierResponsableComponent,
    ModifierEquipementComponent,
    ProfilComponent,
   MajEquipementComponent,
   ListeInterventionResumeComponent,
   UtilisateurResumeComponent,
   EquipementsResumeComponent,
   ListMessageComponent,
   AlertesComponent,
   AlerteResumeComponent,
   MessageResumeComponent,
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgToastModule,
    NgxPaginationModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
