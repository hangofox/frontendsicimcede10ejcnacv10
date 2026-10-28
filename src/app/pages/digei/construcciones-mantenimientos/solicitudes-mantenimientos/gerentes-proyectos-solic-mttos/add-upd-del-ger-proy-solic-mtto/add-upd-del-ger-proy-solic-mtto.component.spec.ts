import { TestBed } from '@angular/core/testing';
import { AddUpdDelGerenteProyectoSolicMttoComponent } from './add-upd-del-ger-proy-solic-mtto.component';

describe('AddUpdDelGerenteProyectoSolicMttoComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdDelGerenteProyectoSolicMttoComponent]
    }).compileComponents();

    expect(TestBed.createComponent(AddUpdDelGerenteProyectoSolicMttoComponent).componentInstance).toBeTruthy();
  });
});
