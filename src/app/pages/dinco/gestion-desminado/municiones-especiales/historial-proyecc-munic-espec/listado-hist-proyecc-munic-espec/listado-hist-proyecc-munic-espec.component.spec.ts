import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ListadoHistProyeccMunicEspecComponent } from './listado-hist-proyecc-munic-espec.component';

describe('ListadoHistProyeccMunicEspecComponent', () => {
  it('should be created', async () => {
    await TestBed.configureTestingModule({ imports: [ListadoHistProyeccMunicEspecComponent], providers: [provideHttpClient(), provideHttpClientTesting()] }).compileComponents();
    expect(TestBed.createComponent(ListadoHistProyeccMunicEspecComponent).componentInstance).toBeTruthy();
  });
});
