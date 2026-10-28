import { TestBed } from '@angular/core/testing';
import { VistaSolicitudConstruccionNuevaAvaladaComponent } from './vista-solic-const-nuev-avalada.component';

describe('VistaSolicitudConstruccionNuevaAvaladaComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [VistaSolicitudConstruccionNuevaAvaladaComponent]
    }).compileComponents();

    expect(TestBed.createComponent(VistaSolicitudConstruccionNuevaAvaladaComponent).componentInstance).toBeTruthy();
  });
});
