import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ListadoEquiposIngenierosComponent } from './listado-equipos-ingenieros.component';

describe('ListadoEquiposIngenierosComponent', () => {
  it('should be created', async () => {
    await TestBed.configureTestingModule({ imports: [ListadoEquiposIngenierosComponent], providers: [provideHttpClient(), provideHttpClientTesting()] }).compileComponents();
    expect(TestBed.createComponent(ListadoEquiposIngenierosComponent).componentInstance).toBeTruthy();
  });
});
