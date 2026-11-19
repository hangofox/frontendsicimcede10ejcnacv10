import { TestBed } from '@angular/core/testing';
import { VistaSolicitudMantenimientoAvaladoComponent } from './vista-solicitud-mantenimiento-avalado.component';

describe('VistaSolicitudMantenimientoAvaladoComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [VistaSolicitudMantenimientoAvaladoComponent]
    }).compileComponents();

    expect(TestBed.createComponent(VistaSolicitudMantenimientoAvaladoComponent).componentInstance).toBeTruthy();
  });
});
