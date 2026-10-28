import { TestBed } from '@angular/core/testing';
import { AddUpdDelHistTipPersApoyAtencPrevDesComponent } from './add-upd-del-hist-tip-pers-apoy-at-prev-des.component';

describe('AddUpdDelHistTipPersApoyAtencPrevDesComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdDelHistTipPersApoyAtencPrevDesComponent]
    }).compileComponents();

    expect(TestBed.createComponent(AddUpdDelHistTipPersApoyAtencPrevDesComponent).componentInstance).toBeTruthy();
  });
});
