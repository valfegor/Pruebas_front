import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BoardService } from 'src/app/services/board.service';

@Component({
  selector: 'app-list-team',
  templateUrl: './list-team.component.html',
  styleUrls: ['./list-team.component.css'],
})
export class ListTeamComponent implements OnInit {
  displayedColumns: string[] = ['NAME', 'ROLE', 'RANKING', 'ACTIONS'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort = new MatSort();
  memberData: any;
  message: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;
  _id: string;
  board: any;
  userId: string;
  member: any;

  constructor(
    private _boardService: BoardService,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _arouter: ActivatedRoute
  ) {
    this._id = '';
    this.memberData = {};
    this.board = {};
    this.userId=  '';
    this.member = {};
    this.dataSource = new MatTableDataSource(this.memberData);
  }

  ngOnInit(): void {
    this._arouter.params.subscribe(
      (params) => {
        this._id = params['_id'];
        this._boardService.getBoard(this._id).subscribe(
          (res) => {
            this.memberData = res.board.members;
            console.log(this.memberData);
            
            this.dataSource = new MatTableDataSource(this.memberData);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          },
          (err) => {
            this.message = err.error;
            this.openSnackBarError();
          }
        );
      },
      (err) => {
        this.message = err.error;
        this.openSnackBarError();
      }
    );
  }

  deleteMember(user: any){
    this.userId = user._id;
    this.member = {
      "userId" : user.id,
      "boardId" : this._id,
    };

    this._boardService.deleteMember(this.member).subscribe(
      (res)=>{
        let index = this.memberData.indexOf(user);
        if (index > -1) {
          this.memberData.splice(index, 1);
          this.dataSource = new MatTableDataSource(this.memberData);
          this.message = 'Member Remove';
          this.openSnackBarSuccesfull();
        }
      },
      (err)=>{
        console.log(err.error);
        this.message = err.error;
        this.openSnackBarError();
        
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
