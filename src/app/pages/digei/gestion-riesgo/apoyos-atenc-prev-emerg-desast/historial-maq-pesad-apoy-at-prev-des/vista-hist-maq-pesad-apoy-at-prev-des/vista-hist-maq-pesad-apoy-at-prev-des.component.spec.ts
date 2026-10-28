import { TestBed } from '@angular/core/testing';
import { VistaHistMaqPesadApoyAtencPrevDesComponent } from './vista-hist-maq-pesad-apoy-at-prev-des.component';

describe('VistaHistMaqPesadApoyAtencPrevDesComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [VistaHistMaqPesadApoyAtencPrevDesComponent]
    }).compileComponents();

    expect(TestBed.createComponent(VistaHistMaqPesadApoyAtencPrevDesComponent).componentInstance).toBeTruthy();
  });
});
