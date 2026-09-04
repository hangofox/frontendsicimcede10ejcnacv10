import { TestBed } from '@angular/core/testing';
import { PrivilegiosRestriccionesUsuariosComponent } from './privilegios-restricciones-usuarios.component';

describe('PrivilegiosRestriccionesUsuariosComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [PrivilegiosRestriccionesUsuariosComponent]
    }).compileComponents();

    expect(TestBed.createComponent(PrivilegiosRestriccionesUsuariosComponent).componentInstance).toBeTruthy();
  });
});
