import { Component, OnInit } from '@angular/core';
import { CrudService } from '../Service/crud.service';  // Assure-toi que le chemin du service est correct

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // Données des interventions
  total: number = 0;
  en_cours: number = 0;
  terminee: number = 0;
  en_attente: number = 0;


  // Données des utilisateurs
  totalUtilisateurs: number = 0;
  techniciens: number = 0;
  employes: number = 0;
  responsables: number = 0;

  // Données des équipements
  totalEquipements: number = 0;
  active: number = 0;
  inactive: number = 0;

// Données des alertes
  totalAlertes: number = 0;
  INFO: number = 0;
  WARNING: number = 0;
  CRITIQUE: number = 0;
// Données des messages
  totalMessages: number=0;
 
  constructor(private crudService: CrudService) {}

  ngOnInit(): void {
    this.crudService.getAllIntervention().subscribe(data => {
      console.log("Intervention exemple :", data[0]);

  
      this.total = data.length;
  
      data.forEach((i, index) => {
        console.log(`Intervention ${index + 1}:`, i); // 🧪 Étape 2 : voir les champs exacts
      });
  
      this.en_cours = data.filter(i => i.statut?.toLowerCase() === 'en cours').length;
      this.terminee = data.filter(i => i.statut?.toLowerCase() === 'terminer').length;
      this.en_attente = data.filter(i => i.statut?.toLowerCase() === 'en attente').length;
    });
  
//alertes
    this.crudService.getAlertes().subscribe(data => {
      console.log("Alerte exemple :", data[0]);
      this.totalAlertes = data.length;
  
      data.forEach((a, index) => {
        console.log(`Alerte ${index + 1}:`, a); // 🧪 Étape 2 : voir les champs exacts
      });
  
      this.INFO = data.filter(a => a.niveau?.toLowerCase() === 'INFO').length;
      this.WARNING = data.filter(a => a.niveau?.toLowerCase() === 'WARNIN').length;
      this.CRITIQUE = data.filter(a => a.niveau?.toLowerCase() === 'CRITIQUE').length;
    });
  

    // Appels CRUD pour récupérer les données des utilisateurs
    this.crudService.gettechnicien().subscribe(data => {
      this.techniciens = data.length;
      this.updateTotalUtilisateurs();
    });

    this.crudService.getemployes().subscribe(data => {
      this.employes = data.length;
      this.updateTotalUtilisateurs();
    });

    this.crudService.getresponsable().subscribe(data => {
      this.responsables = data.length;
      this.updateTotalUtilisateurs();
    });

    // Appels CRUD pour récupérer les données des équipements
    this.crudService.getequipement().subscribe(data => {
      this.totalEquipements = data.length;
      this.active = data.filter(e => e.etat ?.toLowerCase()=== 'active').length;
      this.inactive = data.filter(e => e.etat ?.toLowerCase() === 'inactive').length;
    });

    this.crudService.getMessages().subscribe(data => {
      this.totalMessages = data.length;
    });
  }

  updateTotalUtilisateurs(): void {
    // Met à jour le total des utilisateurs
    this.totalUtilisateurs = this.techniciens + this.employes + this.responsables;
  }


 
}
