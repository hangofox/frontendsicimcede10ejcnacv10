import { TestBed } from '@angular/core/testing';
import { AddUpdDelHistEqTrObrRedMitigComponent } from './add-upd-del-hist-eq_tr-obr-red-mitig.component';

describe('AddUpdDelHistEqTrObrRedMitigComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdDelHistEqTrObrRedMitigComponent]
    }).compileComponents();

    expect(TestBed.createComponent(AddUpdDelHistEqTrObrRedMitigComponent).componentInstance).toBeTruthy();
  });
});
