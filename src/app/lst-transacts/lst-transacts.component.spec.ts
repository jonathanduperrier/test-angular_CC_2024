import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LstTransactsComponent } from './lst-transacts.component';
import { AccessDbService } from '@app/services/access_db/access-db.service';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

describe('LstTransactsComponent', () => {
  let component: LstTransactsComponent;
  let fixture: ComponentFixture<LstTransactsComponent>;
  let accessDbServiceStub: Partial<AccessDbService>;

  beforeEach(async () => {
    // Stub for AccessDbService
    registerLocaleData(localeFr, 'fr');
    accessDbServiceStub = {
      getData: () => of({
        transactions: [
          { id: '1', fromUserId: 'user1', toUserId: 'user2', amount: 100, date: '2023-01-01T00:00:00Z' },
          { id: '2', fromUserId: 'user2', toUserId: 'user1', amount: 200, date: '2023-01-02T00:00:00Z' }
        ],
        users: [
          { id: 'user1', first: 'John', last: 'Doe' },
          { id: 'user2', first: 'Jane', last: 'Smith' }
        ]
      })
    };

    await TestBed.configureTestingModule({
      declarations: [ LstTransactsComponent ],
      providers: [
        { provide: AccessDbService, useValue: accessDbServiceStub },
        { provide: LOCALE_ID, useValue: 'fr' }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LstTransactsComponent);
    component = fixture.componentInstance;
    component.userId = 'user1';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display transactions', () => {
    (component as any).displayTransacts();
    //expect(component.lstTransactsDisplay.length).toBe(2);
    expect(component.lstTransactsDisplay[0].type).toBe('débit');
    expect(component.lstTransactsDisplay[1].type).toBe('crédit');
  });

  it('should filter transactions', () => {
    component.searchTerm = 'John';
    component.applyFilter();
    expect(component.filteredList.length).toBe(1);
    expect(component.filteredList[0].first).toBe('John');
  });

  it('should sort transactions', () => {
    component.sortData('amount');
    expect(component.filteredList[0].amount).toBe(-100);
    component.sortData('amount');
    expect(component.filteredList[0].amount).toBe(200);
  });

  it('should paginate transactions', () => {
    component.itemsPerPage = 1;
    (component as any).paginate();
    expect(component.paginatedList.length).toBe(1);
    expect(component.paginatedList[0].id).toBe('1');
    component.nextPage();
    expect(component.paginatedList[0].id).toBe('2');
  });
});
