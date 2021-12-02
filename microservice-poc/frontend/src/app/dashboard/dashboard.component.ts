import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser: any;
  constructor(
    private authenticationService: AuthenticationService,
  ) { 
   this.currentUser = this.authenticationService.currentUserValue;

   //console.log(this.authenticationService.getPermissions);
  }

  ngOnInit(): void {
   //this.getProducts();
  }
   getProducts(): void {
    this.authenticationService.getAllproducts().subscribe(
      (response) => {
        console.log(response)
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
