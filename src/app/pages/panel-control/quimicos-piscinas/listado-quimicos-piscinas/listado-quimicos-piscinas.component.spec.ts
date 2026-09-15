import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ListadoQuimicosPiscinasComponent } from './listado-quimicos-piscinas.component';

describe('ListadoQuimicosPiscinasComponent', () => {
  it('should be created', async () => {
    await TestBed.configureTestingModule({ imports: [ListadoQuimicosPiscinasComponent], providers: [provideHttpClient(), provideHttpClientTesting()] }).compileComponents();
    expect(TestBed.createComponent(ListadoQuimicosPiscinasComponent).componentInstance).toBeTruthy();
  });
});
