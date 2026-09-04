import { TestBed } from '@angular/core/testing';
import { VistaUsuarioComponent } from './vista-usuario.component';

describe('VistaUsuarioComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [VistaUsuarioComponent]
    }).compileComponents();

    expect(TestBed.createComponent(VistaUsuarioComponent).componentInstance).toBeTruthy();
  });
});
