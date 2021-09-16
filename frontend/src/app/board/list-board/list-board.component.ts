import { Component, OnInit } from '@angular/core';
import { BoardService } from '../../services/board.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
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
  message: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;
  

  constructor(
    private _boardService: BoardService,
    private _snackBar: MatSnackBar
      
  ) {
    this.taskData = [];
  }

  ngOnInit(): void {
    this._boardService.listBoard().subscribe(
      (res) => {
        this.taskData = res.board;
        console.log(this.taskData)
      },
      (err) => {
        this.message = err.error;
        this.openSnackBarError();
      }
    );
  }

  customOptions: OwlOptions = {

    loop: false,

    mouseDrag: true,

    touchDrag: false,

    pullDrag: true,

    dots: false,

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
