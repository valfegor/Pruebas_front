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
  public user:any;
  public ruta:any;
  public id:any;
  public ids:any;
  
  constructor(
    private _boardService: TaskService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) { 

    this.user = {};
    this.ruta = {};
    this.id={};
    this.ids="";
  }

  ngOnInit(): void {
    this.ruta = this.route.params;
    this.id=this.ruta._value;
    console.log(this.id._id)
    this.ids=this.id._id
    console.log(this.ids);
    this._boardService.getBoardTask(this.ids).subscribe(
      (res)=>{
        this.taskData = res.task
        console.log(this.taskData)
      }
    )  
  }

}
