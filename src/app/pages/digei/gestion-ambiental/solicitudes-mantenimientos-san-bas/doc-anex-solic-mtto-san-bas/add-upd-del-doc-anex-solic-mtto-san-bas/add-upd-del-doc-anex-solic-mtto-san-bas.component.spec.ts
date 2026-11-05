import { TestBed } from '@angular/core/testing';
import { AddUpdDelDocumentacionAnexaSolicMttoSbComponent } from './add-upd-del-doc-anex-solic-mtto-san-bas.component';

describe('AddUpdDelDocumentacionAnexaSolicMttoSbComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdDelDocumentacionAnexaSolicMttoSbComponent]
    }).compileComponents();

    expect(TestBed.createComponent(AddUpdDelDocumentacionAnexaSolicMttoSbComponent).componentInstance).toBeTruthy();
  });
});
