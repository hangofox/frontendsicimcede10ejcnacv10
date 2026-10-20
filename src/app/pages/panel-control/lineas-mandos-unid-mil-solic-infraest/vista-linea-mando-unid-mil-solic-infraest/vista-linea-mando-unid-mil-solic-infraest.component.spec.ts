import { TestBed } from '@angular/core/testing';
import { VistaLineaMandoUnidMilSolicInfraestComponent } from './vista-linea-mando-unid-mil-solic-infraest.component';

describe('VistaLineaMandoUnidMilSolicInfraestComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [VistaLineaMandoUnidMilSolicInfraestComponent]
    }).compileComponents();

    expect(TestBed.createComponent(VistaLineaMandoUnidMilSolicInfraestComponent).componentInstance).toBeTruthy();
  });
});
