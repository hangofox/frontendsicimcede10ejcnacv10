import { TestBed } from '@angular/core/testing';
import { AddUpdDelHistTipPersObrRedMitigComponent } from './add-upd-del-hist-tip-pers-obr-red-mitig.component';

describe('AddUpdDelHistTipPersObrRedMitigComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdDelHistTipPersObrRedMitigComponent]
    }).compileComponents();

    expect(TestBed.createComponent(AddUpdDelHistTipPersObrRedMitigComponent).componentInstance).toBeTruthy();
  });
});
