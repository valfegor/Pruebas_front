import { Component, OnInit } from '@angular/core';
import { TaskService } from "../../services/task.service";
import { BoardService } from "../../services/board.service";

@Component({
  selector: 'app-revokeassignment',
  templateUrl: './revokeassignment.component.html',
  styleUrls: ['./revokeassignment.component.css']
})
export class RevokeassignmentComponent implements OnInit {
  public boardData:any;
  public message:string;
  public search:any;
  public taskData: any;
  public userData: any;
  public registerData: any;
  constructor(private _taskService: TaskService , private _boardService: BoardService) {
    this.boardData={};
    this.message=""
    this.search={};
    this.taskData={};
    this.userData={};
    this.registerData = {};
   }

  ngOnInit(): void {
    this.getBoards()
  }




  getBoards() {
    this._boardService.listBoard().subscribe(
      (res) => {
        this.boardData = res.board;
        console.log(this.boardData)
      },
      (err) => {
        this.message = err.error;
        
      }
    );
  }

  listme() {
    

    this._taskService.getTaskMemeber(this.search).subscribe((res) => {
      this.userData = res;
      
    });

    
  }

  listAssigned(){
    console.log(this.registerData)
    this._taskService.Unasign(this.registerData).subscribe(
      
      (res)=>{
        this.taskData = res.task
      },
      (err)=>{
        this.message = err.error;
      }
    )
  }

  removeTask(){
    console.log(this.registerData)
    this._taskService.UnassignTask(this.registerData).subscribe(
      (res)=>{
        console.log(res)
      },
      (err)=>{
        console.log(err.error)
      }
    )
  }
  
}


