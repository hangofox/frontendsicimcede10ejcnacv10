import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { ListadoHistMttosEquipIngComponent } from './listado-hist-mttos-equip-ing.component';

describe('ListadoHistMttosEquipIngComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoHistMttosEquipIngComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    }).compileComponents();

    expect(TestBed.createComponent(ListadoHistMttosEquipIngComponent).componentInstance).toBeTruthy();
  });
});
