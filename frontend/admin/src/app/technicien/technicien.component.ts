import { Component, OnInit } from '@angular/core';
import { CrudService } from '../Service/crud.service';
import { Router } from '@angular/router';
import { Technicien } from '../Entites/Technicien.Entity';

@Component({
  selector: 'app-technicien',
  templateUrl: './technicien.component.html',
  styleUrls: ['./technicien.component.css'] // Fixed here
})
export class TechnicienComponent implements OnInit { // Added OnInit interface
  searchTerm: string = '';
  role!: String  
  listtechnicien: Technicien[] = [];
  searchQuery: string = '';
  technicien: any = {};
  userDetails: any | null = null;
  id!: number;
  constructor(private service: CrudService, private router: Router){ this.userDetails = this.service.userDetails();}

  ngOnInit(): void {
    this.id = this.userDetails.id;
    this.service.findTechnicienById(this.id).subscribe((result) => {
      this.technicien = result ;
    })
    
    this.role = localStorage.getItem("role") as string;
    this.service.gettechnicien().subscribe(technicien => {
      this.listtechnicien= technicien;
    });

    this.service.gettechnicien().subscribe(technicien => {
      this.listtechnicien = technicien;
    });
  }
  get filteredTechnicien(): Technicien[] {
    if (!this.searchQuery) {
      return this.listtechnicien;
    }
    return this.listtechnicien.filter(technicien =>
      (technicien.nom?.toLowerCase() || '').includes(this.searchQuery.toLowerCase()) ||
      (technicien.prenom?.toLowerCase() || '').includes(this.searchQuery.toLowerCase())
    );
  }

  DeleteTechnicien(technicien: Technicien) {
    if (technicien.id != null) { 
      if (confirm("Voulez-vous supprimer cet technicien avec l'ID " + technicien.id + " ?")) {
        this.service.onDeleteTechnicien(technicien.id).subscribe(() => {
          this.router.navigate(['/technicien']).then(() => {
            window.location.reload();
          });
        });
      }
    } else {
      console.error("L'ID de le technicien est indéfini !");
    }
  }
  
  

}

