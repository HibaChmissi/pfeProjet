import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from '../Entites/Admin.Entity';
import { CrudService } from '../Service/crud.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: CrudService,
    private router: Router,
  ) {
    let formControls = {
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    }

    this.loginForm = this.fb.group(formControls);
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  login() {
    let data = this.loginForm.value;
    console.log(data);
    let admin = new Admin(null, null, null, data.email, data.password, null);
    console.log(admin);

    if (
      data.email === '' ||
      data.password === ''
    ) {
      window.alert('Remplir votre champs');
    } else {
      this.service.loginAdmin(admin).subscribe(
        res => {
          console.log(res);
          localStorage.setItem("myToken", res.token);
          localStorage.setItem("role", res.role);
          localStorage.setItem("email", res.email);
          localStorage.setItem("nom", res.nom); // <- ajoute ceci si le backend renvoie res.nom
         
          const helper = new JwtHelperService();
          const decodedToken = helper.decodeToken(res.token);

          if (decodedToken && decodedToken.data) {
            localStorage.setItem("email", decodedToken.data.email || '');
            localStorage.setItem("adminId", decodedToken.data.id || '');
            localStorage.setItem("nom", decodedToken.data.nom || '');
          }
          this.router.navigate(['']).then(() => window.location.reload());
        },
        err => {
          console.log(err);
          window.alert('Probléme de Serveur');
        }
      );
    }
  }

  
    
}
