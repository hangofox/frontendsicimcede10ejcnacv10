import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HistorialProyeccMunicEspecService } from './historial-proyecc-munic-espec.service';

describe('HistorialProyeccMunicEspecService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [provideHttpClient(), provideHttpClientTesting()]
  }));

  it('should be created', () => {
    expect(TestBed.inject(HistorialProyeccMunicEspecService)).toBeTruthy();
  });
});
