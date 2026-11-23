import { TestBed } from '@angular/core/testing';
import { AddUpdDelHistDemerDesgastEquipIngComponent } from './add-upd-del-hist-demer-desgast-equip-ing.component';

describe('AddUpdDelHistDemerDesgastEquipIngComponent', () => {
  it('should be created', async () => {
    await TestBed.configureTestingModule({ imports: [AddUpdDelHistDemerDesgastEquipIngComponent] }).compileComponents();
    expect(TestBed.createComponent(AddUpdDelHistDemerDesgastEquipIngComponent).componentInstance).toBeTruthy();
  });
});
