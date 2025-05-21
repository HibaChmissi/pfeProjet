import { Component } from '@angular/core';
import { CrudService } from '../Service/crud.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-alertes',
  templateUrl: './alertes.component.html',
  styleUrls: ['./alertes.component.css']
})
export class AlertesComponent {
  error: string | undefined;
  ngOnInit(): void {
    this.chargerAlertes();
  }
  alerteForm: FormGroup;
  messageConfirmation = '';

  listeAlertes: any[] = [];
  constructor(private crudService: CrudService, private fb: FormBuilder) {
    this.alerteForm = this.fb.group({
      message: ['', Validators.required],
      niveau: ['INFO', Validators.required]
    });
  }

  envoyerAlerte(): void {
    if (this.alerteForm.valid) {
      const adminId = localStorage.getItem('adminId'); // récupéré après login
const alerte = {
  message: this.alerteForm.value.message,
  niveau: this.alerteForm.value.niveau,
  admin: { id: Number(adminId) }, // correspond à l'objet attendu côté backend
  date: new Date(),
  vue: false
};


      this.crudService.ajouterAlerte(alerte).subscribe({
        next: () => {
          this.messageConfirmation = '✅ Alerte envoyée avec succès !';
          this.alerteForm.reset({ niveau: 'INFO' });
        },
        error: (err) => {
          this.messageConfirmation = '❌ Erreur lors de l\'envoi';
          console.error(err);
        }
      });
    }
  }
  chargerAlertes(): void {
    const adminId = Number(localStorage.getItem('adminId'));

    this.crudService.getAlertesParAdmin(adminId).subscribe({
      next: (data) => this.listeAlertes = data,
      error: () => this.error = "Erreur lors du chargement des MAJ"
    });
  }
 
  
}
