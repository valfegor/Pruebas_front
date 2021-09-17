import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DeleteTasksComponent } from "../../dialogs/delete-tasks/delete-tasks.component";
import Swal from 'sweetalert2'
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-listboardtasks',
  templateUrl: './listboardtasks.component.html',
  styleUrls: ['./listboardtasks.component.css'],
})
export class ListboardtasksComponent implements OnInit {
  taskData: any;
  message: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;
  _id: String;
  board: Array<string>;
  constructor(
    private _taskService: TaskService,
    private _snackBar: MatSnackBar,
    private _arouter: ActivatedRoute,
    private _dialog: MatDialog
  ) {
    this._id = '';
    this.taskData = [];
    this.board = ['to-do', 'in-progress', 'done'];
  }

  ngOnInit(): void {
    this.gettasks()
  }

  gettasks(){
    this._arouter.params.subscribe((params) => {
      this._id = params['_id'];
      this._taskService.getBoardTask(this._id).subscribe(
        (res) => {
          this.taskData = res.task;
          console.log(this.taskData);
        },
        (err) => {
          this.message = err.error;
          this.openSnackBarError();
        }
      );
    });
  }

  updateTask(task: any, status: string) {
    let tempstatus = task.taskStatus;
    task.taskStatus = status;
    this._taskService.updateTask(task).subscribe(
      (res) => {
        task.status=status;
        
      },
      (err)=>{
        task.status=tempstatus;
        this.message = err.error;
        this.openSnackBarError();
        location.reload();
      }
    )
  }

  open(){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      position:'bottom-start',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

  deleteTask(task:any){
    this._dialog.open(DeleteTasksComponent,{data:task,width:'500px'})
    .afterClosed()
    .subscribe(response=>{
      if(response){
        alert("diste clic en si mierda")
      }
    })
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
