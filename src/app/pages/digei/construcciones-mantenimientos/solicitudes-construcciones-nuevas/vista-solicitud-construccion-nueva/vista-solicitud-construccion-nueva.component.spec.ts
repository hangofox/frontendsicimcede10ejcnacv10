import { TestBed } from '@angular/core/testing';
import { VistaSolicitudConstruccionNuevaComponent } from './vista-solicitud-construccion-nueva.component';

describe('VistaSolicitudConstruccionNuevaComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [VistaSolicitudConstruccionNuevaComponent]
    }).compileComponents();

    expect(TestBed.createComponent(VistaSolicitudConstruccionNuevaComponent).componentInstance).toBeTruthy();
  });
});
