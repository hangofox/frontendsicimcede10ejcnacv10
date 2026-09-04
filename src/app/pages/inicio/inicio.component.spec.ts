import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { InicioComponent } from './inicio.component';

describe('InicioComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [InicioComponent],
      providers: [provideRouter([])]
    }).compileComponents();
    expect(TestBed.createComponent(InicioComponent).componentInstance).toBeTruthy();
  });
});
