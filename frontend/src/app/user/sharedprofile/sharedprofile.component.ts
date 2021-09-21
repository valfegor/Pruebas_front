import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-sharedprofile',
  templateUrl: './sharedprofile.component.html',
  styleUrls: ['./sharedprofile.component.css']
})
export class SharedprofileComponent implements OnInit {
  public id:any;
  public user_id: any;
  
  constructor(private _client:ActivatedRoute) { 
    this.id={}
  }

  ngOnInit(): void {
  }



  getUser(){

  }

}
