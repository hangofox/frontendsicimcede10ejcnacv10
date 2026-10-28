import { TestBed } from '@angular/core/testing';
import { VistaGerenteProyectoSolicConstNuevComponent } from './vista-ger-proy-solic-const-nuev.component';

describe('VistaGerenteProyectoSolicConstNuevComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [VistaGerenteProyectoSolicConstNuevComponent]
    }).compileComponents();

    expect(TestBed.createComponent(VistaGerenteProyectoSolicConstNuevComponent).componentInstance).toBeTruthy();
  });
});
