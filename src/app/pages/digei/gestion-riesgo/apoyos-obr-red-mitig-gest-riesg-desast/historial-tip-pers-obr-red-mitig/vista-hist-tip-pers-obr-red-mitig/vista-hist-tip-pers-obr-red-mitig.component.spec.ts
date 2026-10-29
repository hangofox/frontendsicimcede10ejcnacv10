import { TestBed } from '@angular/core/testing';
import { VistaHistTipPersObrRedMitigComponent } from './vista-hist-tip-pers-obr-red-mitig.component';

describe('VistaHistTipPersObrRedMitigComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [VistaHistTipPersObrRedMitigComponent]
    }).compileComponents();

    expect(TestBed.createComponent(VistaHistTipPersObrRedMitigComponent).componentInstance).toBeTruthy();
  });
});
