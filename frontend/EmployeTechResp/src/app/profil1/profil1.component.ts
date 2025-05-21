import { Component, OnInit } from '@angular/core';
import { CrudService } from '../Service/crud.service';
import { Employe } from '../Entites/Employe.Entity';
import {Technicien} from '../Entites/Technicien.Entity';

@Component({
  selector: 'app-profil1',
  templateUrl: './profil1.component.html',
  styleUrls: ['./profil1.component.css']
})
export class Profil1Component implements OnInit {
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
      this.service.findTechnicienById(tokenData.id).subscribe({
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
    const updatedTechnicien: any = {
      id: this.userDetails.id,
      nom: this.userDetails.nom,
      prenom: this.userDetails.prenom,
      email: this.userDetails.email,
      role: this.userDetails.role
    };

    if (this.newPassword) {
      updatedTechnicien.mot_de_passe = this.newPassword;
    }

    console.log("Données envoyées à updateTechnicien:", updatedTechnicien);

    this.service.updateTechnicien(this.userDetails.id, updatedTechnicien).subscribe({
      next: () => {
        this.service.findTechnicienById(this.userDetails.id).subscribe({
          next: (technicien) => {
            this.userDetails = { ...technicien }; // nouveau clone
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
