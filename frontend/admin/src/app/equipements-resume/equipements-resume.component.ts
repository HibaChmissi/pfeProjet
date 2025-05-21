import { Component, OnInit } from '@angular/core';
import { CrudService } from '../Service/crud.service';

@Component({
  selector: 'app-equipements-resume',
  templateUrl: './equipements-resume.component.html',
  styleUrls: ['./equipements-resume.component.css']
})
export class EquipementsResumeComponent implements OnInit {
  total = 0;
  active = 0;
  inactive = 0;

  constructor(private crudService: CrudService) {}

  ngOnInit(): void {
    this.crudService.getequipement().subscribe((data: any[]) => {
      this.total = data.length;
      this.active = data.filter(e => e.etat?.toLowerCase() === 'active').length;
      this.inactive = data.filter(e => e.etat?.toLowerCase() === 'inactive').length;
    });
  }
}
