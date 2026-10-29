import { TestBed } from '@angular/core/testing';
import { VistaHistMaqPesadObrRedMitigComponent } from './vista-hist-maq-pesad-obr-red-mitig.component';

describe('VistaHistMaqPesadObrRedMitigComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [VistaHistMaqPesadObrRedMitigComponent]
    }).compileComponents();

    expect(TestBed.createComponent(VistaHistMaqPesadObrRedMitigComponent).componentInstance).toBeTruthy();
  });
});
