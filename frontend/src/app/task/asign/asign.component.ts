import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { TaskService } from "../../services/task.service";
import {  BoardService} from "../../services/board.service";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-asign',
  templateUrl: './asign.component.html',
  styleUrls: ['./asign.component.css']
})
export class AsignComponent implements OnInit {
  public userData:any;
  public boardData:any;
  public taskData:any;
  public array2:any;
  public name:any;
  public registerData:any;
  message: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;
  
  constructor(private _userService: UserService , private _taskService: TaskService , private _snackBar: MatSnackBar , private _boardService: BoardService) { 
    this.userData ={};
    this.boardData={};
    this.taskData ={};
    this.array2=[];
    this.name={};
    this.message="";
    this.registerData={};
    
  }

  ngOnInit(): void {
    this.getUserData();
    this.getTaskData();
    this.getBoards();
  }


  getUserData(){
      this._userService.listUserAll().subscribe(
        (res)=>{
          this.userData = res.users;
          
          
        }
      )
  }


  getBoards(){
    this._boardService.listBoard().subscribe(
      (res)=>{
          this.boardData = res.board
          console.log(this.boardData)
      }
    )
  }

  getTaskData(){
    this._taskService.getTasks().subscribe(
        (res)=>{
          this.taskData= res.filtro;
          
          
        }
    )
  }

  

  assingTask(){
    
    console.log(this.registerData),
    
    this._taskService.AssignTask(this.registerData).subscribe(
      
      (res)=>{
        console.log(res);
        this.message = "Task asign";
        this.openSnackBarSuccesfull();
        this.getTaskData()
      },
      (err)=>{
        this.message = err.error;
        this.openSnackBarError();
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
