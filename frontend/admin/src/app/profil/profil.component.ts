import { Component, OnInit } from '@angular/core';
import { CrudService } from '../Service/crud.service';
import { Admin } from '../Entites/Admin.Entity';

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
    const originalDetails = this.service.userDetails();
    this.userDetails = { ...originalDetails }; // clone pour éviter la mutation
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
    const updatedAdmin: any = {
      id: this.userDetails.id,
      nom: this.userDetails.nom,
      prenom: this.userDetails.prenom,
      email: this.userDetails.email,
      role: this.userDetails.role
    };

    if (this.newPassword) {
      updatedAdmin.mot_de_passe = this.newPassword;
    }

    console.log("Données envoyées à updateAdmin:", updatedAdmin);

    this.service.updateAdmin(this.userDetails.id, updatedAdmin).subscribe({
      next: () => {
        this.service.findAdminById(this.userDetails.id).subscribe({
          next: (admin) => {
            this.userDetails = { ...admin }; // nouveau clone
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
