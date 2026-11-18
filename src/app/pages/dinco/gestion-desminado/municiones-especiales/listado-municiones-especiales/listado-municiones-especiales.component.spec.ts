import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ListadoMunicionesEspecialesComponent } from './listado-municiones-especiales.component';

describe('ListadoMunicionesEspecialesComponent', () => {
  it('should be created', async () => {
    await TestBed.configureTestingModule({ imports: [ListadoMunicionesEspecialesComponent], providers: [provideHttpClient(), provideHttpClientTesting()] }).compileComponents();
    expect(TestBed.createComponent(ListadoMunicionesEspecialesComponent).componentInstance).toBeTruthy();
  });
});
