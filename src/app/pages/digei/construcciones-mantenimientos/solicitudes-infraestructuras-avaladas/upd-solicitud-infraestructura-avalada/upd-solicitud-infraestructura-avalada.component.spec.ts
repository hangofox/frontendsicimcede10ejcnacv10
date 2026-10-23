import { TestBed } from '@angular/core/testing';
import { UpdSolicitudInfraestructuraAvaladaComponent } from './upd-solicitud-infraestructura-avalada.component';

describe('UpdSolicitudInfraestructuraAvaladaComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [UpdSolicitudInfraestructuraAvaladaComponent]
    }).compileComponents();

    expect(TestBed.createComponent(UpdSolicitudInfraestructuraAvaladaComponent).componentInstance).toBeTruthy();
  });
});
