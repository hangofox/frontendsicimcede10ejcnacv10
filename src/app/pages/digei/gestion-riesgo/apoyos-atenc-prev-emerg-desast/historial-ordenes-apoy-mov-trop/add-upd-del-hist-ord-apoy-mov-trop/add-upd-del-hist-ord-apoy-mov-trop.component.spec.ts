import { TestBed } from '@angular/core/testing';
import { AddUpdDelHistOrdApoyMovTropComponent } from './add-upd-del-hist-ord-apoy-mov-trop.component';

describe('AddUpdDelHistOrdApoyMovTropComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdDelHistOrdApoyMovTropComponent]
    }).compileComponents();

    expect(TestBed.createComponent(AddUpdDelHistOrdApoyMovTropComponent).componentInstance).toBeTruthy();
  });
});
