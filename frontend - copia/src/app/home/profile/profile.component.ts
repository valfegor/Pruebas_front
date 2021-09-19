import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  boardData: any;
  userData: any;
  message: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;
  nombre: any;
  selectedFile: any;
  _id: any;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _boardService: BoardService,
    private _Arouter: ActivatedRoute
  ) {
    this.userData = {};
    this.boardData = {};
    this.nombre = this._userService.nameIn();
    this.selectedFile = null;
    this._id = '';
  }

  ngOnInit(): void {
     this._userService.getProfile().subscribe(
       (res)=>{
         this.userData = res.user;
         this._id=this.userData._id;
         console.log(this._id)
       },
       (err)=>{
         this.message = err.error;
         this.openSnackBarError();
       }
     )

     this._boardService.listBoardMember().subscribe(
      (res) => {
        this.boardData = res.board;
      },
      (err) => {
        this.message = err.error;
        this.openSnackBarError();
      }
    );
  }

  updateUser(user: any) {}

  uploadImg(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }

  savePhoto() {
    const data = new FormData();
    if (this.selectedFile != null) {
      data.append('photo', this.selectedFile, this.selectedFile.name);
      data.append('_id', this._id);
      console.log(data)
     
    }
    this._userService.updatePhoto(data).subscribe(
      (res) => {
        console.log(res)
        this._router.navigate(['/profile']);
        this.message = 'Updated photo';
        this.openSnackBarSuccesfull();
        location.reload();
      },
      (err) => {
        this.message = err.error;
        this.openSnackBarError();
      }
    );

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