import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { CrudService } from '../Service/crud.service';
import { Equipement } from '../Entites/Equipement.Entity';

@Component({
  selector: 'app-ajouter-equipement',
  templateUrl: './ajouter-equipement.component.html',
  styleUrls: ['./ajouter-equipement.component.css']
})
export class AjouterEquipementComponent implements OnInit {
  EquipementForm: FormGroup;
  
  constructor(
    private service: CrudService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.EquipementForm = this.fb.group({
      nom: ['', Validators.required],
      etat: ['', Validators.required],
      
    });
  }

  ngOnInit(): void {}

 

  get nom() { return this.EquipementForm.get('nom'); }
  get etat() { return this.EquipementForm.get('etat'); }
  addNewEquipement() {
    if (this.EquipementForm.invalid) {
      window.alert('Veuillez remplir tous les champs correctement.');
      return;
    }

    const data = this.EquipementForm.value;

    const equipement = new Equipement(
      undefined,
      data.nom,
      data.etat
    );

    this.service.addEquipement(equipement).subscribe(
      res => {
        window.alert('Equipement ajouté avec succès');
        this.router.navigate(['/equipement']).then(() => window.location.reload());
      },
      err => {
        console.error(err);
        window.alert('Problème de serveur');
      }
    );
  }
}