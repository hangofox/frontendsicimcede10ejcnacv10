import { TestBed } from '@angular/core/testing';
import { AddUpdDelDocumentacionAnexaSolicMttoComponent } from './add-upd-del-doc-anex-solic-mtto.component';

describe('AddUpdDelDocumentacionAnexaSolicMttoComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdDelDocumentacionAnexaSolicMttoComponent]
    }).compileComponents();

    expect(TestBed.createComponent(AddUpdDelDocumentacionAnexaSolicMttoComponent).componentInstance).toBeTruthy();
  });
});
