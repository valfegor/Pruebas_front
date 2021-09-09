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


   AssignTask(task: any){
     console.log(task)
     

     return this.http.put<any>(this.env + 'task/assignTask', task );
   }

   getBoardTask(task: any){
     return this.http.get<any>(this.env + 'task/listTask/'+ task);
   }

   Unasign(task: any){
     return this.http.get<any>(this.env + 'task/listAllAsigned'+task._id)
   }
}
