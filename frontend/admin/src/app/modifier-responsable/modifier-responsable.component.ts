
import { Component } from '@angular/core';Responsable
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from '../Service/crud.service';
import { Responsable} from '../Entites/Responsable.Entity';

@Component({
  selector: 'app-modifier-responsable',
  templateUrl: './modifier-responsable.component.html',
  styleUrls: ['./modifier-responsable.component.css']
})
export class ModifierResponsableComponent {

  updateForm: FormGroup;
  id!: number;
  currentResponsable = new Responsable()
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
    this.service.findResponsableById(idEvent).subscribe((result) => {
      let event = result;
      console.log(event);
      this.updateForm.patchValue({
        nom: event.nom,
        prenom: event.prenom, 
        email: event.email, 
       
        role: event.role, });}); }
  updateResponsable() {
    let data = this.updateForm.value;
    let responsable=new Responsable(
      this.id,
      data.nom,
      data.prenom,
      data.email,
      data.password,
      data.role, );
    console.log(Responsable);
    console.log(data);
    this.service.updateResponsable(this.id,responsable).subscribe((res) => {
      console.log(res);
    
this.route.navigate(['/responsable']).then(() => {
  window.location.reload();
});
}); }

}
