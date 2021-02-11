import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';

import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { CanDeactivateGuard } from './servers/edit-server/services/can-deactivate-guard.service';
import { ServerComponent } from './servers/server/server.component';
import { ServerResolver } from './servers/server/services/server-resolver.service';
import { ServersComponent } from './servers/servers.component';
import { AuthGuard } from './services/auth-guard.service';
import { UserComponent } from './users/user/user.component';
import { UsersComponent } from './users/users.component';

const appRoutes: Routes = [
  // { path: '', redirectTo: '/not-found', pathMatch: 'full' } //pathMatch should be used here to match exact patch
                                                               //without this it will mach all paths and alway redirect to
  { path: '', component: HomeComponent },
  { path: 'users', component: UsersComponent, children: [
    { path: ':id/:name', component: UserComponent } //dynamic parameter id
  ] },
  { path: 'servers',
    // canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: ServersComponent,
    children:[
    { path: ':id', component: ServerComponent, resolve: {server: ServerResolver}},
    { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard] }
  ] },
  // { path: 'not-found', component: PageNotFoundComponent },
  { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'} },
  { path: '**', redirectTo: '/not-found' }
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule] //export RouterModule to other modules that imports AppRoutingModule
})
export class AppRoutingModule { }
