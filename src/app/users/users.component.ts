import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ENVIRONNEMENT } from '@environments/environment';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  columns: string[] = ['Id', 'Prénom', 'Nom', 'Email', 'Montant'];
  dataSource: any;

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.http
      .get(ENVIRONNEMENT.baseUrl + ENVIRONNEMENT.urls.users)
      .subscribe((data) => (this.dataSource = data));
  }
}
