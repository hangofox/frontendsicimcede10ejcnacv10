import { TestBed } from '@angular/core/testing';
import { AddUpdDelSolicitudMantenimientoSaneamientoBasicoComponent } from './add-upd-del-solicitud-mantenimiento-san-bas.component';

describe('AddUpdDelSolicitudMantenimientoSaneamientoBasicoComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdDelSolicitudMantenimientoSaneamientoBasicoComponent]
    }).compileComponents();

    expect(TestBed.createComponent(AddUpdDelSolicitudMantenimientoSaneamientoBasicoComponent).componentInstance).toBeTruthy();
  });
});
