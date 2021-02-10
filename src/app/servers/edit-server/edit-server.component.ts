import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ServersService } from '../services/servers.service';
import { CanComponentDeactivate } from './services/can-deactivate-guard.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;

  constructor(private serversService: ServersService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if(!this.allowEdit) {
      return true;
    } else if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status)
      && !this.changesSaved) {
      return confirm('Do you want to discard the changes?');
    }
    return true;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.server = this.serversService.getServer(+params['id']);
        this.serverName = this.server.name;
        this.serverStatus = this.server.status;
      }
    );
    this.activatedRoute.queryParams.subscribe(
      (queryParams: Params) => {
        this.allowEdit = queryParams['allowEdit'] === '1';
      }
    );
    // this.activatedRoute.fragment.subscribe();
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }
}
