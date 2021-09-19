import { Component, OnInit } from '@angular/core';
import { BoardService } from "../../services/board.service";
import { OwlOptions } from 'ngx-owl-carousel-o';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-shared-boards',
  templateUrl: './shared-boards.component.html',
  styleUrls: ['./shared-boards.component.css']
})
export class SharedBoardsComponent implements OnInit {
  boardData: any;
  message: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;

  constructor(
    private _boardService: BoardService,
    private _snackBar: MatSnackBar
  ) {
    this.boardData = [];
  }

  ngOnInit(): void {
    this._boardService.listBoardMember().subscribe(
      (res) => {
        this.boardData = res.board;
        console.log(this.boardData);
      },
      (err) => {
        this.message = err.error;
        this.openSnackBarError();
      }
    );
  }

  deleteBoard(board: any) {
    this._boardService.deleteBoard(board).subscribe(
      (res) => {
        let index = this.boardData.indexOf(board);
        if (index > -1) {
          this.boardData.splice(index, 1);
          this.message = res.message;
          this.openSnackBarSuccesfull();
        }
      },
      (err) => {
        this.message = err.error;
        this.openSnackBarError();
      }
    );
  }
  updateBoard(board: any) {
    this._boardService.deleteBoard(board).subscribe(
      (res) => {
        let index = this.boardData.indexOf(board);
        if (index > -1) {
          this.boardData.splice(index, 1);
          this.message = res.message;
          this.openSnackBarSuccesfull();
        }
      },
      (err) => {
        this.message = err.error;
        this.openSnackBarError();
      }
    );
  }

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 800,
    navText: ['', ''],

    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
      
    },
    nav: false,
  };

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
