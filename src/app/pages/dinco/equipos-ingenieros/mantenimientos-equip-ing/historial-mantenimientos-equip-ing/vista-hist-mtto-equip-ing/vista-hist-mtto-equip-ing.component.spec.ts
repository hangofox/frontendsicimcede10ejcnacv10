import { TestBed } from '@angular/core/testing';
import { VistaHistMttoEquipIngComponent } from './vista-hist-mtto-equip-ing.component';

describe('VistaHistMttoEquipIngComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [VistaHistMttoEquipIngComponent]
    }).compileComponents();

    expect(TestBed.createComponent(VistaHistMttoEquipIngComponent).componentInstance).toBeTruthy();
  });
});
