import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { InfraestructurasArrendadasService } from './infraestructuras-arrendadas.service';
describe('InfraestructurasArrendadasService', () => { it('debe crearse', () => { TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] }); expect(TestBed.inject(InfraestructurasArrendadasService)).toBeTruthy(); }); });
