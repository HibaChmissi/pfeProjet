import { Component, OnInit } from '@angular/core';
import { Employes } from '../Entites/Employes.Entity';
import { CrudService } from '../Service/crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.css'] // Fixed here
})
export class EmployeComponent implements OnInit { // Added OnInit interface
  searchTerm: string = '';
  role!: String  
  listemployes: Employes[] = [];
  searchQuery: string = '';
  employes: any = {};
  userDetails: any | null = null;
  id!: number;

  constructor(private service: CrudService, private router: Router) { this.userDetails = this.service.userDetails();}

  ngOnInit(): void {

    this.id = this.userDetails.id;
    this.service.findEmployesById(this.id).subscribe((result) => {
      this.employes = result ;
    })
    
    this.role = localStorage.getItem("role") as string;
    this.service.getemployes().subscribe(employes => {
      this.listemployes = employes;
    });

    this.service.getemployes().subscribe(employes => {
      this.listemployes = employes;
    });
  }
  get filteredEmployes(): Employes[] {
    if (!this.searchQuery) {
      return this.listemployes;
    }
    return this.listemployes.filter(employes =>
      (employes.nom?.toLowerCase() || '').includes(this.searchQuery.toLowerCase()) ||
      (employes.prenom?.toLowerCase() || '').includes(this.searchQuery.toLowerCase())
    );
  }

  DeleteEmploye(employe: Employes) {
    if (employe.id != null) { 
      if (confirm("Voulez-vous supprimer cet employé avec l'ID " + employe.id + " ?")) {
        this.service.onDeleteEmploye(employe.id).subscribe(() => {
          this.router.navigate(['/employe']).then(() => {
            window.location.reload();
          });
        });
      }
    } else {
      console.error("L'ID de l'employé est indéfini !");
    }
  }


}

