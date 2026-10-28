import { TestBed } from '@angular/core/testing';
import { VistaHistTipPersApoyAtencPrevDesComponent } from './vista-hist-tip-pers-apoy-at-prev-des.component';

describe('VistaHistTipPersApoyAtencPrevDesComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [VistaHistTipPersApoyAtencPrevDesComponent]
    }).compileComponents();

    expect(TestBed.createComponent(VistaHistTipPersApoyAtencPrevDesComponent).componentInstance).toBeTruthy();
  });
});
