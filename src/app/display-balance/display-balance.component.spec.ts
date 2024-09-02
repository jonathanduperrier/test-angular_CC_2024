import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DisplayBalanceComponent } from './display-balance.component';
import { AccessDbService } from '@app/services/access_db/access-db.service';
import { of } from 'rxjs';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

describe('DisplayBalanceComponent', () => {
  let component: DisplayBalanceComponent;
  let fixture: ComponentFixture<DisplayBalanceComponent>;
  let accessDbServiceStub: Partial<AccessDbService>;

  beforeEach(async () => {
    registerLocaleData(localeFr, 'fr');
    accessDbServiceStub = {
      getData: () => of({
        users: [{ id: '1', initial_balance: 1000 }],
        transactions: [
          { fromUserId: '1', toUserId: '2', amount: 200 },
          { fromUserId: '2', toUserId: '1', amount: 300 }
        ]
      })
    };

    await TestBed.configureTestingModule({
      declarations: [DisplayBalanceComponent],
      providers: [{ provide: AccessDbService, useValue: accessDbServiceStub },
                  { provide: LOCALE_ID, useValue: 'fr' }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayBalanceComponent);
    component = fixture.componentInstance;
    component.userId = '1';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate the correct balance', () => {
    (component as any).displayBalance();
    expect((component as any).initialBalance).toBe(1000);
    expect((component as any).calculatedBalance).toBe(1100);
  });

  it('should emit the calculated balance', () => {
    spyOn(component.returnCalculatedBalance, 'emit');
    (component as any).displayBalance();
    expect(component.returnCalculatedBalance.emit).toHaveBeenCalledWith(1100);
  });

  it('should unsubscribe from selectedData on destroy', () => {
    spyOn((component as any).selectedData, 'unsubscribe');
    component.ngOnDestroy();
    expect((component as any).selectedData.unsubscribe).toHaveBeenCalled();
  });
});
