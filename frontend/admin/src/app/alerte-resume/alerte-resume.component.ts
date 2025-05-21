import { Component, OnInit } from '@angular/core';
import { CrudService } from '../Service/crud.service';
import { Alerte} from '../Entites/Alerte.Entity';


@Component({
  selector: 'app-alerte-resume',
  templateUrl: './alerte-resume.component.html',
  styleUrls: ['./alerte-resume.component.css']
})
export class AlerteResumeComponent implements OnInit {
  totalAlertes = 0;
  INFO = 0;
  WARNING = 0;
  CRITIQUE = 0 ;

  constructor(private crudService: CrudService) {}

  ngOnInit(): void {
    this.crudService.getAlertes().subscribe(data => {
      console.log('Alertes récupérées :', data); // 🧪 voir le contenu exact
      this.totalAlertes = data.length;
      this.INFO = data.filter(a => a.niveau === 'INFO').length;
      this.WARNING = data.filter(a => a.niveau === 'WARNING').length;
      this.CRITIQUE = data.filter(a => a.niveau === 'CRITIQUE').length;
    });
  }
}
