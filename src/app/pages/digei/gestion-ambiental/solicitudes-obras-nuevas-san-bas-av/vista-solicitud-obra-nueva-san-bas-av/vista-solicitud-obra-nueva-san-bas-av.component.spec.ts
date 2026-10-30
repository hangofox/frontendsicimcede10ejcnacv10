import { TestBed } from '@angular/core/testing';
import { VistaSolicitudObraNuevaSaneamientoBasicoAvaladoComponent } from './vista-solicitud-obra-nueva-san-bas-av.component';

describe('VistaSolicitudObraNuevaSaneamientoBasicoAvaladoComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [VistaSolicitudObraNuevaSaneamientoBasicoAvaladoComponent]
    }).compileComponents();

    expect(TestBed.createComponent(VistaSolicitudObraNuevaSaneamientoBasicoAvaladoComponent).componentInstance).toBeTruthy();
  });
});
