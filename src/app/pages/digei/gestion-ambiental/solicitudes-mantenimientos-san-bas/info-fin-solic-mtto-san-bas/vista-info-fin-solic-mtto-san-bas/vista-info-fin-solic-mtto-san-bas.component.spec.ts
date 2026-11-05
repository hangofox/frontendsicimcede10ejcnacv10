import { TestBed } from '@angular/core/testing';
import { VistaInformacionFinancieraSolicMttoSbComponent } from './vista-info-fin-solic-mtto-san-bas.component';

describe('VistaInformacionFinancieraSolicMttoSbComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [VistaInformacionFinancieraSolicMttoSbComponent]
    }).compileComponents();

    expect(TestBed.createComponent(VistaInformacionFinancieraSolicMttoSbComponent).componentInstance).toBeTruthy();
  });
});
