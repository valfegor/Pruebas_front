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
    if(this._userService.loggedIn()){
      if(this._userService.getToken()){
        this._userService.getProfile().subscribe(
          (res)=>{
            this.userData = res.user;
          },
          (err)=>{
            console.log(err)
          }
        )
      }
    }
    
  }

  getProfile(){
    
      this._userService.getProfile().subscribe(
        (res)=>{
          this.userData = res.user;
        },
        (err)=>{
          console.log(err)
        }
      )
    
   }

}
