import { TestBed } from '@angular/core/testing';
import { AddUpdDelOficinaComponent } from './add-upd-del-oficina.component';

describe('AddUpdDelOficinaComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdDelOficinaComponent]
    }).compileComponents();

    expect(TestBed.createComponent(AddUpdDelOficinaComponent).componentInstance).toBeTruthy();
  });
});
