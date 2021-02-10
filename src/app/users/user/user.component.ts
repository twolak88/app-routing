import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: {id: number, name: string};
  paramsSubscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();//angular do this automatically, but own observables need to be done this
  }

  ngOnInit(): void {
    this.paramsSubscription = this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.user = {
          id: params['id'],
          name: params['name']
        };
    });
  }
}
