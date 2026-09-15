import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ListadoCentrosCostosOficinasComponent } from './listado-centros-costos-oficinas.component';

describe('ListadoCentrosCostosOficinasComponent', () => {
  it('should be created', async () => {
    await TestBed.configureTestingModule({ imports: [ListadoCentrosCostosOficinasComponent], providers: [provideHttpClient(), provideHttpClientTesting()] }).compileComponents();
    expect(TestBed.createComponent(ListadoCentrosCostosOficinasComponent).componentInstance).toBeTruthy();
  });
});
