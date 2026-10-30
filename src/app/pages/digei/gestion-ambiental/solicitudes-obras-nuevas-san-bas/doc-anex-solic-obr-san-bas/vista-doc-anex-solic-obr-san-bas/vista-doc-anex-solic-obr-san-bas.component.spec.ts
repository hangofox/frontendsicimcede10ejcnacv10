import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { VistaDocumentacionAnexaSolicObrSbComponent } from './vista-doc-anex-solic-obr-san-bas.component';

describe('VistaDocumentacionAnexaSolicObrSbComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [VistaDocumentacionAnexaSolicObrSbComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(VistaDocumentacionAnexaSolicObrSbComponent).componentInstance).toBeTruthy();
  });
});
