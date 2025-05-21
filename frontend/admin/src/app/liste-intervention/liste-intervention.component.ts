import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Intervention } from '../Entites/Intervention.Entity';
import { CrudService } from '../Service/crud.service';

@Component({
  selector: 'app-liste-intervention',
  templateUrl: './liste-intervention.component.html',
  styleUrls: ['./liste-intervention.component.css']
})
export class ListeInterventionComponent implements OnInit {

  listeIntervention: Intervention[] = [];
  searchQuery: string = '';
  p: number = 1;

  constructor(private service: CrudService, private router: Router) {}

  ngOnInit(): void {
    this.service.getAllIntervention().subscribe(
      intervention => {
        this.listeIntervention = intervention;
      },
      error => {
        console.error("Erreur lors du chargement des interventions", error);
      }
    );
  }

  // Getter pour filtrer les interventions selon la recherche
  get filteredIntervention(): Intervention[] {
    return this.searchQuery
      ? this.listeIntervention.filter(intervention =>
       
          this.includesSearch(intervention.type) 
        )
      : this.listeIntervention;
  }

  private includesSearch(value: any): boolean {
    return value?.toString().toLowerCase().includes(this.searchQuery.toLowerCase());
  }
}
