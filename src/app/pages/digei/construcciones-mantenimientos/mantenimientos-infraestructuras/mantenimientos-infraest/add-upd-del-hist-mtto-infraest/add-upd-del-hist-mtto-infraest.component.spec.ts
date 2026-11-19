import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { AddUpdDelHistorialMantenimientoInfraestComponent } from './add-upd-del-hist-mtto-infraest.component';

describe('AddUpdDelHistorialMantenimientoInfraestComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdDelHistorialMantenimientoInfraestComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    }).compileComponents();

    expect(TestBed.createComponent(AddUpdDelHistorialMantenimientoInfraestComponent).componentInstance).toBeTruthy();
  });
});
