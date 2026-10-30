import { TestBed } from '@angular/core/testing';
import { UpdSolicitudObraNuevaSaneamientoBasicoAvaladoComponent } from './upd-solicitud-obra-nueva-san-bas-av.component';

describe('UpdSolicitudObraNuevaSaneamientoBasicoAvaladoComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [UpdSolicitudObraNuevaSaneamientoBasicoAvaladoComponent]
    }).compileComponents();

    expect(TestBed.createComponent(UpdSolicitudObraNuevaSaneamientoBasicoAvaladoComponent).componentInstance).toBeTruthy();
  });
});
