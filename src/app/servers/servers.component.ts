import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServersService } from './services/servers.service';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  public servers: {id: number, name: string, status: string}[] = [];

  constructor(private serversService: ServersService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.servers = this.serversService.getServers();
  }

  // onReload() {
  //   this.router.navigate(['servers'], {relativeTo: this.activatedRoute});//relative path
  // }
}
