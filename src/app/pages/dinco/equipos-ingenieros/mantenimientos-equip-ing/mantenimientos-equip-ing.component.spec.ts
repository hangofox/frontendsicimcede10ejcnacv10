import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MantenimientosEquipIngComponent } from './mantenimientos-equip-ing.component';

describe('MantenimientosEquipIngComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [MantenimientosEquipIngComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    expect(TestBed.createComponent(MantenimientosEquipIngComponent).componentInstance).toBeTruthy();
  });
});
