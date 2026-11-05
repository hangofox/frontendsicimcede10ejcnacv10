import { TestBed } from '@angular/core/testing';
import { VistaSolicitudMantenimientoSaneamientoBasicoAvaladoComponent } from './vista-solicitud-mantenimiento-san-bas-av.component';

describe('VistaSolicitudMantenimientoSaneamientoBasicoAvaladoComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [VistaSolicitudMantenimientoSaneamientoBasicoAvaladoComponent]
    }).compileComponents();

    expect(TestBed.createComponent(VistaSolicitudMantenimientoSaneamientoBasicoAvaladoComponent).componentInstance).toBeTruthy();
  });
});
