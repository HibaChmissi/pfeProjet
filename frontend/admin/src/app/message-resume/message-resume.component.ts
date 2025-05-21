import { Component, OnInit } from '@angular/core';
import { CrudService } from '../Service/crud.service';
import { Message} from '../Entites/Message.Entity';


@Component({
  selector: 'app-message-resume',
  templateUrl: './message-resume.component.html',
  styleUrls: ['./message-resume.component.css']
})
export class MessageResumeComponent implements OnInit {
  totalMessages = 0;
  

  constructor(private crudService: CrudService) {}

  ngOnInit(): void {
    this.crudService.getMessages().subscribe(data => {
      console.log('Messages récupérées :', data); // 🧪 voir le contenu exact
      this.totalMessages = data.length;
      
    });
  }
}
