import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { BoardService } from '../../services/board.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css'],
})
export class AddMemberComponent implements OnInit {
  userData: any;
  message: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;
  roles: Array<any>;
  _id: string;
  userId: string;
  member: any;

  constructor(
    private _userService: UserService,
    private _boardService: BoardService,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _arouter: ActivatedRoute
  ) {
    this.userData = {};
    this.roles = [];
    this.userId = '';
    this._id = '';
    this.member = {};
  }

  ngOnInit(): void {
    this._arouter.params.subscribe(
      (params) => {
        this._id = params['_id'];
      },
      (err) => {
        this.message = err.error;
        this.openSnackBarError();
      }
    );
  }



  addMember() {
    if (!this.userData.email) {
      this.message = 'Failed process: Imcomplete data';
      this.openSnackBarError();
    } else {
      this._userService.findUserByEmail(this.userData).subscribe(
        (res) => {
          this.userId = res.user._id;
          this.member = {
            userId: this.userId,
            boardId: this._id,
          };
          this._boardService.addMember(this.member).subscribe(
            (res) => {
              
              this.message = 'Successfull user registration';
              this.openSnackBarSuccesfull();
              this.userData = {};
              window.history.back();
            },
            (err) => {
              this.message = err.error;
              this.openSnackBarError();
            }
          );
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
