import { OnInit } from "@angular/core";
import { Alerte } from "../Entites/Alerte.Entity";
import { CrudService } from "../Service/crud.service";
import { Component} from '@angular/core';

@Component({
  selector: 'app-alertes',
  templateUrl: './alertes.component.html',
  styleUrls: ['./alertes.component.css']
})

export class AlertesComponent implements OnInit {
  alertes: Alerte[] = [];

  constructor(private crudService: CrudService) {}

  ngOnInit(): void {
    this.crudService.getAlertes().subscribe(data => {
      this.alertes = data;
    });
  }

  marquerCommeVue(id: number): void {
    this.crudService.marquerAlerteCommeVue(id).subscribe({
      next: (updatedAlerte) => {
        // Met à jour localement le champ "vue"
        const index = this.alertes.findIndex(a => a.id === id);
        if (index !== -1) {
          this.alertes[index].vue = true;
        }
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour de l\'alerte :', err);
      }
    });
  }
  
}
