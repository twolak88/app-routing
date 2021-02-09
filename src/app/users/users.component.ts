import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users = [
    {
      id: 1,
      name: 'Tom'
    },
    {
      id: 2,
      name: 'Kate'
    },
    {
      id: 3,
      name: 'Chris'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
