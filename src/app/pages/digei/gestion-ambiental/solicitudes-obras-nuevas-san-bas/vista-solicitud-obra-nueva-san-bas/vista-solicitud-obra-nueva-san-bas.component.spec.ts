import { TestBed } from '@angular/core/testing';
import { VistaSolicitudObraNuevaSaneamientoBasicoComponent } from './vista-solicitud-obra-nueva-san-bas.component';

describe('VistaSolicitudObraNuevaSaneamientoBasicoComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [VistaSolicitudObraNuevaSaneamientoBasicoComponent]
    }).compileComponents();

    expect(TestBed.createComponent(VistaSolicitudObraNuevaSaneamientoBasicoComponent).componentInstance).toBeTruthy();
  });
});
