import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { CrudService } from '../Service/crud.service';
import { Technicien } from '../Entites/Technicien.Entity';

@Component({
  selector: 'app-ajouter-technicien',
  templateUrl: './ajouter-technicien.component.html',
  styleUrls: ['./ajouter-technicien.component.css']
})
export class AjouterTechnicienComponent implements OnInit {
  TechnicienForm: FormGroup;
  
  constructor(
    private service: CrudService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.TechnicienForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mot_de_passe: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {}

  passwordMatchValidator: ValidatorFn = (form: AbstractControl): { [key: string]: boolean } | null => {
    const password = form.get('mot_de_passe')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password && confirmPassword && password !== confirmPassword ? { mismatch: true } : null;
  };

  get nom() { return this.TechnicienForm.get('nom'); }
  get prenom() { return this.TechnicienForm.get('prenom'); }
  get email() { return this.TechnicienForm.get('email'); }
  get mot_de_passe() { return this.TechnicienForm.get('mot_de_passe'); }
  get confirmPassword() { return this.TechnicienForm.get('confirmPassword'); }
  get role() { return this.TechnicienForm.get('role'); }

  addNewTechnicien() {
    if (this.TechnicienForm.invalid) {
      window.alert('Veuillez remplir tous les champs correctement.');
      return;
    }

    const data = this.TechnicienForm.value;

    const technicien = new Technicien(
      undefined,
      data.nom,
      data.prenom,
      data.email,
      data.mot_de_passe,
      data.role
    );

    this.service.addTechnicien(technicien).subscribe(
      res => {
        window.alert('Technicien ajouté avec succès');
        this.router.navigate(['/technicien']).then(() => window.location.reload());
      },
      err => {
        console.error(err);
        window.alert('Problème de serveur');
      }
    );
  }
}