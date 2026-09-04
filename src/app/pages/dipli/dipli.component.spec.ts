import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { DipliComponent } from './dipli.component';

describe('DipliComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [DipliComponent],
      providers: [provideRouter([])]
    }).compileComponents();
    expect(TestBed.createComponent(DipliComponent).componentInstance).toBeTruthy();
  });
});
