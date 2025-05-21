import { Component, OnInit } from '@angular/core';
import { CrudService } from '../Service/crud.service';
import { Responsable } from '../Entites/Responsable.Entity';

@Component({
  selector: 'app-profil3',
  templateUrl: './profil3.component.html',
  styleUrls: ['./profil3.component.css']
})
export class Profil3Component implements OnInit {
  userDetails: Responsable = new Responsable();
  isEditing: boolean = false;
  newPassword: string = '';
  confirmPassword: string = '';
  passwordError: string = '';
  successMessage: string = '';

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

    const updatedResponsable: Responsable = {
      id: this.userDetails.id,
      nom: this.userDetails.nom,
      prenom: this.userDetails.prenom,
      email: this.userDetails.email,
      role: this.userDetails.role,
      mot_de_passe: this.newPassword || undefined, // mot de passe seulement si modifié
      etat: this.userDetails.etat
    };

    this.service.updateResponsableDetails(this.userDetails.id!, updatedResponsable).subscribe({
      next: () => {
        this.service.findResponsableById(this.userDetails.id!).subscribe({
          next: (responsable) => {
            this.userDetails = { ...responsable };
            this.isEditing = false;
            this.newPassword = '';
            this.confirmPassword = '';
            this.passwordError = '';
            this.successMessage = 'Modifications enregistrées avec succès.';

            setTimeout(() => {
              this.successMessage = '';
            }, 4000);
          },
          error: (err: any) => {
            console.error('Erreur lors du rechargement des données :', err);
          }
        });
      },
      error: (err: any) => {
        console.error('Erreur de mise à jour :', err);
      }
    });
  }
}
