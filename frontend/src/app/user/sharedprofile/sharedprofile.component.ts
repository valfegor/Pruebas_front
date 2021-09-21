import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from "../../models/UserInterface";
import { UserService } from "../../../../src/app/services/user.service";

@Component({
  selector: 'app-sharedprofile',
  templateUrl: './sharedprofile.component.html',
  styleUrls: ['./sharedprofile.component.css']
})
export class SharedprofileComponent implements OnInit {
  public id:any;
  public user_id: any;
  
  constructor(private _client:ActivatedRoute ,  private _userService: UserService) { 
  this.id = {}
  }

  ngOnInit(): void {
  }



  getUser(){
    this._client.params.subscribe((params)=>{
      this.id = params['_id'];
      this._userService.findUser(this.id).subscribe(
        (res)=>{
          console.log(res);
        },
        (err)=>{
          console.log(err);
        }
      )
    })
  }

}
