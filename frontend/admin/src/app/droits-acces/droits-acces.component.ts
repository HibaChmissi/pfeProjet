import { Component, OnInit } from '@angular/core';
import { CrudService } from '../Service/crud.service';
import { Router } from '@angular/router';
import { DroitAcces} from '../Entites/droits-acces.Entity';

@Component({
  selector: 'app-droits-acces',
  templateUrl: './droits-acces.component.html',
  styleUrls: ['./droits-acces.component.css']
})
export class DroitsAccesComponent implements OnInit {
  searchTerm: string = '';
  editionActive = false;
  droitsAcces: DroitAcces[] = [];

  constructor(private service: CrudService, private router: Router) {}

  ngOnInit(): void {
    this.chargerDroitsAcces();
  }

  chargerDroitsAcces(): void {
    this.service.getDroitsAcces().subscribe({
      next: (data) => this.droitsAcces = data,
      error: () => alert('Erreur lors du chargement des droits.')
    });
  }

  enregistrerChangements() {
    this.service.sauvegarderDroits(this.droitsAcces).subscribe({
      next: () => {
        alert('Modifications enregistrées !');
        this.editionActive = false;
        this.chargerDroitsAcces();
      },
      error: () => alert('Erreur lors de l\'enregistrement.')
    });
  }

  activerEdition() {
    this.editionActive = true;
  }

  annulerEdition() {
    this.editionActive = false;
    this.chargerDroitsAcces();
  }
}
