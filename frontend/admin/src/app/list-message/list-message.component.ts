import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from '../Entites/Message.Entity';
import { CrudService } from '../Service/crud.service';

@Component({
  selector: 'app-list-message',
  templateUrl: './list-message.component.html',
  styleUrls: ['./list-message.component.css']
})
export class ListMessageComponent implements OnInit {

  listMessage: Message[] = [];             // Tous les messages récupérés
  searchQuery: string = '';                // Texte de recherche
  p: number = 1;                            // Page pour la pagination

  constructor(private service: CrudService, private router: Router) {}

  ngOnInit(): void {
    this.service.getMessages().subscribe((messages: Message[]) => {
      this.listMessage = messages;
    });
  }

  // Méthode pour supprimer un message
  deleteMessage(message: Message): void {
    const confirmDelete = confirm(`Voulez-vous supprimer ce message avec l'ID ${message.id} ?`);
    if (confirmDelete) {
      this.service.onDeleteMessage(message.id).subscribe(() => {
        // Rafraîchit la liste après suppression
        this.router.navigate(['/listmessage']).then(() => {
          window.location.reload();
        });
      });
    }
  }

  // Getter pour filtrer les messages selon le nom
  get filteredMessages(): Message[] {
    if (!this.searchQuery.trim()) {
      return this.listMessage;
    }

    const lowerQuery = this.searchQuery.toLowerCase();
    return this.listMessage.filter(msg =>
      msg.nom.toLowerCase().includes(lowerQuery) ||
      msg.email.toLowerCase().includes(lowerQuery) ||
      msg.sujet.toLowerCase().includes(lowerQuery) ||
      msg.message.toLowerCase().includes(lowerQuery)
    );
  }

}