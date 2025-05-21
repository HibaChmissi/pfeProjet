import { Component, OnInit , ViewEncapsulation} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from '../Service/crud.service';

interface Maj {
  id?: number;
  description: string;
  equipementId: number;
}

@Component({
  selector: 'app-maj-equipement',
  templateUrl: './maj-equipement.component.html',
  styleUrls: ['./maj-equipement.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MajEquipementComponent implements OnInit {
  equipementId!: number;
  equipementNom: string = '';
  majList: Maj[] = [];
  nouvelleMajDescription: string = '';
  message: string = '';
  error: string = '';

  constructor(private route: ActivatedRoute, private crudService: CrudService) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.equipementId = +idParam;
      this.getEquipementNom();
      this.chargerMajs();
    } else {
      this.error = "ID équipement non trouvé dans l'URL";
    }
  }

  getEquipementNom(): void {
    this.crudService.getEquipementById(this.equipementId).subscribe({
      next: (data) => {
        this.equipementNom = data.nom;
      },
      error: () => {
        this.equipementNom = 'Inconnu';
      }
    });
  }

  chargerMajs(): void {
    this.crudService.getMajsByEquipement(this.equipementId).subscribe({
      next: (data) => this.majList = data,
      error: () => this.error = "Erreur lors du chargement des MAJ"
    });
  }

  ajouterMaj(): void {
    this.message = '';
    this.error = '';

    if (!this.nouvelleMajDescription.trim()) {
      this.error = 'La description est vide.';
      return;
    }

    const maj: Maj = {
      description: this.nouvelleMajDescription,
      equipementId: this.equipementId
    };

    this.crudService.ajouterMajPourEquipement(maj).subscribe({
      next: () => {
        this.message = 'MAJ ajoutée avec succès.';
        this.nouvelleMajDescription = '';
        this.chargerMajs();
      },
      error: () => {
        this.error = "Erreur lors de l'ajout de la MAJ.";
      }
    });
  }
  getCurrentUserId(): number | null {
    const adminId = localStorage.getItem('adminId');
    return adminId ? parseInt(adminId) : null;
  }
  
}
