import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ListadoMaterialesTecnicosComponent } from './listado-materiales-tecnicos.component';

describe('ListadoMaterialesTecnicosComponent', () => {
  it('should be created', async () => {
    await TestBed.configureTestingModule({ imports: [ListadoMaterialesTecnicosComponent], providers: [provideHttpClient(), provideHttpClientTesting()] }).compileComponents();
    expect(TestBed.createComponent(ListadoMaterialesTecnicosComponent).componentInstance).toBeTruthy();
  });
});
