import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { VistaDocumentacionAnexaSolicMttoSbComponent } from './vista-doc-anex-solic-mtto-san-bas.component';

describe('VistaDocumentacionAnexaSolicMttoSbComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [VistaDocumentacionAnexaSolicMttoSbComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(VistaDocumentacionAnexaSolicMttoSbComponent).componentInstance).toBeTruthy();
  });
});
