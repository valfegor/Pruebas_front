import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from "../../models/UserInterface";
import { UserService } from "../../../../src/app/services/user.service";
import { BoardService } from "../../services/board.service";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-sharedprofile',
  templateUrl: './sharedprofile.component.html',
  styleUrls: ['./sharedprofile.component.css']
})
export class SharedprofileComponent implements OnInit {
  public id:string;
  public userData:User;
  public profile:User;
  public boards: any;
  public filter: any;
  
  
  constructor(private _client:ActivatedRoute ,  private _userService: UserService , private _boardService: BoardService) { 
  this.id = ""
  this.userData={};
  this.profile={};
  this.boards=[];
  this.filter=[]
  }

  ngOnInit(): void {
    this.getUser()
    
  }



  getUser(){
    this._client.params.subscribe((params)=>{
      this.id = params['_id'];
      this._userService.findUser(this.id).subscribe(
        (res)=>{
          this.userData=res.user;
          console.log(this.userData)
          this._userService.getProfile().subscribe(
            (res)=>{
              this.profile = res.user;
              
              
              
              console.log(this.userData._id)
              
              this._boardService.listMyShared(this.userData._id).subscribe(
                (res)=>{
                  this.boards = res.array
                  console.log(this.boards)
      
                },
                (err)=>{
                  console.log(err)
                }
              )
            },
            (err)=>{
              console.log(err)
            }
          )
          
        },
        (err)=>{
          console.log(err);

        }
      )
    })
  }

  
}

