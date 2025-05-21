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
  }

  updateTotalUtilisateurs(): void {
    // Met à jour le total des utilisateurs
    this.totalUtilisateurs = this.techniciens + this.employes + this.responsables;
  }
}
