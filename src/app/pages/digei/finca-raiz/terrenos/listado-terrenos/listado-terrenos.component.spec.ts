import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ListadoTerrenosComponent } from './listado-terrenos.component';

describe('ListadoTerrenosComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoTerrenosComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();
    expect(TestBed.createComponent(ListadoTerrenosComponent).componentInstance).toBeTruthy();
  });
});
