import { TestBed } from '@angular/core/testing';
import { AddUpdDelHistorialIntegranteDocumentosComponent } from './add-upd-del-historial-integrante-documentos.component';

describe('AddUpdDelHistorialIntegranteDocumentosComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdDelHistorialIntegranteDocumentosComponent]
    }).compileComponents();

    expect(TestBed.createComponent(AddUpdDelHistorialIntegranteDocumentosComponent).componentInstance).toBeTruthy();
  });
});
