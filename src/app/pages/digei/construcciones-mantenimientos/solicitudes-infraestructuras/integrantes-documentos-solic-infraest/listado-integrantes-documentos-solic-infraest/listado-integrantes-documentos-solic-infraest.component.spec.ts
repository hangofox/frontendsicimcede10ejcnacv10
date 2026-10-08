import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ListadoIntegrantesDocumentosSolicInfraestComponent } from './listado-integrantes-documentos-solic-infraest.component';

describe('ListadoIntegrantesDocumentosSolicInfraestComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoIntegrantesDocumentosSolicInfraestComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(ListadoIntegrantesDocumentosSolicInfraestComponent).componentInstance).toBeTruthy();
  });
});
