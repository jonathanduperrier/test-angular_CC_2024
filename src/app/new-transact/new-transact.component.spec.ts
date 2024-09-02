import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { AccessDbService } from '@app/services/access_db/access-db.service';
import { EncryptService } from '@app/services/auth/encrypt.service';
import { NewTransactComponent } from './new-transact.component';


describe('NewTransactComponent', () => {
  let component: NewTransactComponent;
  let fixture: ComponentFixture<NewTransactComponent>;
  let mockRouter = { navigate: jasmine.createSpy('navigate') };
  let mockEncryptService = { decrypt: jasmine.createSpy('decrypt').and.returnValue('{"accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhoaGhAa2ZrZmsuZnIiLCJpYXQiOjE3MjUyODcyNjAsImV4cCI6MTcyNTI5MDg2MCwic3ViIjoiMTMifQ._0cGc3wm_bBcqYskemPnWvuXR1eGus5L6fby3Ofj8g0","user":{"email":"hhhh@kfkfk.fr","first":"oaoa01","last":"toto01","initial_balance":"1000","id":13}}') };
  let mockAccessDbService = { getData: jasmine.createSpy('getData').and.returnValue(of({ users: [{ email: 'hhhh@kfkfk.fr', id: 1 }] })) };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTransactComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: EncryptService, useValue: mockEncryptService },
        { provide: AccessDbService, useValue: mockAccessDbService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTransactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize token and userId on ngOnInit', () => {
    component.ngOnInit();
    expect(component.token).toBe('{"accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhoaGhAa2ZrZmsuZnIiLCJpYXQiOjE3MjUyODcyNjAsImV4cCI6MTcyNTI5MDg2MCwic3ViIjoiMTMifQ._0cGc3wm_bBcqYskemPnWvuXR1eGus5L6fby3Ofj8g0","user":{"email":"hhhh@kfkfk.fr","first":"oaoa01","last":"toto01","initial_balance":"1000","id":13}}');
    expect(component.eMail).toBe('hhhh@kfkfk.fr');
  });

  it('should unsubscribe from selectedData on ngOnDestroy', () => {
    (component as any).selectedData = of().subscribe();
    spyOn((component as any).selectedData, 'unsubscribe');
    component.ngOnDestroy();
    expect((component as any).selectedData.unsubscribe).toHaveBeenCalled();
  });

  it('should verify email correctly', () => {
    expect((component as any).verifyEmail('test@example.com')).toBeTrue();
    expect((component as any).verifyEmail('invalid-email')).toBeFalse();
  });

  it('should verify amount and balance correctly', () => {
    component.balance = 10000; // 100.00 €
    expect((component as any).verifyAmountBalance(50, component.balance)).toBeTrue();
    expect((component as any).verifyAmountBalance(150, component.balance)).toBeFalse();
  });

  it('should navigate to /user on cancel', () => {
    component.cancel();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/user']);
  });
});
