import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { EquiposTransportesComponent } from './equipos-transportes.component';

describe('EquiposTransportesComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [EquiposTransportesComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    }).compileComponents();

    expect(TestBed.createComponent(EquiposTransportesComponent).componentInstance).toBeTruthy();
  });
});
