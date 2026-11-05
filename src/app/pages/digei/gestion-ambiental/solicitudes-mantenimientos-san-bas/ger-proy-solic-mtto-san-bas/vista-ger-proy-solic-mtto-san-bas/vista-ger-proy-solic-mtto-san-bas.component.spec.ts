import { TestBed } from '@angular/core/testing';
import { VistaGerenteProyectoSolicMttoSbComponent } from './vista-ger-proy-solic-mtto-san-bas.component';

describe('VistaGerenteProyectoSolicMttoSbComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [VistaGerenteProyectoSolicMttoSbComponent]
    }).compileComponents();

    expect(TestBed.createComponent(VistaGerenteProyectoSolicMttoSbComponent).componentInstance).toBeTruthy();
  });
});
