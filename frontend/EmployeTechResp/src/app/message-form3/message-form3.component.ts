import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from '../Entites/Message.Entity';
import { CrudService } from '../Service/crud.service';

@Component({
  selector: 'app-message-form3',
  templateUrl: './message-form3.component.html',
  styleUrls: ['./message-form3.component.css']
})
export class MessageForm3Component {

  messageForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private crudService: CrudService
  ) {
    this.messageForm = this.fb.group({
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      sujet: ['', Validators.required],
      message: ['', Validators.required] // ✅ corrigé ici
    });
  }

  // Getters pour les champs
  get nom() { return this.messageForm.get('nom'); }
  get email() { return this.messageForm.get('email'); }
  get sujet() { return this.messageForm.get('sujet'); }
  get message() { return this.messageForm.get('message'); }

  // Envoi du formulaire
  onSubmit() {
    if (this.messageForm.invalid) {
      this.messageForm.markAllAsTouched();
      return;
    }

    const formValue = this.messageForm.value;

    const newMessage: Message = {
      nom: formValue.nom,
      email: formValue.email,
      sujet: formValue.sujet,
      message: formValue.message // ✅ correspond bien à l’interface Message
    };

    console.log('Envoi au backend :', newMessage); // ✅ utile pour debug

    this.crudService.addMessage(newMessage).subscribe({
      next: () => {
        alert('Message envoyé !');
        this.messageForm.reset();
      },
      error: () => {
        alert("Erreur lors de l'envoi du message.");
      }
    });
  }

}
