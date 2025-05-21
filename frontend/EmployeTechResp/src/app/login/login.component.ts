import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { CrudService } from '../Service/crud.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFormGroup!: FormGroup;
  submitted = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private crudService: CrudService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginFormGroup = this.fb.group({
      role: ['employe', Validators.required],   // Ajout du choix du rôle par défaut employe
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  handleLogin(): void {
    this.submitted = true;

    if (this.loginFormGroup.invalid) {
      return;
    }

    const credentials = {
      email: this.loginFormGroup.value.username,
      mot_de_passe: this.loginFormGroup.value.password
    };

    const role = this.loginFormGroup.value.role;

    if (role === 'employe') {
      this.crudService.loginEmploye(credentials).subscribe(
        res => this.handleResponse(res),
        err => this.handleError(err)
      );
    } else if (role === 'technicien') {
      this.crudService.loginTechnicien(credentials).subscribe(
        res => this.handleResponse(res),
        err => this.handleError(err)
      );
    }
  else if (role === 'responsable') {
    this.crudService.loginResponsable(credentials).subscribe(
      res => this.handleResponse(res),
      err => this.handleError(err)
    );
  }
  }

  private handleResponse(res: any) {
    localStorage.setItem("myToken", res.token);
    localStorage.setItem("role", res.role);
  
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(res.token);
  
    if (decodedToken) {
      localStorage.setItem("email", decodedToken.email || '');
      localStorage.setItem("userId", decodedToken.id);
    }
  
    const role = res.role.toLowerCase();
  
    if (role === 'employe') {
      this.router.navigate(['/home']);
    } else if (role === 'technicien') {
      this.router.navigate(['/home1']);
    } else if (role === 'responsable') {
      this.router.navigate(['/home3']);
    } else {
      window.alert("Rôle inconnu !");
    }
  }
  

  private handleError(err: any) {
    console.error("Erreur de connexion :", err);
    this.errorMessage = 'Email ou mot de passe incorrect ou accès refusé.';
    window.alert(this.errorMessage);
  }
}
