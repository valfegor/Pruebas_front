import { Component, OnInit } from '@angular/core';
import { TaskService } from "../../services/task.service";
import { BoardService } from "../../services/board.service";
import Swal from 'sweetalert2'


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


  alert(){
    Swal.fire({
      title: 'Are you sure you want to unsubscribe the task?',
      text: 'The task will be assigned to the administrator and then assigned to a board member.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, unsubscribe!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this._taskService.UnassignTask(this.registerData).subscribe(
          (res)=>{
            Swal.fire(
              'unsubscribed!',
              'Your file has been unsubscribe.',
              'success'
            );
            this.listAssigned();
          },
          (err)=>{
            Swal.fire(
              'Sorry you are not the Owner please contact the Owner',
              'Cant unsubscribe the task',
              'error'
            );
            console.log(err.error)
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
        this.listAssigned();
      },
      (err)=>{
        console.log(err.error)
      }
    )
  }
  
}


