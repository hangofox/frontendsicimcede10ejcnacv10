import { TestBed } from '@angular/core/testing';
import { AddUpdDelInfraestructuraComponent } from './add-upd-del-infraestructura.component';

describe('AddUpdDelInfraestructuraComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdDelInfraestructuraComponent]
    }).compileComponents();

    expect(TestBed.createComponent(AddUpdDelInfraestructuraComponent).componentInstance).toBeTruthy();
  });
});
