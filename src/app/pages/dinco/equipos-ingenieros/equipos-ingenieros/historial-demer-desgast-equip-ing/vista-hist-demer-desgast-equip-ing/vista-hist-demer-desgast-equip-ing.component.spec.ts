import { TestBed } from '@angular/core/testing';
import { VistaHistDemerDesgastEquipIngComponent } from './vista-hist-demer-desgast-equip-ing.component';

describe('VistaHistDemerDesgastEquipIngComponent', () => {
  it('should be created', async () => {
    await TestBed.configureTestingModule({ imports: [VistaHistDemerDesgastEquipIngComponent] }).compileComponents();
    expect(TestBed.createComponent(VistaHistDemerDesgastEquipIngComponent).componentInstance).toBeTruthy();
  });
});
