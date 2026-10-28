import { TestBed } from '@angular/core/testing';
import { AddUpdDelInformacionFinancieraSolicConstNuevComponent } from './add-upd-del-info-fin-solic-const-nuev.component';

describe('AddUpdDelInformacionFinancieraSolicConstNuevComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdDelInformacionFinancieraSolicConstNuevComponent]
    }).compileComponents();

    expect(TestBed.createComponent(AddUpdDelInformacionFinancieraSolicConstNuevComponent).componentInstance).toBeTruthy();
  });
});
