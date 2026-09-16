import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ListadoCentrosCostosUnidadesMilitaresComponent } from './listado-centros-costos-unidades-militares.component';

describe('ListadoCentrosCostosUnidadesMilitaresComponent', () => {
  it('should be created', async () => {
    await TestBed.configureTestingModule({ imports: [ListadoCentrosCostosUnidadesMilitaresComponent, HttpClientTestingModule] }).compileComponents();
    expect(TestBed.createComponent(ListadoCentrosCostosUnidadesMilitaresComponent).componentInstance).toBeTruthy();
  });
});
