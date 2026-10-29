import { TestBed } from '@angular/core/testing';
import { AddUpdDelHistCtrAvancObrRedMitigComponent } from './add-upd-del-hist-ctr-avanc-obr-red-mitig.component';

describe('AddUpdDelHistCtrAvancObrRedMitigComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdDelHistCtrAvancObrRedMitigComponent]
    }).compileComponents();

    expect(TestBed.createComponent(AddUpdDelHistCtrAvancObrRedMitigComponent).componentInstance).toBeTruthy();
  });
});
