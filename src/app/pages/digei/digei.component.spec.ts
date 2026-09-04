import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { DigeiComponent } from './digei.component';

describe('DigeiComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [DigeiComponent],
      providers: [provideRouter([])]
    }).compileComponents();
    expect(TestBed.createComponent(DigeiComponent).componentInstance).toBeTruthy();
  });
});
