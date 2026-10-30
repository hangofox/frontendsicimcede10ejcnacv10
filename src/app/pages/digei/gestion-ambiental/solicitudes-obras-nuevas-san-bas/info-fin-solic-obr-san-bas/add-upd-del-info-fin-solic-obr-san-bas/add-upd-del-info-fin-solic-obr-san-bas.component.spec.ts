import { TestBed } from '@angular/core/testing';
import { AddUpdDelInformacionFinancieraSolicObrSbComponent } from './add-upd-del-info-fin-solic-obr-san-bas.component';

describe('AddUpdDelInformacionFinancieraSolicObrSbComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdDelInformacionFinancieraSolicObrSbComponent]
    }).compileComponents();

    expect(TestBed.createComponent(AddUpdDelInformacionFinancieraSolicObrSbComponent).componentInstance).toBeTruthy();
  });
});
