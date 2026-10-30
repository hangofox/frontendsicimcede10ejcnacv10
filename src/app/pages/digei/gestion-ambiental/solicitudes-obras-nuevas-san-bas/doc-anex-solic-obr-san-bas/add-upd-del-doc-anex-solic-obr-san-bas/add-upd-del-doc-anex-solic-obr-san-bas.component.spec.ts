import { TestBed } from '@angular/core/testing';
import { AddUpdDelDocumentacionAnexaSolicObrSbComponent } from './add-upd-del-doc-anex-solic-obr-san-bas.component';

describe('AddUpdDelDocumentacionAnexaSolicObrSbComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdDelDocumentacionAnexaSolicObrSbComponent]
    }).compileComponents();

    expect(TestBed.createComponent(AddUpdDelDocumentacionAnexaSolicObrSbComponent).componentInstance).toBeTruthy();
  });
});
