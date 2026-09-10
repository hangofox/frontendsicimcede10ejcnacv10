import { TestBed } from '@angular/core/testing';
import { GestionRiesgoComponent } from './gestion-riesgo.component';

describe('GestionRiesgoComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({ imports: [GestionRiesgoComponent] }).compileComponents();
    expect(TestBed.createComponent(GestionRiesgoComponent).componentInstance).toBeTruthy();
  });
});
