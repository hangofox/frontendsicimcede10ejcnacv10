import { TestBed } from '@angular/core/testing';
import { VistaHistEqTrObrRedMitigComponent } from './vista-hist-eq_tr-obr-red-mitig.component';

describe('VistaHistEqTrObrRedMitigComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [VistaHistEqTrObrRedMitigComponent]
    }).compileComponents();

    expect(TestBed.createComponent(VistaHistEqTrObrRedMitigComponent).componentInstance).toBeTruthy();
  });
});
