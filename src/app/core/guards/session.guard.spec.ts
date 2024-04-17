import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing'

import { sessionGuard } from './session.guard';

describe('sessionGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => sessionGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ]
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
