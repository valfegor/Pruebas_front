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
    this.getprofile();
  }



  getUser(){
    this._client.params.subscribe((params)=>{
      this.id = params['_id'];
      this._userService.findUser(this.id).subscribe(
        (res)=>{
          this.userData=res.user;
          
          
        },
        (err)=>{
          console.log(err);

        }
      )
    })
  }

  getprofile(){
    this._userService.getProfile().subscribe(
      (res)=>{
        this.profile = res.user;
        const{_id} = this.profile;
        console.log(_id)
        this._boardService.listMyShared().subscribe(
          (res)=>{
            this.boards = res.board
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
  }
}

