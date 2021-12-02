import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  currentUser: any;
  
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,

) {
    this.currentUser = this.authenticationService.currentUserValue;

    if (this.currentUser.status) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    } else {
        this.router.navigate(['/login']);
    }
      
  }
  ngOnInit(){
    
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
  
}
