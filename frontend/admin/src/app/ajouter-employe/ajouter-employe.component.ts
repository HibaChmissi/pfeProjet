import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { CrudService } from '../Service/crud.service';
import { Employes } from '../Entites/Employes.Entity';

@Component({
  selector: 'app-ajouter-employe',
  templateUrl: './ajouter-employe.component.html',
  styleUrls: ['./ajouter-employe.component.css']
})
export class AjouterEmployeComponent implements OnInit {
  EmployeForm: FormGroup;
  
  constructor(
    private service: CrudService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.EmployeForm = this.fb.group({
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

  get nom() { return this.EmployeForm.get('nom'); }
  get prenom() { return this.EmployeForm.get('prenom'); }
  get email() { return this.EmployeForm.get('email'); }
  get mot_de_passe() { return this.EmployeForm.get('mot_de_passe'); }
  get confirmPassword() { return this.EmployeForm.get('confirmPassword'); }
  get role() { return this.EmployeForm.get('role'); }

  addNewEmploye() {
    if (this.EmployeForm.invalid) {
      window.alert('Veuillez remplir tous les champs correctement.');
      return;
    }

    const data = this.EmployeForm.value;

    const employe = new Employes(
      undefined,
      data.nom,
      data.prenom,
      data.email,
      data.mot_de_passe,
      data.role
    );

    this.service.addEmploye(employe).subscribe(
      res => {
        window.alert('Employé ajouté avec succès');
        this.router.navigate(['/employe']).then(() => window.location.reload());
      },
      err => {
        console.error(err);
        window.alert('Problème de serveur');
      }
    );
  }
}