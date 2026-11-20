import { TestBed } from '@angular/core/testing';
import { VistaEquipoIngenieroComponent } from './vista-equipo-ingeniero.component';

describe('VistaEquipoIngenieroComponent', () => {
  it('should be created', async () => {
    await TestBed.configureTestingModule({ imports: [VistaEquipoIngenieroComponent] }).compileComponents();
    expect(TestBed.createComponent(VistaEquipoIngenieroComponent).componentInstance).toBeTruthy();
  });
});
