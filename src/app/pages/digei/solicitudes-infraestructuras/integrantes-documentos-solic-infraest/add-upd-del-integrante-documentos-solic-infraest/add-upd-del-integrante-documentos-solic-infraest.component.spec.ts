import { TestBed } from '@angular/core/testing';
import { AddUpdDelIntegranteDocumentosSolicInfraestComponent } from './add-upd-del-integrante-documentos-solic-infraest.component';

describe('AddUpdDelIntegranteDocumentosSolicInfraestComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdDelIntegranteDocumentosSolicInfraestComponent]
    }).compileComponents();

    expect(TestBed.createComponent(AddUpdDelIntegranteDocumentosSolicInfraestComponent).componentInstance).toBeTruthy();
  });
});
