import { Component, OnInit } from '@angular/core';
import { Responsable } from '../Entites/Responsable.Entity';
import { CrudService } from '../Service/crud.service';


@Component({
  selector: 'app-home3',
  templateUrl: './home3.component.html',
  styleUrl: './home3.component.css'
})
export class Home3Component implements OnInit{
  userDetails: Responsable = new Responsable();
  
  constructor(private service: CrudService) {}
  ngOnInit(): void {
    const tokenData = this.service.userDetails();
    if (tokenData && tokenData.id) {
      this.service.findResponsableById(tokenData.id).subscribe({
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

