import { TestBed } from '@angular/core/testing';
import { VistaResponsableComponent } from './vista-responsable.component';

describe('VistaResponsableComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [VistaResponsableComponent]
    }).compileComponents();

    expect(TestBed.createComponent(VistaResponsableComponent).componentInstance).toBeTruthy();
  });
});
