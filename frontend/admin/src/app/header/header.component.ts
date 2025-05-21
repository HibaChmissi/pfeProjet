import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../Service/crud.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  searchTerm: string = '';  
  
  userDetails: any | null = null;

  constructor(private crudService: CrudService, private router: Router) {this.userDetails = this.crudService.userDetails();
}
 
  logout() {
    this.crudService.logout();
    this.router.navigate(['/login']).then(() => window.location.reload());
  }
}

