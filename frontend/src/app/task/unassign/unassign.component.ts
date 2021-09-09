import { Component, OnInit } from '@angular/core';
import { TaskService } from "../../services/task.service";

@Component({
  selector: 'app-unassign',
  templateUrl: './unassign.component.html',
  styleUrls: ['./unassign.component.css']
})
export class UnassignComponent implements OnInit {
  public userdata:any;

  constructor(private _task:TaskService) { 
    this.userdata = {}
  }

  ngOnInit(): void {
  }

  

}
