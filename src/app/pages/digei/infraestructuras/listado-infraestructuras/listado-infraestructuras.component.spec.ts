import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ListadoInfraestructurasComponent } from './listado-infraestructuras.component';

describe('ListadoInfraestructurasComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoInfraestructurasComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(ListadoInfraestructurasComponent).componentInstance).toBeTruthy();
  });
});
