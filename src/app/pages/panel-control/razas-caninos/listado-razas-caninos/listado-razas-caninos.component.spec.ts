import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ListadoRazasCaninosComponent } from './listado-razas-caninos.component';

describe('ListadoRazasCaninosComponent', () => {
  it('should be created', async () => {
    await TestBed.configureTestingModule({ imports: [ListadoRazasCaninosComponent], providers: [provideHttpClient(), provideHttpClientTesting()] }).compileComponents();
    expect(TestBed.createComponent(ListadoRazasCaninosComponent).componentInstance).toBeTruthy();
  });
});
