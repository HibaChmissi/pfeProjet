import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { ListeInterventionComponent } from './liste-intervention/liste-intervention.component';
import { TechnicienComponent } from './technicien/technicien.component';
import { EmployeComponent } from './employe/employe.component';
import { ResponsableComponent } from './responsable/responsable.component';
import { AuthGuard } from './Service/auth.service';
import { AjouterEmployeComponent } from './ajouter-employe/ajouter-employe.component';
import { AjouterTechnicienComponent } from './ajouter-technicien/ajouter-technicien.component';
import { DroitsAccesComponent } from './droits-acces/droits-acces.component';
import { AjouterResponsableComponent } from './ajouter-responsable/ajouter-responsable.component';
import { EquipementComponent } from './equipement/equipement.component';
import { AjouterEquipementComponent } from './ajouter-equipement/ajouter-equipement.component';
import { ModifierEmployeComponent } from './modifier-employe/modifier-employe.component';
import { ModifierTechnicienComponent } from './modifier-technicien/modifier-technicien.component';
import { ModifierResponsableComponent } from './modifier-responsable/modifier-responsable.component';
import { ModifierEquipementComponent } from './modifier-equipement/modifier-equipement.component';
import { ProfilComponent } from './profil/profil.component';
import { MajEquipementComponent } from './maj-equipement/maj-equipement.component';

import { ListMessageComponent } from './list-message/list-message.component';
import { AlertesComponent } from './alertes/alertes.component';


const routes: Routes = [
  { path: '', component:DashboardComponent,canActivate:[AuthGuard] },
  { path: 'dashboard', component: DashboardComponent,canActivate:[AuthGuard]},
  { path: 'about', component: AboutComponent,canActivate:[AuthGuard] },
  { path: 'services', component: ServicesComponent,canActivate:[AuthGuard] },
  { path: 'contact', component: ContactComponent,canActivate:[AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'technicien', component: TechnicienComponent,canActivate:[AuthGuard] },
  { path: 'employe', component: EmployeComponent,canActivate:[AuthGuard] },
  { path: 'responsable', component: ResponsableComponent,canActivate:[AuthGuard] },
  { path: 'ajouterEmploye', component: AjouterEmployeComponent,canActivate:[AuthGuard] },
  { path: 'ajouterResponsable',component: AjouterResponsableComponent,canActivate:[AuthGuard] },
  { path: 'ajouterTechnicien', component: AjouterTechnicienComponent,canActivate:[AuthGuard]},
  { path: 'listeIntervention', component: ListeInterventionComponent,canActivate:[AuthGuard]},
  { path: 'droitsAcces', component: DroitsAccesComponent,canActivate:[AuthGuard]},
  { path: 'equipement', component: EquipementComponent,canActivate:[AuthGuard]},
  { path: 'ajouterEquipement', component: AjouterEquipementComponent,canActivate:[AuthGuard]},
  { path: 'modifierEmploye/:id', component: ModifierEmployeComponent,canActivate:[AuthGuard]},
  { path: 'modifierTechnicien/:id', component: ModifierTechnicienComponent,canActivate:[AuthGuard]},
  { path: 'modifierResponsable/:id', component: ModifierResponsableComponent,canActivate:[AuthGuard]},
  { path: 'modifierEquipement/:id', component: ModifierEquipementComponent,canActivate:[AuthGuard]},
  { path: 'majEquipement/:id', component: MajEquipementComponent, canActivate:[AuthGuard]},
  { path: 'profil', component: ProfilComponent, canActivate:[AuthGuard]},

  {path: 'listMessage', component: ListMessageComponent, canActivate:[AuthGuard]},
  {path: 'alertes', component:AlertesComponent,canActivate:[AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }