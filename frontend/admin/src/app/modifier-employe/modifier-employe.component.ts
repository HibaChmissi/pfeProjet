
import { Component } from '@angular/core';Employes
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from '../Service/crud.service';
import { Employes } from '../Entites/Employes.Entity';

@Component({
  selector: 'app-modifier-employe',
  templateUrl: './modifier-employe.component.html',
  styleUrls: ['./modifier-employe.component.css']
})
export class ModifierEmployeComponent {

  updateForm: FormGroup;
  id!: number;
  currentEmployes = new Employes()
  constructor(
    private fb: FormBuilder,
    private service: CrudService,
    private route: Router,
    private router: ActivatedRoute
  ) {
    let formControles = {
      nom: new FormControl('', [
        Validators.required,
        Validators.pattern("[a-z A-Z .'-]+"), 
        Validators.minLength(4),
      ]),
     
      prenom: new FormControl('', [Validators.required]),

    
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
     
    };
    this.updateForm = this.fb.group(formControles);
  }

  get nom() {
    return this.updateForm.get('nom');
  }
  get prenom() {
    return this.updateForm.get('prenom');
  }
  get email() {
    return this.updateForm.get('email');
  }

  get password() {
    return this.updateForm.get('password');
  }
  get role() {
    return this.updateForm.get('role');
  }



  ngOnInit(): void {
    let idEvent = this.router.snapshot.params['id'];
    this.id = idEvent;
    this.service.findEmployesById(idEvent).subscribe((result) => {
      let event = result;
      console.log(event);
      this.updateForm.patchValue({
        nom: event.nom,
        prenom: event.prenom, 
        email: event.email, 
       
        role: event.role, });}); }
  updateEmployes() {
    let data = this.updateForm.value;
    let employes =new Employes(
      this.id,
      data.nom,
      data.prenom,
      data.email,
      data.password,
      data.role, );
    console.log(employes);
    console.log(data);
    this.service.updateEmployes(this.id,employes).subscribe((res) => {
      console.log(res);
    
this.route.navigate(['/employe']).then(() => {
  window.location.reload();
});
}); }

}
