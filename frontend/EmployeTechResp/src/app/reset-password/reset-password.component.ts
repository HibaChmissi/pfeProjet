import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  email: string = '';
  role: string = ''; // Nouveau champ
  success: boolean = false;
  error: boolean = false;

  constructor(private http: HttpClient) {}

  sendInstructions(): void {
    this.success = false;
    this.error = false;

    let url = '';

    // Choix de l’URL selon le rôle
    switch (this.role) {
      case 'responsable':
        url = 'http://localhost:8081/api/responsable/forgotmdp';
        break;
      case 'employe':
        url = 'http://localhost:8081/api/employe/forgotmdp';
        break;
      case 'technicien':
        url = 'http://localhost:8081/api/api/technicien/forgotmdp';
        break;
      default:
        this.error = true;
        console.error("❌ Rôle invalide");
        return;
    }

   this.http.post(url, { email: this.email }, { responseType: 'text' }).subscribe({
  next: (response) => {
    this.success = true;
    console.log("✅ Réponse du serveur :", response);
  },
  error: (err) => {
    this.error = true;
    console.error("❌ Erreur lors de l'envoi :", err);
  }
});

  }
}
