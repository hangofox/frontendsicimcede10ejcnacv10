import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ListadoHistMaqPesadApoyAtencPrevDesComponent } from './listado-hist-maq-pesad-apoy-at-prev-des.component';

describe('ListadoHistMaqPesadApoyAtencPrevDesComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoHistMaqPesadApoyAtencPrevDesComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(ListadoHistMaqPesadApoyAtencPrevDesComponent).componentInstance).toBeTruthy();
  });
});
