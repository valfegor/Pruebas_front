import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DeleteTasksComponent } from '../../dialogs/delete-tasks/delete-tasks.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { UpdateTaskComponent } from '../../dialogs/update-task/update-task.component';
import { UserService } from "../../services/user.service";

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
  public reload: any;
  
  constructor(
    private _taskService: TaskService,
    private _snackBar: MatSnackBar,
    private _arouter: ActivatedRoute,
    private _dialog: MatDialog,
    private _router: Router,
    private _userService: UserService
  ) {
    this._id = '';
    this.taskData = [];
    this.board = ['to-do', 'in-progress', 'done'];
  }

  ngOnInit(): void {
    this.gettasks();
    this.getprofile();
  }

  getprofile(){
    this._userService.getProfile().subscribe(
      (res)=>{
        this.reload = res.user
      }
    )
  }

  gettasks() {
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
    console.log(task);
    if (task.assigned != true) {
      this.message = 'Sorry please asign this task';
      this._dialog
        .open(UpdateTaskComponent, { data: task, width: '500px' })
        .afterClosed()
        .subscribe((response) => {
          if (response) {
            this._router.navigate(['asign']);
          } else {
            this.message = 'Sorry please asign this task';
            return this.openSnackBarError();
          }
        });
    } else {

      const{_id} = this.reload;

      if(_id != task.assignedTo){
        this.message = 'Failed process the task its asigned to another person please check'
        return this.openSnackBarError()
      }else{

        let tempstatus = task.taskStatus;

        task.taskStatus = status;
        this._taskService.updateTask(task).subscribe(
          (res) => {
            task.status = status;
          },
          (err) => {
            task.status = tempstatus;
            this.message = err.error;
            this.openSnackBarError();
          }
        );
      }

      
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.taskData, event.previousIndex, event.currentIndex);
    console.log(moveItemInArray);
  }

  deleteTask(task: any) {
    this._dialog
      .open(DeleteTasksComponent, { data: task, width: '500px' })
      .afterClosed()
      .subscribe((response) => {
        if (response) {
          this._taskService.deleteTask(task).subscribe(
            (res) => {
              let index = this.taskData.indexOf(task);
              if (index > -1) {
                this.taskData.splice(index, 1);
                this.message = res.message;
                this.openSnackBarError();
              }
            },
            (err) => {
              this.message = err.error;
              this.openSnackBarError();
            }
          );
        }
      });
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
