import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  public userData:any;
  constructor(public _userService: UserService) { }

  ngOnInit(): void {
    this.userData={};
    this.getUser();
  }

  getUser(){
    this._userService.getProfile().subscribe(
      (res)=>{
        this.userData = res.user;
        console.log(this.userData);
      },
      (err)=>{
        console.log(err)
      }
    )
  }
  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

  

}
