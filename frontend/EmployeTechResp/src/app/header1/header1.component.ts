import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../Service/crud.service';

@Component({
  selector: 'app-header1',
  templateUrl: './header1.component.html',
  styleUrls: ['./header1.component.css']
})
export class Header1Component {
  
  userDetails: any | null = null;

  constructor(private crudService: CrudService, private router: Router) {this.userDetails = this.crudService.userDetails();
}
  

 
  
  logout() {
    this.crudService.logout();
    this.router.navigate(['/login']).then(() => window.location.reload());
  }
}
console.log('Mode actuel :', document.body.classList);
