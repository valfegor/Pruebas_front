import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-listboardtasks',
  templateUrl: './listboardtasks.component.html',
  styleUrls: ['./listboardtasks.component.css']
})
export class ListboardtasksComponent implements OnInit {
  taskData: any;
  message: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;
  _id:String;
  
  constructor(
    private _boardService: TaskService,
    private _snackBar: MatSnackBar,
    private _arouter: ActivatedRoute,
  ) { 
    this._id=""
    this.taskData=[]
  }

  ngOnInit(): void {
    this._arouter.params.subscribe(
      (params)=>{
        this._id=params['_id'];
        this._boardService.getBoardTask(this._id).subscribe(
          (res)=>{
            this.taskData = res.task;
          },
          (err)=>{
            this.message=err.error;
            this.openSnackBarError()

          }
        )
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
