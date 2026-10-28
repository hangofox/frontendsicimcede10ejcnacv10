import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ListadoDocumentacionAnexaSolicConstNuevComponent } from './listado-doc-anex-solic-const-nuev.component';

describe('ListadoDocumentacionAnexaSolicConstNuevComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoDocumentacionAnexaSolicConstNuevComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(ListadoDocumentacionAnexaSolicConstNuevComponent).componentInstance).toBeTruthy();
  });
});
