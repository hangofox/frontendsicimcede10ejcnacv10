import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { VistaDocumentacionAnexaSolicConstNuevComponent } from './vista-doc-anex-solic-const-nuev.component';

describe('VistaDocumentacionAnexaSolicConstNuevComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [VistaDocumentacionAnexaSolicConstNuevComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(VistaDocumentacionAnexaSolicConstNuevComponent).componentInstance).toBeTruthy();
  });
});
