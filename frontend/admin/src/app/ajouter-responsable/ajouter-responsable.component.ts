import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { CrudService } from '../Service/crud.service';
import { Responsable } from '../Entites/Responsable.Entity';

@Component({
  selector: 'app-ajouter-responsable',
  templateUrl: './ajouter-responsable.component.html',
  styleUrls: ['./ajouter-responsable.component.css']
})
export class AjouterResponsableComponent implements OnInit {
  ResponsableForm: FormGroup;
  
  constructor(
    private service: CrudService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.ResponsableForm = this.fb.group({
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

  get nom() { return this.ResponsableForm.get('nom'); }
  get prenom() { return this.ResponsableForm.get('prenom'); }
  get email() { return this.ResponsableForm.get('email'); }
  get mot_de_passe() { return this.ResponsableForm.get('mot_de_passe'); }
  get confirmPassword() { return this.ResponsableForm.get('confirmPassword'); }
  get role() { return this.ResponsableForm.get('role'); }

  addNewResponsable() {
    if (this.ResponsableForm.invalid) {
      window.alert('Veuillez remplir tous les champs correctement.');
      return;
    }

    const data = this.ResponsableForm.value;

    const responsable = new Responsable(
      undefined,
      data.nom,
      data.prenom,
      data.email,
      data.mot_de_passe,
      data.role
    );

    this.service.addResponsable(responsable).subscribe(
      res => {
        window.alert('Responsable ajouté avec succès');
        this.router.navigate(['/responsable']).then(() => window.location.reload());
      },
      err => {
        console.error(err);
        window.alert('Problème de serveur');
      }
    );
  }
}