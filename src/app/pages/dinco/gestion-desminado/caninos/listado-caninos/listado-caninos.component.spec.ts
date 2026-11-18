import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ListadoCaninosComponent } from './listado-caninos.component';

describe('ListadoCaninosComponent', () => {
  it('should be created', async () => {
    await TestBed.configureTestingModule({ imports: [ListadoCaninosComponent], providers: [provideHttpClient(), provideHttpClientTesting()] }).compileComponents();
    expect(TestBed.createComponent(ListadoCaninosComponent).componentInstance).toBeTruthy();
  });
});
