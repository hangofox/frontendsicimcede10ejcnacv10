import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ProyeccionesTecnicomecanicasEquipTranspService } from './proyecciones-tecnicomecanicas-equip-transp.service';

describe('ProyeccionesTecnicomecanicasEquipTranspService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [provideHttpClient(), provideHttpClientTesting()]
  }));

  it('should be created', () => {
    expect(TestBed.inject(ProyeccionesTecnicomecanicasEquipTranspService)).toBeTruthy();
  });
});
