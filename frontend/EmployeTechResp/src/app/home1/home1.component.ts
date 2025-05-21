import { Component, OnInit } from '@angular/core';
import { Technicien } from '../Entites/Technicien.Entity';
import { CrudService } from '../Service/crud.service';


@Component({
  selector: 'app-home1',
  templateUrl: './home1.component.html',
  styleUrl: './home1.component.css'
})
export class Home1Component implements OnInit{
  userDetails: Technicien= new Technicien();
  
  constructor(private service: CrudService) {}
  ngOnInit(): void {
    const tokenData = this.service.userDetails();
    if (tokenData && tokenData.id) {
      this.service.findTechnicienById(tokenData.id).subscribe({
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
