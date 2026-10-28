import { TestBed } from '@angular/core/testing';
import { AddUpdDelSolicitudConstruccionNuevaComponent } from './add-upd-del-solicitud-construccion-nueva.component';

describe('AddUpdDelSolicitudConstruccionNuevaComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdDelSolicitudConstruccionNuevaComponent]
    }).compileComponents();

    expect(TestBed.createComponent(AddUpdDelSolicitudConstruccionNuevaComponent).componentInstance).toBeTruthy();
  });
});
