import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ENVIRONNEMENT } from '@environments/environment';
import { PASSWORD } from '@app/core/constants/apps';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @ViewChild('email') emailInput!: ElementRef;
  @ViewChild('password') passwordInput!: ElementRef;

  readonly userPassword = PASSWORD;

  constructor(private http: HttpClient) {}
  signIn() {
    // Code pour se connecter et rediriger vers la page correspondant au composant UserComponent.
    const loginURL = ENVIRONNEMENT.baseUrl + ENVIRONNEMENT.urls.login;
    alert('Clic sur le bouton de connexion');

    this.http
      .post(loginURL, {
        email: this.emailInput.nativeElement.value,
        password: this.passwordInput.nativeElement.value,
      })
      .subscribe((returnValue) => {
        console.log(returnValue);
      });
  }

  register() {
    // Code pour créer un nouvel utilisateur
  }
}
