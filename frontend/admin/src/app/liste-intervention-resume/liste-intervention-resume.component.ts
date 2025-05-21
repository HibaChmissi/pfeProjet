import { Component, OnInit } from '@angular/core';
import { CrudService } from '../Service/crud.service';
import { Intervention } from '../Entites/Intervention.Entity';


@Component({
  selector: 'app-liste-intervention-resume',
  templateUrl: './liste-intervention-resume.component.html',
  styleUrls: ['./liste-intervention-resume.component.css']
})
export class ListeInterventionResumeComponent implements OnInit {
  totalInterventions = 0;
  en_cours = 0;
  terminee = 0;
  en_attente = 0 ;

  constructor(private crudService: CrudService) {}

  ngOnInit(): void {
    this.crudService.getAllIntervention().subscribe(data => {
      console.log('Interventions récupérées :', data); // 🧪 voir le contenu exact
      this.totalInterventions = data.length;
      this.en_cours = data.filter(i => i.statut === 'en_cours').length;
      this.terminee = data.filter(i => i.statut === 'terminee').length;
      this.en_attente = data.filter(i => i.statut === 'en_attente').length;
    });
  }
}
