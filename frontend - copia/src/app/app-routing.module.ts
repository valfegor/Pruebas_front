import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListRoleComponent } from './admin/list-role/list-role.component';
import { ListUserComponent } from './admin/list-user/list-user.component';
import { RegisterRoleComponent } from './admin/register-role/register-role.component';
import { UpdateRoleComponent } from './admin/update-role/update-role.component';
import { UpdateUserComponent } from './admin/update-user/update-user.component';
import { ListBoardComponent } from './board/list-board/list-board.component';
import { SaveBoardComponent } from './board/save-board/save-board.component';
import { LoginComponent } from './home/login/login.component';
import { RegisterComponent } from './home/register/register.component';
import { ListTaskComponent } from './task/list-task/list-task.component';
import { SaveTaskComponent } from './task/save-task/save-task.component';
import { AsignComponent } from './task/asign/asign.component';
import { ListboardtasksComponent } from '../app/board/listboardtasks/listboardtasks.component';
import { UnassignComponent } from './task/unassign/unassign.component';
import { RevokeassignmentComponent } from './admin/revokeassignment/revokeassignment.component';
import { AuthGuard } from '../../../frontend/src/app/guard/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  {
    path: 'registerUser',
    component: RegisterComponent,
    
  },
  { path: 'signUp', component: RegisterComponent, },
  { path: 'login', component: LoginComponent, },
  { path: 'listUser', component: ListUserComponent, canActivate: [AuthGuard] },
  {
    path: 'registerRole',
    component: RegisterRoleComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'updateRole',
    component: UpdateRoleComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'updateUser',
    component: UpdateUserComponent,
    canActivate: [AuthGuard],
  },
  { path: 'listRole', component: ListRoleComponent, canActivate: [AuthGuard] },
  { path: 'listTask', component: ListTaskComponent, canActivate: [AuthGuard] },
  { path: 'saveTask', component: SaveTaskComponent, canActivate: [AuthGuard] },
  {
    path: 'saveBoard',
    component: SaveBoardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'listBoard',
    component: ListBoardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'asign', component: AsignComponent, canActivate: [AuthGuard] },
  {
    path: 'listBoard/listboardtasks/:_id',
    component: ListboardtasksComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'unassign',
    component: RevokeassignmentComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
