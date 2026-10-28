import { TestBed } from '@angular/core/testing';
import { VistaHistOrdApoyMovTropComponent } from './vista-hist-ord-apoy-mov-trop.component';

describe('VistaHistOrdApoyMovTropComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [VistaHistOrdApoyMovTropComponent]
    }).compileComponents();

    expect(TestBed.createComponent(VistaHistOrdApoyMovTropComponent).componentInstance).toBeTruthy();
  });
});
