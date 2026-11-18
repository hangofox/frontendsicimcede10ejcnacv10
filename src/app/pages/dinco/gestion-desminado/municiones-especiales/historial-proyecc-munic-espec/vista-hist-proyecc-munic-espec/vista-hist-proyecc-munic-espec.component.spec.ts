import { TestBed } from '@angular/core/testing';
import { VistaHistProyeccMunicEspecComponent } from './vista-hist-proyecc-munic-espec.component';

describe('VistaHistProyeccMunicEspecComponent', () => {
  it('should be created', async () => {
    await TestBed.configureTestingModule({ imports: [VistaHistProyeccMunicEspecComponent] }).compileComponents();
    expect(TestBed.createComponent(VistaHistProyeccMunicEspecComponent).componentInstance).toBeTruthy();
  });
});
