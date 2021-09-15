import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  public env ="";
  constructor(public http: HttpClient) {
    this.env = environment.APP_URL;
   }

   getTasks(){
      return this.http.get<any>(this.env + 'task/listAllTask')
   }


   AssignTask(task: Object){
     
     

     return this.http.put<any>(this.env + 'task/assignTask', task );
   }

   getBoardTask(task: Object){
     return this.http.get<any>(this.env + 'task/listTask/'+ task);
   }

   Unasign(user: Object){
     console.log(user)
     return this.http.post<any>(this.env + 'task/listAllAsigned',user)
   }

   UnassignTask(task: Object){
     return this.http.put<any>(this.env + 'task/unassingTask',task);
   }


   getTaskForBoard(board: Object){
     
     return this.http.post<any>(this.env + 'task/listBoardTasK', board )
   }

   getTaskMemeber(board: Object){
    return this.http.post<any>(this.env + 'task/listmemberstasks', board)
   }
}
