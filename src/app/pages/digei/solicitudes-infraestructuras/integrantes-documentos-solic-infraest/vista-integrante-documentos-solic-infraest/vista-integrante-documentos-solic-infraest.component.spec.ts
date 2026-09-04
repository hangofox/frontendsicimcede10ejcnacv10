import { TestBed } from '@angular/core/testing';
import { VistaIntegranteDocumentosSolicInfraestComponent } from './vista-integrante-documentos-solic-infraest.component';

describe('VistaIntegranteDocumentosSolicInfraestComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [VistaIntegranteDocumentosSolicInfraestComponent]
    }).compileComponents();

    expect(TestBed.createComponent(VistaIntegranteDocumentosSolicInfraestComponent).componentInstance).toBeTruthy();
  });
});
