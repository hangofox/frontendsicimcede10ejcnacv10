import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { DiespComponent } from './diesp.component';

describe('DiespComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [DiespComponent],
      providers: [provideRouter([])]
    }).compileComponents();
    expect(TestBed.createComponent(DiespComponent).componentInstance).toBeTruthy();
  });
});
