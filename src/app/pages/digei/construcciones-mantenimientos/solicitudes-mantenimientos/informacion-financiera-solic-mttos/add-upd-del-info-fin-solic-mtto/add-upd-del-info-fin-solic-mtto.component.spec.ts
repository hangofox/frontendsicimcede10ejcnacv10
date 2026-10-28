import { TestBed } from '@angular/core/testing';
import { AddUpdDelInformacionFinancieraSolicMttoComponent } from './add-upd-del-info-fin-solic-mtto.component';

describe('AddUpdDelInformacionFinancieraSolicMttoComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdDelInformacionFinancieraSolicMttoComponent]
    }).compileComponents();

    expect(TestBed.createComponent(AddUpdDelInformacionFinancieraSolicMttoComponent).componentInstance).toBeTruthy();
  });
});
