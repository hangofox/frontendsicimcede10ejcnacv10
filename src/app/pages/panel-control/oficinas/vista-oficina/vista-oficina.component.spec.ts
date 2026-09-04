import { TestBed } from '@angular/core/testing';
import { VistaOficinaComponent } from './vista-oficina.component';

describe('VistaOficinaComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [VistaOficinaComponent]
    }).compileComponents();

    expect(TestBed.createComponent(VistaOficinaComponent).componentInstance).toBeTruthy();
  });
});
