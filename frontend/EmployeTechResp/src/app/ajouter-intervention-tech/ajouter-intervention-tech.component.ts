import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { CrudService } from '../Service/crud.service';
import { Intervention } from '../Entites/Intervention.Entity';

@Component({
  selector: 'app-ajouter-intervention-tech',
  templateUrl: './ajouter-intervention-tech.component.html',
  styleUrls: ['./ajouter-intervention-tech.component.css']
})
export class AjouterInterventionTechComponent implements OnInit {
  InterventionForm: FormGroup;
  
  constructor(
    private service: CrudService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.InterventionForm = this.fb.group({
      titre: ['', Validators.required],
      type: ['', Validators.required],
      statut: ['', Validators.required],
      description: ['', Validators.required],
   
    });
  }

  ngOnInit(): void {}

  get titre() { return this.InterventionForm.get('titre'); }
  get type() { return this.InterventionForm.get('type'); }
  get statut() { return this.InterventionForm.get('statut'); }
  get description() { return this.InterventionForm.get('description'); }


  addNewIntervention() {
    if (this.InterventionForm.invalid) {
      window.alert('Veuillez remplir tous les champs correctement.');
      return;
    }
  
    const data = this.InterventionForm.value;
    const createurTechnicienId = Number(localStorage.getItem("userId")); // récupéré dynamiquement
  
    if (!createurTechnicienId) {
      window.alert("Erreur : utilisateur non connecté.");
      return;
    }
  
    const interventionDTO = {
      titre: data.titre,
      type: data.type,
      statut: data.statut,
      description: data.description,
      createurTechnicienId: createurTechnicienId
    };
  
    this.service.addIntervention(interventionDTO).subscribe(
      res => {
        window.alert('Intervention ajoutée avec succès');
        this.router.navigate(['/listeInterventionTech']);
      },
      err => {
        console.error(err);
        window.alert('Problème de serveur');
      }
    );
  }
  
}
