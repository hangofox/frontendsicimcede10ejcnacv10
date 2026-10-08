import { TestBed } from '@angular/core/testing';
import { VistaSolicitudInfraestructuraComponent } from './vista-solicitud-infraestructura.component';

describe('VistaSolicitudInfraestructuraComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [VistaSolicitudInfraestructuraComponent]
    }).compileComponents();

    expect(TestBed.createComponent(VistaSolicitudInfraestructuraComponent).componentInstance).toBeTruthy();
  });
});
