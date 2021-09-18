import { Component, OnInit } from '@angular/core';
import { BoardService } from '../../services/board.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { UserService } from "../../services/user.service";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';


@Component({
  selector: 'app-list-board',
  templateUrl: './list-board.component.html',
  styleUrls: ['./list-board.component.css']
})
export class ListBoardComponent implements OnInit {
  taskData: any;
  userData: any;
  myboard: any;
  message: string = '';
  existe:boolean;
 
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;
  

  constructor(
    private _boardService: BoardService,
    private _snackBar: MatSnackBar,
    private _userService: UserService
      
  ) {
    this.taskData = {};
    this.userData={};
    this.myboard={};
    this.existe=false;
  }

  ngOnInit(): void {
    this.getprofile();
    this._boardService.listBoard().subscribe(
      (res) => {
        this.taskData = res.board;
        console.log(this.userData._id)
        
        
       this.existe = this.taskData.some((element: { userId: any; })=>element.userId === this.userData._id);
       if(this.existe){
         this.myboard = this.taskData.find((element: { userId: any; })=>{
          element.userId === this.userData._id
         })

          console.log(this.myboard)


       }

       console.log()

      },
      (err) => {
        this.message = err.error;
        this.openSnackBarError();
      }
    );
  }

  getprofile(){
    return this._userService.getProfile().subscribe(
      (res)=>{
        this.userData = res.user;
      },
      (err) => {
        this.message= err.error;
      }
    )
   
  }


  customOptions: OwlOptions = {

    loop: false,

    mouseDrag: true,

    touchDrag: false,

    pullDrag: true,

    dots: true,

    navSpeed: 800,

    navText: ['', ''],

    responsive: {

      0: {

        items: 1

      },

      400: {

        items: 2

      },

      740: {

        items: 3

      },

      940: {

        items: 4

      }

    },

    nav: false

  }

  

    

 
  openSnackBarSuccesfull() {
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['style-snackBarTrue'],
    });
  }

  openSnackBarError() {
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['style-snackBarFalse'],
    });
  }
}
