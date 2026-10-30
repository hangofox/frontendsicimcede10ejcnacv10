import { TestBed } from '@angular/core/testing';
import { AddUpdDelGerenteProyectoSolicObrSbComponent } from './add-upd-del-ger-proy-solic-obr-san-bas.component';

describe('AddUpdDelGerenteProyectoSolicObrSbComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdDelGerenteProyectoSolicObrSbComponent]
    }).compileComponents();

    expect(TestBed.createComponent(AddUpdDelGerenteProyectoSolicObrSbComponent).componentInstance).toBeTruthy();
  });
});
