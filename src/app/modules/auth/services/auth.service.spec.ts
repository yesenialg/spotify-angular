import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import * as mockRaw from '../../../data/user.json'
import { of } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let mockUser: any = (mockRaw as any).default;
  let mockCookieService;
  let httpClientSpy: { post: jasmine.Spy }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    mockCookieService = jasmine.createSpyObj('CookieService', ['get','check', 'set', 'delete']);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    service = new AuthService(httpClientSpy as any, mockCookieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return object with "data" and "tokenSession"', () => {
    
    //Arrange
    const user: any = mockUser.userOk;
    const mockResponse = {
      data:{},
      tokenSession: '1x1x1x1'
    }
    httpClientSpy.post.and.returnValue(
      of(mockResponse)
    )

    //Act
    service.sendCredentials(user.email, user.password)
    .subscribe(response => {
      const properties = Object.keys(response);
      
      //Assert
      expect(properties).toContain('data');
      expect(properties).toContain('tokenSession');
    })
  });
});
