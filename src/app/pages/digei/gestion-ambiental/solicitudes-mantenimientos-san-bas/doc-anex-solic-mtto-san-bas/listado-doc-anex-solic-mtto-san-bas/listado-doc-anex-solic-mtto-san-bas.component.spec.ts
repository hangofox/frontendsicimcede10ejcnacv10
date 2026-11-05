import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ListadoDocumentacionAnexaSolicMttoSbComponent } from './listado-doc-anex-solic-mtto-san-bas.component';

describe('ListadoDocumentacionAnexaSolicMttoSbComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoDocumentacionAnexaSolicMttoSbComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(ListadoDocumentacionAnexaSolicMttoSbComponent).componentInstance).toBeTruthy();
  });
});
