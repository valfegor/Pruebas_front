import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './home/header/header.component';
import { LoginComponent } from './home/login/login.component';
import { RegisterComponent } from './home/register/register.component';
import { FooterComponent } from './home/footer/footer.component';
import { ListBoardComponent } from './board/list-board/list-board.component';
import { SaveBoardComponent } from './board/save-board/save-board.component';
import { ListUserComponent } from './admin/list-user/list-user.component';
import { RegisterUserComponent } from './admin/register-user/register-user.component';
import { UpdateUserComponent } from './admin/update-user/update-user.component';
import { RegisterRoleComponent } from './admin/register-role/register-role.component';
import { ListRoleComponent } from './admin/list-role/list-role.component';
import { UpdateRoleComponent } from './admin/update-role/update-role.component';
import { ListTaskComponent } from './task/list-task/list-task.component';
import { SaveTaskComponent } from './task/save-task/save-task.component';
import { ListTeamComponent } from './team/list-team/list-team.component';
import { AddMemberComponent } from './team/add-member/add-member.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatMenuModule } from "@angular/material/menu";
import {  MatDividerModule} from "@angular/material/divider";
import {MatDialogModule} from '@angular/material/dialog'; 

//servicios

import { BoardService } from '../app/services/board.service';
import { UserService } from '../app/services/user.service';
import { TokenInterceptorService } from '../app/services/token-interceptor.service';
import { AsignComponent } from './task/asign/asign.component';
import { ListboardtasksComponent } from './board/listboardtasks/listboardtasks.component';
import { UnassignComponent } from './task/unassign/unassign.component';
import { SidenavComponent } from './home/sidenav/sidenav.component';
import {MatListModule} from '@angular/material/list'; 
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { ProfileComponent } from './home/profile/profile.component';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { UpdateBoardComponent } from './board/update-board/update-board.component';
import { DeleteTasksComponent } from './dialogs/delete-tasks/delete-tasks.component';
import { RevokeassignmentComponent } from './task/revokeassignment/revokeassignment.component';
import { SharedBoardsComponent } from './board/shared-boards/shared-boards.component';
import {DragDropModule} from '@angular/cdk/drag-drop'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    ListBoardComponent,
    SaveBoardComponent,
    ListUserComponent,
    RegisterUserComponent,
    UpdateUserComponent,
    RegisterRoleComponent,
    ListRoleComponent,
    UpdateRoleComponent,
    ListTaskComponent,
    SaveTaskComponent,
    ListTeamComponent,
    AddMemberComponent,
    AsignComponent,
    ListboardtasksComponent,
    UnassignComponent,
    SidenavComponent,
    ProfileComponent,
    WelcomeComponent,
    UpdateBoardComponent,
    DeleteTasksComponent,
    RevokeassignmentComponent,
    SharedBoardsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatIconModule,
    MatSelectModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatMenuModule,
    MatDividerModule,
    MatListModule,
    CarouselModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    DragDropModule
  ],
  providers: [
    UserService,
    BoardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
