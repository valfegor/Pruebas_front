import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import Swal from 'sweetalert2'
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

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
    private _arouter: ActivatedRoute
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

  deleteTask(task: any){
    Swal.fire({
      title: 'Are you sure you want to unsubscribe the task?',
      text: 'The task will be assigned to the administrator and then assigned to a board member.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, unsubscribe!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'unsubscribed!',
          'Your file has been unsubscribe.',
          'success'
        );
        this._taskService.deleteTask(task).subscribe(
          (res)=>{
            let index = this.taskData.indexOf(task);
            if(index>-1){
              this.taskData.splice(index,1);
              this.message=res.message;
              this.openSnackBarError();
            
            
  
            }
            
          },
          (err)=>{
            this.message=err.error;
            this.openSnackBarError();
          }
      )
      
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'You cancell the process have a nice day',
          'error'
        )
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
