import { TestBed } from '@angular/core/testing';
import { AddUpdDelInformacionFinancieraSolicMttoSbComponent } from './add-upd-del-info-fin-solic-mtto-san-bas.component';

describe('AddUpdDelInformacionFinancieraSolicMttoSbComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdDelInformacionFinancieraSolicMttoSbComponent]
    }).compileComponents();

    expect(TestBed.createComponent(AddUpdDelInformacionFinancieraSolicMttoSbComponent).componentInstance).toBeTruthy();
  });
});
