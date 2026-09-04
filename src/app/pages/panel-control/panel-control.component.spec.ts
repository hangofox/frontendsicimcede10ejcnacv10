import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PanelControlComponent } from './panel-control.component';

describe('PanelControlComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [PanelControlComponent],
      providers: [provideRouter([])]
    }).compileComponents();
    expect(TestBed.createComponent(PanelControlComponent).componentInstance).toBeTruthy();
  });
});
