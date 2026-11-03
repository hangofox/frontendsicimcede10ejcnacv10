import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RutaNavegacionComponent } from './ruta-navegacion.component';

describe('RutaNavegacionComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [RutaNavegacionComponent],
      providers: [provideRouter([])]
    }).compileComponents();
    expect(TestBed.createComponent(RutaNavegacionComponent).componentInstance).toBeTruthy();
  });
});
