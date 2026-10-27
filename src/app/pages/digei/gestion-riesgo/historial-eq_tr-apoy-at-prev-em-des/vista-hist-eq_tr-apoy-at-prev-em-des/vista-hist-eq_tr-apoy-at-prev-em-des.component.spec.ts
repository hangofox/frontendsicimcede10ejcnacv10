import { TestBed } from '@angular/core/testing';
import { VistaHistEqTrApoyAtPrevEmDesComponent } from './vista-hist-eq_tr-apoy-at-prev-em-des.component';

describe('VistaHistEqTrApoyAtPrevEmDesComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [VistaHistEqTrApoyAtPrevEmDesComponent]
    }).compileComponents();

    expect(TestBed.createComponent(VistaHistEqTrApoyAtPrevEmDesComponent).componentInstance).toBeTruthy();
  });
});
