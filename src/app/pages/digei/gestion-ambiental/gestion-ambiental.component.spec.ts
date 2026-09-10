import { TestBed } from '@angular/core/testing';
import { GestionAmbientalComponent } from './gestion-ambiental.component';

describe('GestionAmbientalComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({ imports: [GestionAmbientalComponent] }).compileComponents();
    expect(TestBed.createComponent(GestionAmbientalComponent).componentInstance).toBeTruthy();
  });
});
