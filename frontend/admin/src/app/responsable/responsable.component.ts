import { Component, OnInit } from '@angular/core';
import { CrudService } from '../Service/crud.service';
import { Router } from '@angular/router';
import { Responsable } from '../Entites/Responsable.Entity';

@Component({
  selector: 'app-responsable',
  templateUrl: './responsable.component.html',
  styleUrls: ['./responsable.component.css'] // Fixed here
})
export class ResponsableComponent implements OnInit { // Added OnInit interface
  searchTerm: string = '';
  role!: String  
  listresponsable: Responsable[] = [];
  searchQuery: string = '';
  responsable: any = {};
  userDetails: any | null = null;
  id!: number;
  constructor(private service: CrudService, private router: Router){ this.userDetails = this.service.userDetails();}

  ngOnInit(): void {
    this.id = this.userDetails.id;
    this.service.findResponsableById(this.id).subscribe((result) => {
      this.responsable = result ;
    })
    
    this.role = localStorage.getItem("role") as string;
    this.service.getresponsable().subscribe(responsable => {
      this.listresponsable= responsable;
    });

    this.service.getresponsable().subscribe(responsable => {
      this.listresponsable = responsable;
    });
  }
  get filteredResponsable(): Responsable[] {
    if (!this.searchQuery) {
      return this.listresponsable;
    }
    return this.listresponsable.filter(responsable =>
      (responsable.nom?.toLowerCase() || '').includes(this.searchQuery.toLowerCase()) ||
      (responsable.prenom?.toLowerCase() || '').includes(this.searchQuery.toLowerCase())
    );
  }

  DeleteResponsable(responsable: Responsable) {
    if (responsable.id != null) { 
      if (confirm("Voulez-vous supprimer cet responsable avec l'ID " + responsable.id + " ?")) {
        this.service.onDeleteResponsable(responsable.id).subscribe(() => {
          this.router.navigate(['/responsable']).then(() => {
            window.location.reload();
          });
        });
      }
    } else {
      console.error("L'ID de le responsable est indéfini !");
    }
  }
  
  

}

