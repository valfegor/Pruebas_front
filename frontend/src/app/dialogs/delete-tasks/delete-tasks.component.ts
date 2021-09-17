import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-delete-tasks',
  templateUrl: './delete-tasks.component.html',
  styleUrls: ['./delete-tasks.component.css']
})
export class DeleteTasksComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) {}

  ngOnInit(): void {
  }

}
