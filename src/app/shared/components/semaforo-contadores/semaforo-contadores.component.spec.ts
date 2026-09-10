import { TestBed } from '@angular/core/testing';
import { SemaforoContadoresComponent } from './semaforo-contadores.component';

describe('SemaforoContadoresComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({ imports: [SemaforoContadoresComponent] }).compileComponents();
    const fixture = TestBed.createComponent(SemaforoContadoresComponent);
    fixture.componentRef.setInput('total', 0);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
