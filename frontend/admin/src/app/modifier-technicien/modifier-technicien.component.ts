
import { Component } from '@angular/core';Technicien
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from '../Service/crud.service';
import { Technicien} from '../Entites/Technicien.Entity';

@Component({
  selector: 'app-modifier-technicien',
  templateUrl: './modifier-technicien.component.html',
  styleUrls: ['./modifier-technicien.component.css']
})
export class ModifierTechnicienComponent {

  updateForm: FormGroup;
  id!: number;
  currentTechnicien = new Technicien()
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
    this.service.findTechnicienById(idEvent).subscribe((result) => {
      let event = result;
      console.log(event);
      this.updateForm.patchValue({
        nom: event.nom,
        prenom: event.prenom, 
        email: event.email, 
       
        role: event.role, });}); }
  updateTechnicien() {
    let data = this.updateForm.value;
    let technicien=new Technicien(
      this.id,
      data.nom,
      data.prenom,
      data.email,
      data.password,
      data.role, );
    console.log(Technicien);
    console.log(data);
    this.service.updateTechnicien(this.id,technicien).subscribe((res) => {
      console.log(res);
    
this.route.navigate(['/technicien']).then(() => {
  window.location.reload();
});
}); }

}
