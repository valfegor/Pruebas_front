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

    touchDrag: true,

    pullDrag: true,

    dots: true,

    navSpeed: 700,

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

    nav: true

  }

  

    slides = [

      {id: 1, img: "https://dummyimage.com/350x150/423b42/fff"},

      {id: 2, img: "https://dummyimage.com/350x150/2a2b7a/fff"},

      {id: 3, img: "https://dummyimage.com/350x150/1a2b7a/fff"},

      {id: 4, img: "https://dummyimage.com/350x150/7a2b7a/fff"},

      {id: 5, img: "https://dummyimage.com/350x150/9a2b7a/fff"},

      {id: 6, img: "https://dummyimage.com/350x150/5a2b7a/fff"},

      {id: 6, img: "https://dummyimage.com/350x150/4a2b7a/fff"}

    ];

 
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
