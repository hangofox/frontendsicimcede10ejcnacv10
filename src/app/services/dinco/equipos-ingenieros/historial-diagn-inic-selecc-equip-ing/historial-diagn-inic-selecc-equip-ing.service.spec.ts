import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HistorialDiagnInicSeleccEquipIngService } from './historial-diagn-inic-selecc-equip-ing.service';

describe('HistorialDiagnInicSeleccEquipIngService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [provideHttpClient(), provideHttpClientTesting()]
  }));

  it('should be created', () => {
    expect(TestBed.inject(HistorialDiagnInicSeleccEquipIngService)).toBeTruthy();
  });
});
