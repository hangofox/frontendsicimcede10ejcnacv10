import { TestBed } from '@angular/core/testing';
import { VistaInformacionFinancieraSolicConstNuevComponent } from './vista-info-fin-solic-const-nuev.component';

describe('VistaInformacionFinancieraSolicConstNuevComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [VistaInformacionFinancieraSolicConstNuevComponent]
    }).compileComponents();

    expect(TestBed.createComponent(VistaInformacionFinancieraSolicConstNuevComponent).componentInstance).toBeTruthy();
  });
});
