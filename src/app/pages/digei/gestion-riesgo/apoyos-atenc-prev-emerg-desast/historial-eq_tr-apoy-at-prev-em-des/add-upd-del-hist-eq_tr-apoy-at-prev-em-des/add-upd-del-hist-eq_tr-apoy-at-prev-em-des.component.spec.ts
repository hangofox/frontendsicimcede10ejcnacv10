import { TestBed } from '@angular/core/testing';
import { AddUpdDelHistEqTrApoyAtPrevEmDesComponent } from './add-upd-del-hist-eq_tr-apoy-at-prev-em-des.component';

describe('AddUpdDelHistEqTrApoyAtPrevEmDesComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdDelHistEqTrApoyAtPrevEmDesComponent]
    }).compileComponents();

    expect(TestBed.createComponent(AddUpdDelHistEqTrApoyAtPrevEmDesComponent).componentInstance).toBeTruthy();
  });
});
