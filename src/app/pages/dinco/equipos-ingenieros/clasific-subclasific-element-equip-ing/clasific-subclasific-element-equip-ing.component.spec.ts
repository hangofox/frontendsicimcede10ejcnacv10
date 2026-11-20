import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ClasificSubclasificElementEquipIngComponent } from './clasific-subclasific-element-equip-ing.component';

describe('ClasificSubclasificElementEquipIngComponent', () => {
  it('should be created', async () => {
    await TestBed.configureTestingModule({ imports: [ClasificSubclasificElementEquipIngComponent], providers: [provideHttpClient(), provideHttpClientTesting()] }).compileComponents();
    expect(TestBed.createComponent(ClasificSubclasificElementEquipIngComponent).componentInstance).toBeTruthy();
  });
});
