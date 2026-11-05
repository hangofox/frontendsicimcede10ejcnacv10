import { TestBed } from '@angular/core/testing';
import { UpdSolicitudMantenimientoSaneamientoBasicoAvaladoComponent } from './upd-solicitud-mantenimiento-san-bas-av.component';

describe('UpdSolicitudMantenimientoSaneamientoBasicoAvaladoComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [UpdSolicitudMantenimientoSaneamientoBasicoAvaladoComponent]
    }).compileComponents();

    expect(TestBed.createComponent(UpdSolicitudMantenimientoSaneamientoBasicoAvaladoComponent).componentInstance).toBeTruthy();
  });
});
