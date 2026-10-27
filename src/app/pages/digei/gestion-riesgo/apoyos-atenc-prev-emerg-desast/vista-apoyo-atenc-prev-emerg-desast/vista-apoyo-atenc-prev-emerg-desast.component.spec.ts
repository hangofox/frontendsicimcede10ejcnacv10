import { TestBed } from '@angular/core/testing';
import { VistaApoyoAtencPrevEmergDesastComponent } from './vista-apoyo-atenc-prev-emerg-desast.component';

describe('VistaApoyoAtencPrevEmergDesastComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [VistaApoyoAtencPrevEmergDesastComponent]
    }).compileComponents();

    expect(TestBed.createComponent(VistaApoyoAtencPrevEmergDesastComponent).componentInstance).toBeTruthy();
  });
});
