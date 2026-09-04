import { TestBed } from '@angular/core/testing';
import { AddUpdDelUsuarioComponent } from './add-upd-del-usuario.component';

describe('AddUpdDelUsuarioComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdDelUsuarioComponent]
    }).compileComponents();

    expect(TestBed.createComponent(AddUpdDelUsuarioComponent).componentInstance).toBeTruthy();
  });
});
