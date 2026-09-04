import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { DatosUsuarioConectadoComponent } from './datos-usuario-conectado.component';

describe('DatosUsuarioConectadoComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [DatosUsuarioConectadoComponent],
      providers: [provideRouter([])]
    }).compileComponents();
    expect(TestBed.createComponent(DatosUsuarioConectadoComponent).componentInstance).toBeTruthy();
  });
});
