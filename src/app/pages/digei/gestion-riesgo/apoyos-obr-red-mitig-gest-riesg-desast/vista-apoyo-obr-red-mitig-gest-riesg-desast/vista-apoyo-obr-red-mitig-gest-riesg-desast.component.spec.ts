import { TestBed } from '@angular/core/testing';
import { VistaApoyoObrRedMitigGestRiesgDesastComponent } from './vista-apoyo-obr-red-mitig-gest-riesg-desast.component';

describe('VistaApoyoObrRedMitigGestRiesgDesastComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [VistaApoyoObrRedMitigGestRiesgDesastComponent]
    }).compileComponents();

    expect(TestBed.createComponent(VistaApoyoObrRedMitigGestRiesgDesastComponent).componentInstance).toBeTruthy();
  });
});
