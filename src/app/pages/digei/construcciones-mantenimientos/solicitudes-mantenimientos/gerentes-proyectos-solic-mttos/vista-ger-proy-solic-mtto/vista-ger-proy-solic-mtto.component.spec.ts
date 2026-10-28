import { TestBed } from '@angular/core/testing';
import { VistaGerenteProyectoSolicMttoComponent } from './vista-ger-proy-solic-mtto.component';

describe('VistaGerenteProyectoSolicMttoComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [VistaGerenteProyectoSolicMttoComponent]
    }).compileComponents();

    expect(TestBed.createComponent(VistaGerenteProyectoSolicMttoComponent).componentInstance).toBeTruthy();
  });
});
