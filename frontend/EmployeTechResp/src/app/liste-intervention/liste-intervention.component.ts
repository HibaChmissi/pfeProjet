import { Component, OnInit } from '@angular/core';
import { CrudService } from '../Service/crud.service';
import { Router } from '@angular/router';
import { Intervention } from '../Entites/Intervention.Entity';

@Component({
  selector: 'app-liste-intervention',
  templateUrl: './liste-intervention.component.html',
  styleUrls: ['./liste-intervention.component.css']
})
export class ListeInterventionComponent implements OnInit {
  listeIntervention: Intervention[] = [];
  searchQuery: string = '';

  constructor(private service: CrudService, private router: Router) {}

  ngOnInit(): void {
    const role = localStorage.getItem('role');
    const employeId = this.getEmployeIdFromToken();

    if (role === 'employe' && employeId !== null) {
      this.service.getInterventionByEmployeId(employeId).subscribe(
        data => this.listeIntervention = data,
        error => console.error('Erreur lors du chargement des interventions', error)
      );
    
    }
  }

  getEmployeIdFromToken(): number | null {
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
}
