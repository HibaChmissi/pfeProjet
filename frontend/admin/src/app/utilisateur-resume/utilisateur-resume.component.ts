import { Component, OnInit } from '@angular/core';
import { CrudService } from '../Service/crud.service';


@Component({
  selector: 'app-utilisateur-resume',
  templateUrl: './utilisateur-resume.component.html',
  styleUrls: ['./utilisateur-resume.component.css']
})
export class UtilisateurResumeComponent implements OnInit {
  techniciens = 0;
  employes = 0;
  responsables = 0;
  total = 0;

  constructor(private crudService: CrudService) {}

  ngOnInit(): void {
    this.crudService.gettechnicien().subscribe(data => {
      this.techniciens = data.length;
      this.updateTotal();
    });

    this.crudService.getemployes().subscribe(data => {
      this.employes = data.length;
      this.updateTotal();
    });

    this.crudService.getresponsable().subscribe(data => {
      this.responsables = data.length;
      this.updateTotal();
    });
  }

  updateTotal(): void {
    this.total = this.techniciens + this.employes + this.responsables;
  }
}
