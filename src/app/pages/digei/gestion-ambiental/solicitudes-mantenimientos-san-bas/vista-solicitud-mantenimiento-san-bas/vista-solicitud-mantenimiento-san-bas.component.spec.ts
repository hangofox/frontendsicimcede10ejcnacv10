import { TestBed } from '@angular/core/testing';
import { VistaSolicitudMantenimientoSaneamientoBasicoComponent } from './vista-solicitud-mantenimiento-san-bas.component';

describe('VistaSolicitudMantenimientoSaneamientoBasicoComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [VistaSolicitudMantenimientoSaneamientoBasicoComponent]
    }).compileComponents();

    expect(TestBed.createComponent(VistaSolicitudMantenimientoSaneamientoBasicoComponent).componentInstance).toBeTruthy();
  });
});
