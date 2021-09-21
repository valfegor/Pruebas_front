import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListBoardComponent } from './board/list-board/list-board.component';
import { SaveBoardComponent } from './board/save-board/save-board.component';
import { ListTaskComponent } from './task/list-task/list-task.component';
import { SaveTaskComponent } from './task/save-task/save-task.component';
import { AsignComponent } from './task/asign/asign.component';
import { ListboardtasksComponent } from '../app/board/listboardtasks/listboardtasks.component';
import { UnassignComponent } from './task/unassign/unassign.component';
import { ProfileComponent } from './home/profile/profile.component';
import { ListRoleComponent } from './admin/list-role/list-role.component';
import { ListUserComponent } from './admin/list-user/list-user.component';
import { RegisterRoleComponent } from './admin/register-role/register-role.component';
import { UpdateRoleComponent } from './admin/update-role/update-role.component';
import { UpdateUserComponent } from './admin/update-user/update-user.component';
import { LoginComponent } from './home/login/login.component';
import { RegisterComponent } from './home/register/register.component';
import { ListTeamComponent } from './team/list-team/list-team.component';
import { AddMemberComponent } from './team/add-member/add-member.component';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { RevokeassignmentComponent } from './task/revokeassignment/revokeassignment.component';
import { UpdateBoardComponent } from './board/update-board/update-board.component';
import { SharedBoardsComponent } from './board/shared-boards/shared-boards.component';
import { SharedprofileComponent } from "./user/sharedprofile/sharedprofile.component";


//guard.

import { AuthGuard } from "../app/guard/auth.guard";

const routes: Routes = [
  { path: '', component: WelcomeComponent, pathMatch: 'full' },
  { path: 'registerUser', component: RegisterComponent },
  { path: 'signUp', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'listUser', component: ListUserComponent , canActivate: [AuthGuard]},
  { path: 'registerRole', component: RegisterRoleComponent , canActivate: [AuthGuard]},
  { path: 'updateRole', component: UpdateRoleComponent , canActivate: [AuthGuard]},
  { path: 'updateUser/:_id', component: UpdateUserComponent , canActivate: [AuthGuard]},
  { path: 'listRole', component: ListRoleComponent , canActivate: [AuthGuard]},
  { path: 'listTask', component: ListTaskComponent, canActivate: [AuthGuard] },
  { path: 'saveTask', component: SaveTaskComponent , canActivate: [AuthGuard]},
  { path: 'saveBoard', component: SaveBoardComponent , canActivate: [AuthGuard]},
  { path: 'listBoard', component: ListBoardComponent , canActivate: [AuthGuard]},
  { path: 'asign', component: AsignComponent, canActivate: [AuthGuard] },
  { path: 'listBoard/listboardtasks/:_id', component: ListboardtasksComponent , canActivate: [AuthGuard]},
  { path: 'unassign', component: UnassignComponent , canActivate: [AuthGuard]},
  { path: 'profile', component: ProfileComponent , canActivate: [AuthGuard]},
  { path: 'listBoard/listMembers/:_id', component: ListTeamComponent , canActivate: [AuthGuard]},
  { path: 'addMember/:_id', component: AddMemberComponent , canActivate: [AuthGuard]},
  { path: 'listUser', component : ListUserComponent , canActivate: [AuthGuard]},
  { path: 'registerRole', component : RegisterRoleComponent , canActivate: [AuthGuard]},
  { path: 'updateRole/:_id', component : UpdateRoleComponent , canActivate: [AuthGuard]},
  { path: 'updateUser/:_id', component : UpdateUserComponent , canActivate: [AuthGuard]},
  { path: 'listRole', component : ListRoleComponent , canActivate: [AuthGuard]},
  { path: 'listTask', component : ListTaskComponent , canActivate: [AuthGuard]},
  { path: 'saveTask', component : SaveTaskComponent , canActivate: [AuthGuard]},
  { path: 'saveBoard', component : SaveBoardComponent , canActivate: [AuthGuard]},
  { path: 'listBoard', component : ListBoardComponent , canActivate: [AuthGuard]},
  {path: 'asign', component : AsignComponent , canActivate: [AuthGuard]},
  {path: 'listBoard/listboardtasks/:_id', component : ListboardtasksComponent , canActivate: [AuthGuard]},
  {path: 'SharedBoards/listboardtasks/:_id', component : ListboardtasksComponent , canActivate: [AuthGuard]},
  {path:'unassign',component:UnassignComponent , canActivate: [AuthGuard]},
  { path: 'profile', component : ProfileComponent , canActivate: [AuthGuard]},
  { path: 'welcome', component : WelcomeComponent , canActivate: [AuthGuard]},
  { path: 'updateBoard/:_id', component : UpdateBoardComponent, canActivate: [AuthGuard]},
  {path:'revoke',component:RevokeassignmentComponent, canActivate: [AuthGuard]},
  {path:'SharedBoards',component:SharedBoardsComponent , canActivate: [AuthGuard]},
  {path:"SharedProfile/findUser/:_id"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
