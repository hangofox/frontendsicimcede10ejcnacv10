import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ListadoPiscinasInfraestructurasComponent } from './listado-piscinas-infraestructuras.component';

describe('ListadoPiscinasInfraestructurasComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoPiscinasInfraestructurasComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(ListadoPiscinasInfraestructurasComponent).componentInstance).toBeTruthy();
  });
});
