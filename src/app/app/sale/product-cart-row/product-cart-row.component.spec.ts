import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCartRowComponent } from './product-cart-row.component';

describe('ProductCartRowComponent', () => {
  let component: ProductCartRowComponent;
  let fixture: ComponentFixture<ProductCartRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCartRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCartRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
