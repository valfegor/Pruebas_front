import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { TaskService } from '../../services/task.service';
import { BoardService } from '../../services/board.service';
import Swal from 'sweetalert2';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-asign',
  templateUrl: './asign.component.html',
  styleUrls: ['./asign.component.css'],
})
export class AsignComponent implements OnInit {
  public search: any;
  public userData: any;
  public boardData: any;
  public taskData: any;
  public array2: any;
  public name: any;
  public registerData: any;
  message: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;

  constructor(
    private _userService: UserService,
    private _taskService: TaskService,
    private _snackBar: MatSnackBar,
    private _boardService: BoardService
  ) {
    this.userData = {};
    this.boardData = {};
    this.taskData = {};
    this.array2 = [];
    this.name = [];
    this.message = '';
    this.registerData = {};
    this.search = {};
  }

  ngOnInit(): void {
    this.getBoards();
  }

  listme() {
    this._taskService.getTaskForBoard(this.search).subscribe(
      (res) => {
        this.taskData = res.filter;
      },
      (err) => {
        console.log(err.error);
      }
    );

    this._taskService.getTaskMemeber(this.search).subscribe((res) => {
      this.userData = res;
    });
  }

  open() {
    if (!this.registerData._idUser || !this.registerData._idtask) {
      this.message = 'Failed process please check all the camps';
      this.openSnackBarError();
    } else {
      Swal.fire({
        title: 'Are you sure you want Asign this task?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Asign!',
        cancelButtonText: 'No, keep it',
      }).then((result) => {
        if (result.isConfirmed) {
          this._taskService.AssignTask(this.registerData).subscribe(
            (res) => {
              Swal.fire('Asigned!', 'Your file has been Asigned.', 'success');
              this.listme();
            },
            (err) => {
              Swal.fire(
                'Sorry you are not the Owner please contact the Owner',
                'Cant unsubscribe the task',
                'error'
              );
            }
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'You cancell the process have a nice day',
            'error'
          );
        }
      });
    }
  }

  getBoards() {
    this._boardService.listBoard().subscribe(
      (res) => {
        this.boardData = res.board;
      },
      (err) => {
        this.message = err.error;
        this.openSnackBarError();
      }
    );
  }

  assingTask() {
    this._taskService.AssignTask(this.registerData).subscribe(
      (res) => {
        console.log(res);
        this.message = 'Task asign';
        this.openSnackBarSuccesfull();
        this.listme();
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
