import { Component, OnInit } from '@angular/core';
import { BoardService } from '../../services/board.service';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-save-board',
  templateUrl: './save-board.component.html',
  styleUrls: ['./save-board.component.css']
})
export class SaveBoardComponent implements OnInit {
  registerData: any;
  selectedFile: any;
  message: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;

    constructor(
    private _boardService: BoardService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.registerData = {};
    this.selectedFile = null;
  }

  ngOnInit(): void {
  }


  uploadImg(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }

  saveBoard() {
    if (!this.registerData.name || !this.registerData.description) {
      this.message = 'Failed process: Imcomplete data';
      this.openSnackBarError();
      this.registerData = {};
    } else {
      const data = new FormData();
      if ( this.selectedFile != null){
        data.append('image', this.selectedFile, this.selectedFile.name);
      }      
      data.append('name', this.registerData.name);
      data.append('description', this.registerData.description);

      this._boardService.registerBoard(data).subscribe(
        (res) => {
          this._router.navigate(['/listBoard']);
          this.message = 'Task create';
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
