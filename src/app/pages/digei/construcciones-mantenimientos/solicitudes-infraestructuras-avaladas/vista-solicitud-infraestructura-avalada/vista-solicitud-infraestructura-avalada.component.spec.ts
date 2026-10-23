import { TestBed } from '@angular/core/testing';
import { VistaSolicitudInfraestructuraAvaladaComponent } from './vista-solicitud-infraestructura-avalada.component';

describe('VistaSolicitudInfraestructuraAvaladaComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [VistaSolicitudInfraestructuraAvaladaComponent]
    }).compileComponents();

    expect(TestBed.createComponent(VistaSolicitudInfraestructuraAvaladaComponent).componentInstance).toBeTruthy();
  });
});
