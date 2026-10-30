import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ListadoDocumentacionAnexaSolicObrSbComponent } from './listado-doc-anex-solic-obr-san-bas.component';

describe('ListadoDocumentacionAnexaSolicObrSbComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoDocumentacionAnexaSolicObrSbComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(ListadoDocumentacionAnexaSolicObrSbComponent).componentInstance).toBeTruthy();
  });
});
