import { Component } from '@angular/core';
import { CrudService } from '../Service/crud.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-headerresp',
  templateUrl: './headerresp.component.html',
  styleUrl: './headerresp.component.css'
})
export class HeaderrespComponent {
 userDetails: any | null = null;

  constructor(private crudService: CrudService, private router: Router) {this.userDetails = this.crudService.userDetails();
}
  

 
  
  logout() {
    this.crudService.logout();
    this.router.navigate(['/login']).then(() => window.location.reload());
  }
}
console.log('Mode actuel :', document.body.classList);

