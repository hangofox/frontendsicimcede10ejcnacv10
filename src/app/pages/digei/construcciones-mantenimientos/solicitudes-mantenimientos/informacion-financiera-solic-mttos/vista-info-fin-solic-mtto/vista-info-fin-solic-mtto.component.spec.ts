import { TestBed } from '@angular/core/testing';
import { VistaInformacionFinancieraSolicMttoComponent } from './vista-info-fin-solic-mtto.component';

describe('VistaInformacionFinancieraSolicMttoComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [VistaInformacionFinancieraSolicMttoComponent]
    }).compileComponents();

    expect(TestBed.createComponent(VistaInformacionFinancieraSolicMttoComponent).componentInstance).toBeTruthy();
  });
});
