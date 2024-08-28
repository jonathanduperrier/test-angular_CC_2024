import { Component } from '@angular/core';
import { AuthService } from '@app/services/auth/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  constructor() {

  }

  ngOnInit() {
    let token = localStorage.getItem('token');
    //let objToken = JSON.parse(token);
    console.log("token : ");
    console.log(token);
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}

