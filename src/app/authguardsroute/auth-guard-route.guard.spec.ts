import { TestBed } from '@angular/core/testing';
import { AuthGuardRoute } from './auth-guard-route.guard';

describe('AuthGuardRoute', () => {
  let guard: AuthGuardRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthGuardRoute);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
