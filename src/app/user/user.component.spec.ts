import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { EncryptService } from '@app/services/auth/encrypt.service';
import { UserComponent } from './user.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

class MockEncryptService {
  decrypt(token: string) {
    return '{"accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhoaGhAa2ZrZmsuZnIiLCJpYXQiOjE3MjUyODcyNjAsImV4cCI6MTcyNTI5MDg2MCwic3ViIjoiMTMifQ._0cGc3wm_bBcqYskemPnWvuXR1eGus5L6fby3Ofj8g0","user":{"email":"hhhh@kfkfk.fr","first":"oaoa01","last":"toto01","initial_balance":"1000","id":13}}';
  }
}

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let encryptService: EncryptService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: EncryptService, useClass: MockEncryptService },
        { provide: Router, useClass: MockRouter },
        //DomSanitizer
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    encryptService = TestBed.inject(EncryptService);
    router = TestBed.inject(Router);
    spyOn(localStorage, 'getItem').and.returnValue('encryptedToken');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display user info from token', () => {
    (component as any).displayUserInfoFromToken();
    expect(component.firstName).toBe('oaoa01');
    expect(component.lastName).toBe('toto01');
    expect(component.eMail).toBe('hhhh@kfkfk.fr');
  });

  it('should navigate to new transaction', () => {
    component.newTransact();
    expect(router.navigate).toHaveBeenCalledWith(['/user/newtransact']);
  });

  it('should logout and navigate to home', () => {
    component.logout();
    //expect(localStorage.getItem('token')).toBeNull();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
