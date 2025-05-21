import { Component, OnInit } from '@angular/core';
import { CrudService } from '../Service/crud.service';
import { Employe } from '../Entites/Employe.Entity';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  userDetails: any = {};
  isEditing: boolean = false;
  newPassword: string = '';
  confirmPassword: string = '';
  passwordError: string = '';
  successMessage: string = '';

  constructor(private service: CrudService) {}

  ngOnInit(): void {
    const tokenData = this.service.userDetails();
    if (tokenData && tokenData.id) {
      this.service.findEmployeById(tokenData.id).subscribe({
        next: (data) => {
          this.userDetails = data;
        },
        error: (err) => {
          console.error("Erreur lors du chargement des infos de l'utilisateur", err);
        }
      });
    }
  }
  

  enableEditing(): void {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.newPassword = '';
      this.confirmPassword = '';
      this.passwordError = '';
    }
  }

  saveChanges(): void {
    if (this.newPassword && this.newPassword !== this.confirmPassword) {
      this.passwordError = 'Les mots de passe ne correspondent pas.';
      return;
    }

    // Préparer l'objet mis à jour
    const updatedEmploye: any = {
      id: this.userDetails.id,
      nom: this.userDetails.nom,
      prenom: this.userDetails.prenom,
      email: this.userDetails.email,
      role: this.userDetails.role
    };

    if (this.newPassword) {
      updatedEmploye.mot_de_passe = this.newPassword;
    }

    console.log("Données envoyées à updateEmploye:", updatedEmploye);

    this.service.updateEmploye(this.userDetails.id, updatedEmploye).subscribe({
      next: () => {
        this.service.findEmployeById(this.userDetails.id).subscribe({
          next: (employe) => {
            this.userDetails = { ...employe }; // nouveau clone
            this.isEditing = false;
            this.newPassword = '';
            this.confirmPassword = '';
            this.passwordError = '';
            this.successMessage = 'Modifications enregistrées avec succès.';

            setTimeout(() => {
              this.successMessage = '';
            }, 4000);
          },
          error: (err) => {
            console.error('Erreur lors du rechargement des données :', err);
          }
        });
      },
      error: err => {
        console.error('Erreur de mise à jour :', err);
      }
    });
  }
}
