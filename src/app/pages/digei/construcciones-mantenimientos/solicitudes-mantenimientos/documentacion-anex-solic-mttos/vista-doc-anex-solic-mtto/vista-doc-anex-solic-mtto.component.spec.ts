import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { VistaDocumentacionAnexaSolicMttoComponent } from './vista-doc-anex-solic-mtto.component';

describe('VistaDocumentacionAnexaSolicMttoComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [VistaDocumentacionAnexaSolicMttoComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(VistaDocumentacionAnexaSolicMttoComponent).componentInstance).toBeTruthy();
  });
});
