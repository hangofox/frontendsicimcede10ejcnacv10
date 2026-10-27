import { TestBed } from '@angular/core/testing';
import { AddUpdDelApoyoAtencPrevEmergDesastComponent } from './add-upd-del-apoyo-atenc-prev-emerg-desast.component';

describe('AddUpdDelApoyoAtencPrevEmergDesastComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdDelApoyoAtencPrevEmergDesastComponent]
    }).compileComponents();

    expect(TestBed.createComponent(AddUpdDelApoyoAtencPrevEmergDesastComponent).componentInstance).toBeTruthy();
  });
});
