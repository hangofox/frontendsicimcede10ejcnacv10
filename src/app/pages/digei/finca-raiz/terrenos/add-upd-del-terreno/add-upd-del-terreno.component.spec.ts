import { TestBed } from '@angular/core/testing';
import { AddUpdDelTerrenoComponent } from './add-upd-del-terreno.component';

describe('AddUpdDelTerrenoComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({ imports: [AddUpdDelTerrenoComponent] }).compileComponents();
    expect(TestBed.createComponent(AddUpdDelTerrenoComponent).componentInstance).toBeTruthy();
  });
});
