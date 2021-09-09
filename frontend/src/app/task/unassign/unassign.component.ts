import { Component, OnInit } from '@angular/core';
import { TaskService } from "../../services/task.service";
import { UserService } from "../../services/user.service";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';


@Component({
  selector: 'app-unassign',
  templateUrl: './unassign.component.html',
  styleUrls: ['./unassign.component.css']
})
export class UnassignComponent implements OnInit {
  public userData:any;
  public taskData:any;
  public array2:any;
  public name:any;
  public registerData:any;
  public message: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;

  constructor(private _task:TaskService , private _snackBar: MatSnackBar , private _userService: UserService) { 
    this.message="";
    this.userData={}
  }

  ngOnInit(): void {
    this.getUserData()
  }

  getUserData(){
    this._userService.listUser().subscribe(
      (res)=>{
        this.userData = res.users;
        
        for (const iterator of this.userData) {
          this.name = iterator
          console.log(this.name);
        }
      }
    )
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
