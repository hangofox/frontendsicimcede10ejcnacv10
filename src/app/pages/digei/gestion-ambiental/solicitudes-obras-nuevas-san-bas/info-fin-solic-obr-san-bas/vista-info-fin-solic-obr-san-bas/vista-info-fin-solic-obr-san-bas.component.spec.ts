import { TestBed } from '@angular/core/testing';
import { VistaInformacionFinancieraSolicObrSbComponent } from './vista-info-fin-solic-obr-san-bas.component';

describe('VistaInformacionFinancieraSolicObrSbComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [VistaInformacionFinancieraSolicObrSbComponent]
    }).compileComponents();

    expect(TestBed.createComponent(VistaInformacionFinancieraSolicObrSbComponent).componentInstance).toBeTruthy();
  });
});
