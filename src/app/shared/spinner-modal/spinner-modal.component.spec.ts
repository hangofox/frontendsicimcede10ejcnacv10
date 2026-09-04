import { TestBed } from '@angular/core/testing';
import { SpinnerModalComponent } from './spinner-modal.component';

describe('SpinnerModalComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [SpinnerModalComponent]
    }).compileComponents();

    expect(TestBed.createComponent(SpinnerModalComponent).componentInstance).toBeTruthy();
  });
});
