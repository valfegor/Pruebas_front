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
  }

  ngOnInit(): void {
    this._arouter.params.subscribe(
      (params)=>{
        this._id=params['_id'];
        this._boardService.getBoardTask(this._id).subscribe(
          (res)=>{
            this.taskData = res.task;
          }
        )
      }
    )
  }

}
