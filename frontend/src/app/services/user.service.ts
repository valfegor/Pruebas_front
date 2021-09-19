import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private env: string;

  constructor(private _http: HttpClient, private _router: Router) {
    this.env = environment.APP_URL;
  }

  registerUser(user: any) {
    return this._http.post<any>(this.env + 'user/registerUser', user);
  }


  login(user: any) {
    return this._http.post<any>(this.env + 'user/login', user);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  nameIn() {
    return localStorage.getItem('name');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAdmin() {
    return localStorage.getItem('role') === 'admin' ? true : false;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    localStorage.removeItem('_id');
    this._router.navigate(['']);
  }

  getRole(email: string) {
    return this._http.get<any>(this.env + 'user/getRole/' + email);
  }

  getNombre(email: string) {
    return this._http.get<any>(this.env + 'user/getNombre/' + email);
  }

  getId(email: string) {
    return this._http.get<any>(this.env + 'user/getId/' + email);
  }

  listUser(name: string) {
    return this._http.get<any>(this.env + 'user/listUsers/' + name);
  }

  findUser(_id: string) {
    return this._http.get<any>(this.env + 'user/findUser/' + _id);
  }

  updateUser(user: any) {
    return this._http.put<any>(this.env + 'user/updateUser', user);
  }

  updatePhoto(user: any) {
    return this._http.put<any>(this.env + 'user/updatePhoto', user);
  }

  deleteUser(user: any) {
    return this._http.put<any>(this.env + 'user/deleteUser', user);
  }

  registerAdmin(user: any) {
    return this._http.post<any>(this.env + 'user/registerAdmin', user);
  }
  
  listUserAll(){
    return this._http.get<any>(this.env + 'user/listUsers/');
  }

  getProfile(){
    return this._http.get<any>(this.env + 'user/getProfile');
  }
  
  findUserByEmail(user:any){
    return this._http.post<any>(this.env + 'user/findUserByEmail' , user);
  }
}
