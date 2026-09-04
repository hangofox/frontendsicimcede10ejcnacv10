import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ListadoHistorialIntegrantesDocumentosComponent } from './listado-historial-integrantes-documentos.component';

describe('ListadoHistorialIntegrantesDocumentosComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoHistorialIntegrantesDocumentosComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(ListadoHistorialIntegrantesDocumentosComponent).componentInstance).toBeTruthy();
  });
});
