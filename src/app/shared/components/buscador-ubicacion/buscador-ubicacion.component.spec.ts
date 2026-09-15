import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import { BuscadorUbicacionComponent } from './buscador-ubicacion.component';

describe('BuscadorUbicacionComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({ imports: [BuscadorUbicacionComponent], providers: [provideHttpClient(), provideHttpClientTesting()] }).compileComponents();
    const fixture = TestBed.createComponent(BuscadorUbicacionComponent);
    fixture.componentInstance.formGroup = new FormGroup({ pais: new FormControl(''), departamento: new FormControl(''), ciudad: new FormControl('') });
    fixture.componentInstance.controlPais = 'pais';
    fixture.componentInstance.controlDepartamento = 'departamento';
    fixture.componentInstance.controlCiudad = 'ciudad';
    expect(fixture.componentInstance).toBeTruthy();
  });
});
