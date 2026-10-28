import { TestBed } from '@angular/core/testing';
import { AddUpdDelGerenteProyectoSolicConstNuevComponent } from './add-upd-del-ger-proy-solic-const-nuev.component';

describe('AddUpdDelGerenteProyectoSolicConstNuevComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdDelGerenteProyectoSolicConstNuevComponent]
    }).compileComponents();

    expect(TestBed.createComponent(AddUpdDelGerenteProyectoSolicConstNuevComponent).componentInstance).toBeTruthy();
  });
});
