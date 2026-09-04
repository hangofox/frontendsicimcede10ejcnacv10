import { TestBed } from '@angular/core/testing';
import { VistaInfraestructuraComponent } from './vista-infraestructura.component';

describe('VistaInfraestructuraComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [VistaInfraestructuraComponent]
    }).compileComponents();

    expect(TestBed.createComponent(VistaInfraestructuraComponent).componentInstance).toBeTruthy();
  });
});
