import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { GestionRiesgoComponent } from './gestion-riesgo.component';

describe('GestionRiesgoComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({ imports: [GestionRiesgoComponent], providers: [provideRouter([])] }).compileComponents();
    expect(TestBed.createComponent(GestionRiesgoComponent).componentInstance).toBeTruthy();
  });
});
