import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { IndexComponent } from './index.component';

describe('IndexComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [IndexComponent],
      providers: [provideRouter([])]
    }).compileComponents();
    expect(TestBed.createComponent(IndexComponent).componentInstance).toBeTruthy();
  });
});
