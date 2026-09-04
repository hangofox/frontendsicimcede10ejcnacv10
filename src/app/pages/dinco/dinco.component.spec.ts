import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { DincoComponent } from './dinco.component';

describe('DincoComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [DincoComponent],
      providers: [provideRouter([])]
    }).compileComponents();
    expect(TestBed.createComponent(DincoComponent).componentInstance).toBeTruthy();
  });
});
