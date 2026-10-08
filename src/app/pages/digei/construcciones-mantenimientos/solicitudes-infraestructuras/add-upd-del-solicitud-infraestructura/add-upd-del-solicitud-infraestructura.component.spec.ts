import { TestBed } from '@angular/core/testing';
import { AddUpdDelSolicitudInfraestructuraComponent } from './add-upd-del-solicitud-infraestructura.component';

describe('AddUpdDelSolicitudInfraestructuraComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdDelSolicitudInfraestructuraComponent]
    }).compileComponents();

    expect(TestBed.createComponent(AddUpdDelSolicitudInfraestructuraComponent).componentInstance).toBeTruthy();
  });
});
