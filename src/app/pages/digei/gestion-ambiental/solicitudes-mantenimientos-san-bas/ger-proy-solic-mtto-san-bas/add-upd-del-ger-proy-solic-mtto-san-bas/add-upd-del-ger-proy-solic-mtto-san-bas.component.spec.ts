import { TestBed } from '@angular/core/testing';
import { AddUpdDelGerenteProyectoSolicMttoSbComponent } from './add-upd-del-ger-proy-solic-mtto-san-bas.component';

describe('AddUpdDelGerenteProyectoSolicMttoSbComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdDelGerenteProyectoSolicMttoSbComponent]
    }).compileComponents();

    expect(TestBed.createComponent(AddUpdDelGerenteProyectoSolicMttoSbComponent).componentInstance).toBeTruthy();
  });
});
