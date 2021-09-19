import { Component, OnInit } from '@angular/core';
import { BoardService } from '../../services/board.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { UserService } from '../../services/user.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-shared-boards',
  templateUrl: './shared-boards.component.html',
  styleUrls: ['./shared-boards.component.css'],
})
export class SharedBoardsComponent implements OnInit {
  boardData: any;
  message: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;
  public_user: any;
  filter: any;
  constructor(
    private _boardService: BoardService,
    private _snackBar: MatSnackBar,
    private _userService: UserService
  ) {
    this.boardData = {};
    this.public_user = {};
    this.filter = [];
  }

  ngOnInit(): void {
    this._boardService.listBoardMember().subscribe(
      (res) => {
        this.boardData = res.board;
        this.getPROFILE();
        for (const board of this.boardData) {
          console.log(board.members);
        }

        
        

        
      },
      (err) => {
        this.message = err.error;
        this.openSnackBarError();
      }
    );
  }

  getPROFILE() {
    this._userService.getProfile().subscribe((res) => {
      this.public_user = res.user;
    });
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
