import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AccessDbService } from './access-db.service';
import { EncryptService } from '@app/services/auth/encrypt.service';
import { ENVIRONNEMENT } from '@environments/environment';
import { RouterModule } from '@angular/router';

describe('AccessDbService', () => {
  let service: AccessDbService;
  let httpMock: HttpTestingController;
  let encryptServiceSpy: jasmine.SpyObj<EncryptService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('EncryptService', ['encrypt']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        AccessDbService,
        { provide: EncryptService, useValue: spy },
        RouterModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    service = TestBed.inject(AccessDbService);
    httpMock = TestBed.inject(HttpTestingController);
    encryptServiceSpy = TestBed.inject(EncryptService) as jasmine.SpyObj<EncryptService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch data from JSON file', () => {
    const dummyData = [{ id: 1, name: 'Test' }];
    service.getData().subscribe(data => {
      expect(data.length).toBe(1);
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne('assets/db.json');
    expect(req.request.method).toBe('GET');
    req.flush(dummyData);
  });

  it('should login user and store token', () => {
    const dummyUser = { username: 'test', password: 'test' };
    const dummyResponse = { token: '12345' };
    encryptServiceSpy.encrypt.and.returnValue('encryptedToken');

    service.loginUser(dummyUser);

    const req = httpMock.expectOne(ENVIRONNEMENT.baseUrl + ENVIRONNEMENT.urls.login);
    expect(req.request.method).toBe('POST');
    req.flush(dummyResponse);

    expect(localStorage.getItem('token')).toBe('encryptedToken');
  });
});