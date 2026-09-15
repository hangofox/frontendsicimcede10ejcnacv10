import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ListadoHistorialQuimicosPiscinasInfraestComponent } from './listado-historial-quimicos-piscinas-infraest.component';

describe('ListadoHistorialQuimicosPiscinasInfraestComponent', () => {
  it('should be created', async () => {
    await TestBed.configureTestingModule({ imports: [ListadoHistorialQuimicosPiscinasInfraestComponent], providers: [provideHttpClient(), provideHttpClientTesting()] }).compileComponents();
    expect(TestBed.createComponent(ListadoHistorialQuimicosPiscinasInfraestComponent).componentInstance).toBeTruthy();
  });
});
