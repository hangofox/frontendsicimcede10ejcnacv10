import { TestBed } from '@angular/core/testing';
import { UpdSolicitudMantenimientoAvaladoComponent } from './upd-solicitud-mantenimiento-avalado.component';

describe('UpdSolicitudMantenimientoAvaladoComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [UpdSolicitudMantenimientoAvaladoComponent]
    }).compileComponents();

    expect(TestBed.createComponent(UpdSolicitudMantenimientoAvaladoComponent).componentInstance).toBeTruthy();
  });
});
