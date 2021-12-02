import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user';
import { map } from 'rxjs/operators';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
      this.currentUser = this.currentUserSubject.asObservable();
      console.log(this.currentUserSubject.value)
  }
  getAllproducts() {
    return this.http.get('/product').pipe(
      map((res: any) => {
        return res['response'];
      })
    );
  }
  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }
  userLogin(user: string,password: string) {
    return this.http.post(`/user`,user).pipe(
      map((rs: any) => {
        const userDetails : any = { 
            token: rs.response.token, 
            status: rs.success, 
            username: rs.response.username,
            type: rs.response.level 
          };
        localStorage.setItem('currentUser', JSON.stringify(userDetails));
        this.currentUserSubject.next(userDetails);
        return userDetails;
      })
    );
  }
  getToken() {
    return localStorage.getItem('currentUser');
  }
  logout() {
    localStorage.removeItem('currentUser');
  }
 
  public get getPermissions() {
    const userProfile = jwt_decode(this.currentUserValue.token,{ header: true });
    console.log(userProfile)
    const userPermissions = userProfile;
    return userPermissions;
  }

}
