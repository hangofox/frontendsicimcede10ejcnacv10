import { TestBed } from '@angular/core/testing';
import { UpdSolicitudConstruccionNuevaAvaladaComponent } from './upd-solic-const-nuev-avalada.component';

describe('UpdSolicitudConstruccionNuevaAvaladaComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [UpdSolicitudConstruccionNuevaAvaladaComponent]
    }).compileComponents();

    expect(TestBed.createComponent(UpdSolicitudConstruccionNuevaAvaladaComponent).componentInstance).toBeTruthy();
  });
});
