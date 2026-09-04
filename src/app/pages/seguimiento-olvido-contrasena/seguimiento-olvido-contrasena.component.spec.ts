import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SeguimientoOlvidoContrasenaComponent } from './seguimiento-olvido-contrasena.component';

describe('SeguimientoOlvidoContrasenaComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [SeguimientoOlvidoContrasenaComponent],
      providers: [provideRouter([])]
    }).compileComponents();
    expect(TestBed.createComponent(SeguimientoOlvidoContrasenaComponent).componentInstance).toBeTruthy();
  });
});
