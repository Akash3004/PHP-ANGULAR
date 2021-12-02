import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.css']
})


export class UsermanagementComponent implements OnInit {
  angForm: FormGroup;
  returnUrl: any;
  currentUser: any;

  constructor(
    private authenticationService: AuthenticationService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {
      this.angForm = this.fb.group({
        email: ['', [Validators.required,Validators.minLength(1), Validators.email]],
        password: ['', Validators.required]
      });
    }

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    
    this.currentUser = this.authenticationService.currentUserValue;
    if(this.currentUser.status){
      this.router.navigate(['/dashboard']);
    }
    
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }
   // convenience getter for easy access to form fields
  get form() { return this.angForm.controls; }

  onSubmit(){
    this.authenticationService.userLogin(this.form.email.value,this.form.password.value)
      .pipe(first())
      .subscribe(
          response => {
            this.router.navigate([this.returnUrl])
 
          },
          error => {
              console.error("User name or password is incorrect")
          });
  }

}
