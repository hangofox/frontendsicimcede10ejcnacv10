import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RecuperacionContrasenaAccesoUsuarioComponent } from './recuperacion-contrasena-acceso-usuario.component';

describe('RecuperacionContrasenaAccesoUsuarioComponent', () => {
  it('debe crearse y usar el logo PNG institucional', async () => {
    await TestBed.configureTestingModule({
      imports: [RecuperacionContrasenaAccesoUsuarioComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    const fixture = TestBed.createComponent(RecuperacionContrasenaAccesoUsuarioComponent);
    fixture.detectChanges();

    const logo = fixture.nativeElement.querySelector('.logo-sicim') as HTMLImageElement;
    expect(fixture.componentInstance).toBeTruthy();
    expect(logo).toBeTruthy();
    expect(logo.getAttribute('src')).toBe('assets/images/logo/logo_sicim_01.png');
  });
});
