import { TestBed } from '@angular/core/testing';
import { AddUpdDelResponsableComponent } from './add-upd-del-responsable.component';

describe('AddUpdDelResponsableComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdDelResponsableComponent]
    }).compileComponents();

    expect(TestBed.createComponent(AddUpdDelResponsableComponent).componentInstance).toBeTruthy();
  });
});
