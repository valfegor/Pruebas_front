import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  public userData:any;
  constructor(public _userService: UserService) {
    this.userData = {}
   }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    this._userService.getProfile().subscribe(
      (res)=>{
        this.userData = res.user;
        console.log(this.userData);
      }
    )
  }


}
