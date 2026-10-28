import { TestBed } from '@angular/core/testing';
import { AddUpdDelDocumentacionAnexaSolicConstNuevComponent } from './add-upd-del-doc-anex-solic-const-nuev.component';

describe('AddUpdDelDocumentacionAnexaSolicConstNuevComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdDelDocumentacionAnexaSolicConstNuevComponent]
    }).compileComponents();

    expect(TestBed.createComponent(AddUpdDelDocumentacionAnexaSolicConstNuevComponent).componentInstance).toBeTruthy();
  });
});
