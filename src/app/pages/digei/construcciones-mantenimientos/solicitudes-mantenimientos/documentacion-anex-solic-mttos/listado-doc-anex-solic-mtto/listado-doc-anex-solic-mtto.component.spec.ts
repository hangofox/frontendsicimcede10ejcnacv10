import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ListadoDocumentacionAnexaSolicMttoComponent } from './listado-doc-anex-solic-mtto.component';

describe('ListadoDocumentacionAnexaSolicMttoComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoDocumentacionAnexaSolicMttoComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(ListadoDocumentacionAnexaSolicMttoComponent).componentInstance).toBeTruthy();
  });
});
