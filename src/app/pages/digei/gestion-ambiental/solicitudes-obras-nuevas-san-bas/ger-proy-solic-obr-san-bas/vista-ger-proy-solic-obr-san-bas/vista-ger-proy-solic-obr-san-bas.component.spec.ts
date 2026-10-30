import { TestBed } from '@angular/core/testing';
import { VistaGerenteProyectoSolicObrSbComponent } from './vista-ger-proy-solic-obr-san-bas.component';

describe('VistaGerenteProyectoSolicObrSbComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [VistaGerenteProyectoSolicObrSbComponent]
    }).compileComponents();

    expect(TestBed.createComponent(VistaGerenteProyectoSolicObrSbComponent).componentInstance).toBeTruthy();
  });
});
