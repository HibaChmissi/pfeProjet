import { Component, OnInit } from '@angular/core';
import { Employe } from '../Entites/Employe.Entity';
import { CrudService } from '../Service/crud.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  userDetails: Employe = new Employe();
  
  constructor(private service: CrudService) {}
  ngOnInit(): void {
    const tokenData = this.service.userDetails();
    if (tokenData && tokenData.id) {
      this.service.findEmployeById(tokenData.id).subscribe({
        next: (data) => {
          this.userDetails = data;
        },
        error: (err: any) => {
          console.error("Erreur lors du chargement des infos du responsable", err);
        }
      });
    }
  }
}