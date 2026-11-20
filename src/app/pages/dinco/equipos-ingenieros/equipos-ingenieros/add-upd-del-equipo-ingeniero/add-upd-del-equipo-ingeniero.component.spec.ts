import { TestBed } from '@angular/core/testing';
import { AddUpdDelEquipoIngenieroComponent } from './add-upd-del-equipo-ingeniero.component';

describe('AddUpdDelEquipoIngenieroComponent', () => {
  it('should be created', async () => {
    await TestBed.configureTestingModule({ imports: [AddUpdDelEquipoIngenieroComponent] }).compileComponents();
    expect(TestBed.createComponent(AddUpdDelEquipoIngenieroComponent).componentInstance).toBeTruthy();
  });
});
