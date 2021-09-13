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
  public tasksassinged:any;
  public show:boolean;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;

  constructor(private _task:TaskService , private _snackBar: MatSnackBar , private _userService: UserService) { 
    this.message="";
    this.userData={}
    this.registerData={};
    this.tasksassinged={}
    this.show = false;
    
  }

  ngOnInit(): void {
    this.getUserData()
    this.listme()
    
  }

  getUserData(){
    this._userService.listUserAll().subscribe(
      (res)=>{
        this.userData = res.users;
        
        
      }
    )
}

listme(){
  console.log(this.registerData)
  this._task.Unasign(this.registerData).subscribe(
    (res)=>{
      this.tasksassinged= res.task;
      console.log(this.tasksassinged)
      this.show = true;

      
      
      
    }
  )
}


unassignThistask(){
  if(!this.registerData._idTask || ! this.registerData._idUser){
    this.message = "Sorry have to fill al the camps please check"
  }
  else{
    this._task.UnassignTask(this.registerData).subscribe(
      (res)=>{
        this.message = res.message;
        this.openSnackBarSuccesfull();
        this.listme()
      },
      (error)=>{
        console.log(error)
        this.message= error;
        this.openSnackBarError();
        
      }
    )
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
