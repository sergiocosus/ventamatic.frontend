import {
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  it,
  inject,
} from '@angular/core/testing';
import { ComponentFixture, TestComponentBuilder } from '@angular/compiler/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { InventorySelectBranch } from './select-branch.component';

describe('Component: SelectBranch', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [InventorySelectBranch]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([InventorySelectBranch],
      (component: InventorySelectBranch) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(SelectBranchComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(InventorySelectBranch));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-select-branch></app-select-branch>
  `,
  directives: [InventorySelectBranch]
})
class SelectBranchComponentTestController {
}

