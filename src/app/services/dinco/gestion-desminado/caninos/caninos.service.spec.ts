import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CaninosService } from './caninos.service';

describe('CaninosService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [provideHttpClient(), provideHttpClientTesting()]
  }));

  it('should be created', () => {
    expect(TestBed.inject(CaninosService)).toBeTruthy();
  });
});
