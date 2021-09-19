import { Component, OnInit } from '@angular/core';
import { BoardService } from '../../services/board.service';
import { Router, ActivatedRoute } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-board',
  templateUrl: './update-board.component.html',
  styleUrls: ['./update-board.component.css']
})
export class UpdateBoardComponent implements OnInit {
  registerData: any;
  message: string = '';
  _id: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;

  constructor(
    private _boardService: BoardService,
    private _router: Router,
    private _Arouter: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) { 
    this.registerData = {};
    this._id = '';
  }

  ngOnInit(): void {
    this._Arouter.params.subscribe((params) => {
      this._id = params['_id'];
      this._boardService.getBoard(this._id).subscribe(
        (res) => {
          this.registerData = res.board;
        },
        (err) => {
          this.message = err.error;
          this.openSnackBarError();
        }
      );
    });
  }


  updateBoard() {
    if (!this.registerData.name || !this.registerData.description) {
      this.message = 'Failed process: Incomplete data';
      this.openSnackBarError();
    } else {
      console.log(this.registerData);      
      this._boardService.updateBoard(this.registerData).subscribe(
        (res) => {
          this._router.navigate(['/listBoard']);
          this.message = 'Successfull edit board';
          this.openSnackBarSuccesfull();
          this.registerData = {};
        },
        (err) => {
          this.message = err.error;
          this.openSnackBarError();
        }
      );
    }
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
