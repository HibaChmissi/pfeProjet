import { Component, OnInit } from '@angular/core';
import { CrudService } from '../Service/crud.service';
import { Router } from '@angular/router';
import { Intervention } from '../Entites/Intervention.Entity';

@Component({
  selector: 'app-liste-intervention-tech',
  templateUrl: './liste-intervention-tech.component.html',
  styleUrls: ['./liste-intervention-tech.component.css']
})
export class ListeInterventionTechComponent implements OnInit {
  listeIntervention: Intervention[] = [];
  searchQuery: string = '';

  constructor(private service: CrudService, private router: Router) {}

  ngOnInit(): void {
    const technicienId = this.getTechnicienIdFromToken();
    if (technicienId) {
      this.service.getAllIntervention().subscribe(data => {
        // ⚠️ Filtrage manuel
        this.listeIntervention = data.filter(intervention =>
          intervention.createurTechnicienId === technicienId ||
          intervention.traiteurTechnicienId === technicienId
        );
      });
    }
  }
  

  getTechnicienIdFromToken(): number | null {
    const decoded = this.service.userDetails();
    return decoded?.id ?? null;
  }

  get filteredIntervention(): any[] {
    return this.searchQuery
      ? this.listeIntervention.filter(intervention =>
          intervention.titre?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          intervention.type?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          intervention.description?.toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      : this.listeIntervention;
 
   }

   changerStatut(intervention: Intervention): void {
    const technicienId = this.getTechnicienIdFromToken();
    if (!technicienId) return;
  
    const traitementDTO = {
      nouveauStatut: intervention.statut,
      traiteurTechnicienId: technicienId
    };
  
    this.service.traiterIntervention(intervention.id, traitementDTO).subscribe({
      next: updated => {
        console.log("Intervention mise à jour :", updated);
      },
      error: err => {
        console.error("Erreur lors de la mise à jour du statut", err);
      }
    });
  }
  
}
