import { TestBed } from '@angular/core/testing';
import { AddUpdDelApoyoObrRedMitigGestRiesgDesastComponent } from './add-upd-del-apoyo-obr-red-mitig-gest-riesg-desast.component';

describe('AddUpdDelApoyoObrRedMitigGestRiesgDesastComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdDelApoyoObrRedMitigGestRiesgDesastComponent]
    }).compileComponents();

    expect(TestBed.createComponent(AddUpdDelApoyoObrRedMitigGestRiesgDesastComponent).componentInstance).toBeTruthy();
  });
});
