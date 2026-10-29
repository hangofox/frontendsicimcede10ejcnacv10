import { TestBed } from '@angular/core/testing';
import { VistaHistCtrAvancObrRedMitigComponent } from './vista-hist-ctr-avanc-obr-red-mitig.component';

describe('VistaHistCtrAvancObrRedMitigComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [VistaHistCtrAvancObrRedMitigComponent]
    }).compileComponents();

    expect(TestBed.createComponent(VistaHistCtrAvancObrRedMitigComponent).componentInstance).toBeTruthy();
  });
});
