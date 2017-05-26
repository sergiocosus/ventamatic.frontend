import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryEditDialogComponent } from './inventory-edit-dialog.component';

describe('InventoryEditDialogComponent', () => {
  let component: InventoryEditDialogComponent;
  let fixture: ComponentFixture<InventoryEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
