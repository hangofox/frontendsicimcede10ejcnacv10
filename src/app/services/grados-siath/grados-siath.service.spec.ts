import { TestBed } from '@angular/core/testing';
import { GradosSiathService } from './grados-siath.service';

describe('GradosSiathService', () => {
  let service: GradosSiathService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GradosSiathService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
