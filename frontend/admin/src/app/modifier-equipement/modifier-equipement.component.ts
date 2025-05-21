
import { Component } from '@angular/core';Equipement
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from '../Service/crud.service';
import { Equipement } from '../Entites/Equipement.Entity';

@Component({
  selector: 'app-modifier-equipement',
  templateUrl: './modifier-equipement.component.html',
  styleUrls: ['./modifier-equipement.component.css']
})
export class ModifierEquipementComponent {

  updateForm: FormGroup;
  id!: number;
  currentEquipement = new Equipement()
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
     
      etat: new FormControl('', [Validators.required]),

    
      
     
    };
    this.updateForm = this.fb.group(formControles);
  }

  get nom() {
    return this.updateForm.get('nom');
  }
  get etat() {
    return this.updateForm.get('etat');
  }
  
  
  ngOnInit(): void {
    let idEvent = this.router.snapshot.params['id'];
    this.id = idEvent;
    this.service.findEmployesById(idEvent).subscribe((result) => {
      let event = result;
      console.log(event);
      this.updateForm.patchValue({
        nom: event.nom,
        prenom: event.etat, 
         });}); }
  updateEquipement() {
    let data = this.updateForm.value;
    let equipement =new Equipement(
      this.id,
      data.nom,
      data.etat);
    console.log(equipement);
    console.log(data);
    this.service.updateEquipement(this.id,equipement).subscribe((res) => {
      console.log(res);
    
this.route.navigate(['/equipement']).then(() => {
  window.location.reload();
});
}); }

}
