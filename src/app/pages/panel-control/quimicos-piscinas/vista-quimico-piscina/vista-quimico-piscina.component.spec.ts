import { TestBed } from '@angular/core/testing';
import { VistaQuimicoPiscinaComponent } from './vista-quimico-piscina.component';

describe('VistaQuimicoPiscinaComponent', () => {
  it('should be created', async () => {
    await TestBed.configureTestingModule({ imports: [VistaQuimicoPiscinaComponent] }).compileComponents();
    expect(TestBed.createComponent(VistaQuimicoPiscinaComponent).componentInstance).toBeTruthy();
  });
});
