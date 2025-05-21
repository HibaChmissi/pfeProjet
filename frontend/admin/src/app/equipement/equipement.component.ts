import { Component, OnInit } from '@angular/core';
import { Equipement } from '../Entites/Equipement.Entity';
import { CrudService } from '../Service/crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-equipement',
  templateUrl: './equipement.component.html',
  styleUrls: ['./equipement.component.css'] // Fixed here
})
export class EquipementComponent implements OnInit { // Added OnInit interface
  searchTerm: string = '';
  role!: String  
  listequipement: Equipement[] = [];
  searchQuery: string = '';
  equipement: any = {};
  userDetails: any | null = null;
  id!: number;
  constructor(private service: CrudService, private router: Router) { this.userDetails = this.service.userDetails();}

  ngOnInit(): void {

  

    this.id = this.userDetails.id;
    this.service.findEquipementById(this.id).subscribe((result) => {
      this.equipement = result ;
    })
    
    this.role = localStorage.getItem("role") as string;
    this.service.getequipement().subscribe(equipement => {
      this.listequipement = equipement;
    });

    this.service.getequipement().subscribe(equipement => {
      this.listequipement = equipement;
    });
  }
  get filteredEquipement(): Equipement[] {
    if (!this.searchQuery) {
      return this.listequipement;
    }
    return this.listequipement.filter(equipement =>
      (equipement.nom?.toLowerCase() || '').includes(this.searchQuery.toLowerCase())
    );
  }

  DeleteEquipement(equipement: Equipement) {
    if (equipement.id != null) { 
      if (confirm("Voulez-vous supprimer cet admin avec l'ID " + equipement.id + " ?")) {
        this.service.onDeleteEquipement(equipement.id).subscribe(() => {
          this.router.navigate(['/equipement']).then(() => {
            window.location.reload();
          });
        });
      }
    } else {
      console.error("L'ID de l'equipement est indéfini !");
    }
  }
  
  

}

