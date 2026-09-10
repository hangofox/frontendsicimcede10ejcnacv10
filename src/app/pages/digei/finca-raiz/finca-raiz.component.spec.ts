import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { FincaRaizComponent } from './finca-raiz.component';

describe('FincaRaizComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [FincaRaizComponent],
      providers: [provideRouter([])]
    }).compileComponents();
    expect(TestBed.createComponent(FincaRaizComponent).componentInstance).toBeTruthy();
  });
});
