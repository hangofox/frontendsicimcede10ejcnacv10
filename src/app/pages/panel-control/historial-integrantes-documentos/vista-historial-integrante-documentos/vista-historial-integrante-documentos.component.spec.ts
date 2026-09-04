import { TestBed } from '@angular/core/testing';
import { VistaHistorialIntegranteDocumentosComponent } from './vista-historial-integrante-documentos.component';

describe('VistaHistorialIntegranteDocumentosComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [VistaHistorialIntegranteDocumentosComponent]
    }).compileComponents();

    expect(TestBed.createComponent(VistaHistorialIntegranteDocumentosComponent).componentInstance).toBeTruthy();
  });
});
