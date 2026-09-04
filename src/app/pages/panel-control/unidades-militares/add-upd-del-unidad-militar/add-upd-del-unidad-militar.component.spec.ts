import { TestBed } from '@angular/core/testing';
import { AddUpdDelUnidadMilitarComponent } from './add-upd-del-unidad-militar.component';

describe('AddUpdDelUnidadMilitarComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdDelUnidadMilitarComponent]
    }).compileComponents();

    expect(TestBed.createComponent(AddUpdDelUnidadMilitarComponent).componentInstance).toBeTruthy();
  });
});
