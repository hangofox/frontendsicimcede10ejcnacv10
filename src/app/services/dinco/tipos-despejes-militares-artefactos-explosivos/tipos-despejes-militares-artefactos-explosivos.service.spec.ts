import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TiposDespejesMilitaresArtefactosExplosivosService } from './tipos-despejes-militares-artefactos-explosivos.service';

describe('TiposDespejesMilitaresArtefactosExplosivosService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [provideHttpClient(), provideHttpClientTesting()]
  }));

  it('should be created', () => {
    expect(TestBed.inject(TiposDespejesMilitaresArtefactosExplosivosService)).toBeTruthy();
  });
});
